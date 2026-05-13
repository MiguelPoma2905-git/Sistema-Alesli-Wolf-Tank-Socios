import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, shadows, spacing } from '@/constants/theme';
import type { InventoryItem } from '@/types/models';

type Props = {
  item: InventoryItem;
  theme: AppTheme;
};

export function InventoryCard({ item, theme }: Props) {
  const low = item.quantity <= item.minStock;

  return (
    <View style={[styles.card, shadows.soft, { backgroundColor: theme.colors.surface }]}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: theme.fonts.bodyMedium, color: theme.colors.text, fontSize: 16 }}>
          {item.name}
        </Text>
        <Text style={{ color: theme.colors.textSecondary, marginTop: 4, fontSize: 13 }}>
          {item.category} · mín. {item.minStock} {item.unit}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontFamily: theme.fonts.heading, fontSize: 20, color: theme.colors.text }}>
          {item.quantity}
        </Text>
        <Text style={{ color: low ? theme.colors.error : theme.colors.success, fontSize: 12 }}>
          {low ? 'Stock bajo' : 'OK'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});
