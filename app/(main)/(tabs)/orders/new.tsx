import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { ElegantInput } from '@/components/ui/ElegantInput';
import { FloralButton } from '@/components/ui/FloralButton';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function NewOrderScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [client, setClient] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const submit = () => {
    Alert.alert('Pedido registrado (demo)', 'Conecta tu API para persistir en PostgreSQL.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader theme={theme} title="Nuevo pedido" subtitle="Captura rápida para producción y reparto." />

      <ScrollView contentContainerStyle={styles.pad}>
        <ElegantInput label="Cliente" theme={theme} value={client} onChangeText={setClient} placeholder="Nombre completo" />
        <View style={{ height: spacing.md }} />
        <ElegantInput label="Teléfono / WhatsApp" theme={theme} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <View style={{ height: spacing.md }} />
        <ElegantInput label="Dirección de entrega" theme={theme} value={address} onChangeText={setAddress} />
        <View style={{ height: spacing.md }} />
        <ElegantInput label="Observaciones" theme={theme} value={notes} onChangeText={setNotes} multiline placeholder="Globo rojo, mensaje en tarjeta..." />

        <Text style={{ color: theme.colors.textSecondary, marginVertical: spacing.md, fontSize: 13 }}>
          Los ítems del pedido se elegirán desde el catálogo cuando enlaces el backend (SKU, precios y stock).
        </Text>

        <FloralButton title="Guardar pedido" theme={theme} onPress={submit} />
        <FloralButton title="Cancelar" theme={theme} variant="outline" onPress={() => router.back()} />
      </ScrollView>
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  pad: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
  },
});
