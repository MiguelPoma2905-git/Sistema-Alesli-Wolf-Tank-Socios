import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, shadows, spacing } from '@/constants/theme';
import type { Order, OrderStatus } from '@/types/models';

const statusLabel: Record<OrderStatus, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  en_preparacion: 'En preparación',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

const statusTone = (
  theme: AppTheme,
  s: OrderStatus
): { bg: string; fg: string } => {
  switch (s) {
    case 'entregado':
      return { bg: `${theme.colors.success}22`, fg: theme.colors.success };
    case 'cancelado':
      return { bg: `${theme.colors.error}22`, fg: theme.colors.error };
    case 'enviado':
      return { bg: `${theme.colors.accentSoft}33`, fg: theme.colors.accent };
    default:
      return { bg: `${theme.colors.primary}18`, fg: theme.colors.primary };
  }
};

type Props = {
  order: Order;
  theme: AppTheme;
  onPress?: () => void;
};

export function OrderCard({ order, theme, onPress }: Props) {
  const tone = statusTone(theme, order.status);

  return (
    <Pressable
      onPress={() => {
        void Haptics.selectionAsync();
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.card,
        shadows.soft,
        {
          backgroundColor: theme.colors.surface,
          opacity: pressed ? 0.95 : 1,
        },
      ]}>
      <View style={styles.top}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 17 }}>
            {order.customerName}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, marginTop: 2 }}>{order.code}</Text>
        </View>
        <View style={[styles.pill, { backgroundColor: tone.bg }]}>
          <Text style={{ color: tone.fg, fontSize: 12, fontFamily: theme.fonts.bodyMedium }}>
            {statusLabel[order.status]}
          </Text>
        </View>
      </View>
      <View style={styles.meta}>
        <Text style={{ color: theme.colors.textSecondary }}>{order.phone}</Text>
        <Text style={{ color: theme.colors.primary, fontFamily: theme.fonts.bodyMedium }}>
          Bs {order.totalBs}
        </Text>
      </View>
      <Text numberOfLines={2} style={{ color: theme.colors.textSecondary, marginTop: spacing.xs }}>
        {order.address}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.full,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
});
