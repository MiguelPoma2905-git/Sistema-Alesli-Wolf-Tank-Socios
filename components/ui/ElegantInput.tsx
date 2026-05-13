import React, { useState } from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  View,
  StyleSheet,
} from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, spacing } from '@/constants/theme';

type Props = {
  label: string;
  theme: AppTheme;
  error?: string;
  containerStyle?: object;
} & TextInputProps;

export function ElegantInput({ label, theme, error, style, containerStyle, ...rest }: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <View style={containerStyle}>
      <Text
        style={{
          fontFamily: theme.fonts.bodyMedium,
          color: theme.colors.textSecondary,
          marginBottom: spacing.xs,
          fontSize: 13,
        }}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={theme.colors.textSecondary}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={[
          styles.input,
          {
            color: theme.colors.text,
            borderColor: error ? theme.colors.error : focus ? theme.colors.primary : theme.colors.border,
            backgroundColor: theme.colors.surface,
            fontFamily: theme.fonts.body,
          },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text style={{ color: theme.colors.error, marginTop: 4, fontSize: 12 }}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.25,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 16,
  },
});
