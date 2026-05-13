import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, shadows, spacing } from '@/constants/theme';

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  theme: AppTheme;
  icon?: React.ReactNode;
};

export function KPIWidget({ title, value, subtitle, theme, icon }: Props) {
  return (
    <View style={[styles.wrap, shadows.soft]}>
      <LinearGradient
        colors={[theme.colors.surface, theme.colors.surfaceElevated]}
        style={styles.gradient}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 13, fontFamily: theme.fonts.bodyMedium }}>
              {title}
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontSize: 22,
                fontFamily: theme.fonts.heading,
                color: theme.colors.text,
              }}>
              {value}
            </Text>
            {subtitle ? (
              <Text style={{ marginTop: 4, color: theme.colors.textSecondary, fontSize: 12 }}>{subtitle}</Text>
            ) : null}
          </View>
          {icon ? <View style={[styles.icon, { backgroundColor: `${theme.colors.primary}18` }]}>{icon}</View> : null}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  gradient: {
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(196,69,151,0.12)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
