import { useColorScheme } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { useUiStore } from '@/store/uiStore';

export function useAppTheme(): AppTheme {
  const system = useColorScheme() ?? 'light';
  const resolvedTheme = useUiStore((s) => s.resolvedTheme);
  return resolvedTheme(system === 'dark' ? 'dark' : 'light');
}
