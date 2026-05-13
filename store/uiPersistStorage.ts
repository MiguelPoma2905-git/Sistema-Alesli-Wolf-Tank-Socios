import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

/**
 * Escrituras a AsyncStorage diferidas y agrupadas para que el cambio de tema
 * no compita con el hilo del gesto (menos sensación de “lag”).
 */
let uiWriteTimer: ReturnType<typeof setTimeout> | null = null;
let pendingWrite: { name: string; value: string } | null = null;

const deferredUiAsyncStorage = {
  getItem: async (name: string) => (await AsyncStorage.getItem(name)) ?? null,
  setItem: (name: string, value: string) => {
    pendingWrite = { name, value };
    if (uiWriteTimer) clearTimeout(uiWriteTimer);
    uiWriteTimer = setTimeout(() => {
      const p = pendingWrite;
      pendingWrite = null;
      uiWriteTimer = null;
      if (p) void AsyncStorage.setItem(p.name, p.value);
    }, 48);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const uiPersistStorage = createJSONStorage(() => deferredUiAsyncStorage);
