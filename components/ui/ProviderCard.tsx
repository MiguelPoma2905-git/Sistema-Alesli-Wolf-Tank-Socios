import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, shadows, spacing } from '@/constants/theme';
import type { Supplier } from '@/types/models';

type Props = {
  supplier: Supplier;
  theme: AppTheme;
};

export function ProviderCard({ supplier, theme }: Props) {
  const wa = `https://wa.me/${supplier.whatsapp.replace(/\D/g, '')}`;

  return (
    <View style={[styles.card, shadows.soft, { backgroundColor: theme.colors.surface }]}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 17 }}>
          {supplier.name}
        </Text>
        <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>{supplier.phone}</Text>
        <Text style={{ color: theme.colors.textSecondary, marginTop: 8, fontSize: 13 }}>
          Suministra: {supplier.supplies.join(', ')}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          Linking.openURL(wa);
        }}
        style={[styles.wa, { backgroundColor: `${theme.colors.success}22` }]}>
        <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  wa: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
