import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';

import CATALOG_PDF from '@/assets/catalog/catalogo-alesli.pdf';

/**
 * Abre/comparte el PDF del catálogo (visor externo / hoja de compartir).
 * El archivo está empaquetado como asset; la primera vez puede tardar si el PDF es muy grande.
 */
export async function openCatalogPdf(): Promise<void> {
  if (Platform.OS === 'web') {
    Alert.alert('Catálogo', 'En web usa la app móvil para ver el PDF del catálogo.');
    return;
  }

  try {
    const asset = Asset.fromModule(CATALOG_PDF);
    await asset.downloadAsync();
    const uri = asset.localUri;
    if (!uri) {
      Alert.alert('Catálogo', 'No se pudo preparar el archivo.');
      return;
    }

    const can = await Sharing.isAvailableAsync();
    if (!can) {
      Alert.alert('Catálogo', 'Compartir no está disponible en este dispositivo.');
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Catálogo Florería Alesli',
      ...(Platform.OS === 'ios' ? { UTI: 'com.adobe.pdf' as const } : {}),
    });
  } catch {
    Alert.alert('Catálogo', 'No se pudo abrir el PDF. Si es muy pesado, comprímelo y vuelve a exportarlo.');
  }
}
