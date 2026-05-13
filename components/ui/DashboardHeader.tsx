import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

type Props = {
  theme: AppTheme;
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

export function DashboardHeader({ theme, title, subtitle, rightSlot }: Props) {
  const { width, fs } = useResponsive();
  const titleSize = width < 380 ? fs(22) : width >= 720 ? fs(30) : fs(26);
  const subSize = fs(14);

  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientMid, theme.colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { fontFamily: theme.fonts.heading, fontSize: titleSize }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.sub, { fontSize: subSize }]} numberOfLines={3}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {rightSlot}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  sub: {
    color: 'rgba(255,255,255,0.88)',
    marginTop: 6,
  },
});
