import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

import type { AppTheme } from '@/constants/theme';

export function buildNavigationTheme(app: AppTheme): Theme {
  const base = app.mode === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark: app.mode === 'dark',
    colors: {
      ...base.colors,
      primary: app.colors.primary,
      background: app.colors.background,
      card: app.colors.surface,
      text: app.colors.text,
      border: app.colors.border,
      notification: app.colors.accent,
    },
  };
}
