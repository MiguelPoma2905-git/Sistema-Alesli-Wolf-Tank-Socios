import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, useWindowDimensions, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppTheme } from '@/constants/theme';

type Props = ViewProps & {
  theme: AppTheme;
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  /** Centra el contenido y limita ancho en tablets (pantallas anchas). */
  constrainWidth?: boolean;
};

export function FloralScreen({
  theme,
  children,
  edges = ['top', 'left', 'right'],
  constrainWidth = true,
  style,
  ...rest
}: Props) {
  const { width } = useWindowDimensions();
  const maxW = Math.min(width - 16, 720);

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surfaceElevated]}
      style={styles.flex}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.4, y: 1 }}>
      <SafeAreaView style={[styles.flex, style]} edges={edges} {...rest}>
        <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
        {constrainWidth ? (
          <View style={[styles.flex, styles.alignCenter]}>
            <View style={[styles.flex, { width: '100%', maxWidth: maxW }]}>{children}</View>
          </View>
        ) : (
          <View style={styles.flex}>{children}</View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
});
