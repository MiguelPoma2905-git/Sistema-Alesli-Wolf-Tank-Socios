import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FloralButton } from '@/components/ui/FloralButton';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function ScannerScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState<string | null>(null);

  if (!permission?.granted) {
    return (
      <FloralScreen theme={theme} constrainWidth={false}>
        <View style={{ padding: spacing.lg, gap: spacing.md }}>
          <Text style={{ color: theme.colors.text, fontFamily: theme.fonts.heading, fontSize: 22 }}>
            Permiso de cámara
          </Text>
          <Text style={{ color: theme.colors.textSecondary }}>
            Necesitamos acceso para leer códigos QR de pagos y referencias.
          </Text>
          <FloralButton title="Permitir cámara" theme={theme} onPress={() => void requestPermission()} />
          <FloralButton title="Volver" theme={theme} variant="outline" onPress={() => router.back()} />
        </View>
      </FloralScreen>
    );
  }

  return (
    <FloralScreen theme={theme} constrainWidth={false}>
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={({ data }) => setResult(data)}
        />
        <View style={styles.overlay}>
          <Text style={styles.hint}>Apunta al QR de pago</Text>
          {result ? (
            <View style={[styles.result, { backgroundColor: theme.colors.surface }]}>
              <Text style={{ color: theme.colors.text }}>{result}</Text>
            </View>
          ) : null}
          <Pressable style={styles.back} onPress={() => router.back()}>
            <Text style={{ color: '#fff', fontFamily: theme.fonts.bodyMedium }}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  hint: {
    position: 'absolute',
    top: 48,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 8,
  },
  result: {
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  back: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
});
