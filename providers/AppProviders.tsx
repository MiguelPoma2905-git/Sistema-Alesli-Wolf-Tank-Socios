import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { buildNavigationTheme } from '@/constants/navigationTheme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '@/store/authStore';
export function AppProviders({ children }: { children: React.ReactNode }) {
  const theme = useAppTheme();
  const navTheme = buildNavigationTheme(theme);

  useEffect(() => {
    const finish = () => useAuthStore.getState().setHydrated(true);
    const unsub = useAuthStore.persist.onFinishHydration(finish);
    if (useAuthStore.persist.hasHydrated()) finish();
    return unsub;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationThemeProvider value={navTheme}>{children}</NavigationThemeProvider>
    </QueryClientProvider>
  );
}
