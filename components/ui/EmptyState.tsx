import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { spacing } from '@/constants/theme';

type Props = {
  theme: AppTheme;
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

export function EmptyState({ theme, title, description, icon }: Props) {
  return (
    <View style={styles.wrap}>
      {icon ? <View style={{ marginBottom: spacing.md }}>{icon}</View> : null}
      <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 20, textAlign: 'center' }}>
        {title}
      </Text>
      {description ? (
        <Text
          style={{
            marginTop: spacing.sm,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            paddingHorizontal: spacing.xl,
          }}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
});
