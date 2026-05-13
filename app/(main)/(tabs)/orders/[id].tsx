import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { FloralButton } from '@/components/ui/FloralButton';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { spacing } from '@/constants/theme';
import type { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchOrders } from '@/lib/api';
import type { OrderStatus } from '@/types/models';

const LABELS: Record<OrderStatus, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  en_preparacion: 'En preparación',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

export default function OrderDetailScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const q = useQuery({ queryKey: ['orders'], queryFn: fetchOrders });
  const order = q.data?.find((o) => o.id === id);

  if (!order) {
    return (
      <FloralScreen theme={theme}>
        <Text style={{ padding: spacing.lg, color: theme.colors.text }}>Pedido no encontrado.</Text>
        <FloralButton title="Volver" theme={theme} variant="outline" onPress={() => router.back()} />
      </FloralScreen>
    );
  }

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader theme={theme} title={order.code} subtitle={LABELS[order.status]} />

      <ScrollView contentContainerStyle={styles.pad}>
        <Row label="Cliente" value={order.customerName} theme={theme} />
        <Row label="Teléfono" value={order.phone} theme={theme} />
        <Row label="Entrega" value={new Date(order.scheduledAt).toLocaleString()} theme={theme} />
        <Row label="Dirección" value={order.address} theme={theme} />
        {order.notes ? <Row label="Notas" value={order.notes} theme={theme} /> : null}
        <Row label="Total" value={`Bs ${order.totalBs}`} theme={theme} />

        <Text style={{ marginTop: spacing.lg, fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 18 }}>
          Ítems
        </Text>
        {order.items.map((it, idx) => (
          <Text key={idx} style={{ color: theme.colors.textSecondary, marginTop: 6 }}>
            · {it.productId} × {it.quantity} — Bs {it.unitPriceBs}
          </Text>
        ))}

        <View style={{ height: spacing.lg }} />
        <FloralButton title="Marcar en preparación (demo)" theme={theme} onPress={() => router.back()} />
      </ScrollView>
    </FloralScreen>
  );
}

function Row({ label, value, theme }: { label: string; value: string; theme: AppTheme }) {
  return (
    <View style={{ marginBottom: spacing.sm }}>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>{label}</Text>
      <Text style={{ color: theme.colors.text, fontFamily: theme.fonts.bodyMedium, fontSize: 16 }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
