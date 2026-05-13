import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { darkTheme, lightTheme, type AppTheme, type ThemeMode } from '@/constants/theme';
import { uiPersistStorage } from '@/store/uiPersistStorage';

export type ThemePreference = ThemeMode | 'system';

type UiState = {
  themePreference: ThemePreference;
  favorites: string[];
  setThemePreference: (t: ThemePreference) => void;
  toggleFavorite: (productId: string) => void;
  resolvedTheme: (system: ThemeMode) => AppTheme;
};

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      themePreference: 'system',
      favorites: [],
      setThemePreference: (t) => set({ themePreference: t }),
      toggleFavorite: (productId) =>
        set((s) => ({
          favorites: s.favorites.includes(productId)
            ? s.favorites.filter((id) => id !== productId)
            : [...s.favorites, productId],
        })),
      resolvedTheme: (system) => {
        const pref = get().themePreference;
        const mode: ThemeMode = pref === 'system' ? system : pref;
        return mode === 'dark' ? darkTheme : lightTheme;
      },
    }),
    {
      name: 'alesli-ui',
      storage: uiPersistStorage,
      partialize: (s) => ({ themePreference: s.themePreference, favorites: s.favorites }),
    }
  )
);
