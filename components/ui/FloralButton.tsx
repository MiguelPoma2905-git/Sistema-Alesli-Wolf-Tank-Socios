import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type GestureResponderEvent,
  type ViewStyle,
} from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, shadows } from '@/constants/theme';

type Props = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  theme: AppTheme;
  variant?: 'primary' | 'ghost' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
};

export function FloralButton({
  title,
  onPress,
  theme,
  variant = 'primary',
  disabled,
  loading,
  style,
  leftIcon,
}: Props) {
  const handlePress = (e: GestureResponderEvent) => {
    if (disabled || loading) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          styles.base,
          shadows.soft,
          {
            opacity: disabled ? 0.55 : pressed ? 0.92 : 1,
            transform: [{ scale: pressed ? 0.985 : 1 }],
          },
          style,
        ]}>
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientMid, theme.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}>
          {loading ? (
            <ActivityIndicator color={theme.colors.surface} />
          ) : (
            <>
              {leftIcon}
              <Text style={[styles.label, { color: theme.colors.surface, fontFamily: theme.fonts.bodyMedium }]}>
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </Pressable>
    );
  }

  const borderColor =
    variant === 'outline' ? theme.colors.primary : 'transparent';

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        styles.alt,
        {
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderColor,
          backgroundColor:
            variant === 'ghost' ? 'transparent' : theme.colors.surfaceElevated,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        },
        shadows.soft,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={theme.colors.primary} />
      ) : (
        <>
          {leftIcon}
          <Text style={[styles.label, { color: theme.colors.primary, fontFamily: theme.fonts.bodyMedium }]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  alt: {
    minHeight: 52,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  gradient: {
    minHeight: 52,
    paddingHorizontal: 22,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
});
