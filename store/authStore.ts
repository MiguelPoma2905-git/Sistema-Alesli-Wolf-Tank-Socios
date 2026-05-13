import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { User } from '@/types/models';

const DEMO_USERS: { email: string; password: string; user: User }[] = [
  {
    email: 'admin@alesli.com',
    password: 'admin123',
    user: {
      id: 'u1',
      name: 'Administración Alesli',
      email: 'admin@alesli.com',
      role: 'admin',
    },
  },
  {
    email: 'ventas@alesli.com',
    password: 'ventas123',
    user: {
      id: 'u2',
      name: 'María — Ventas',
      email: 'ventas@alesli.com',
      role: 'vendedor',
    },
  },
  {
    email: 'almacen@alesli.com',
    password: 'alm123',
    user: {
      id: 'u3',
      name: 'Carlos — Almacén',
      email: 'almacen@alesli.com',
      role: 'almacen',
    },
  },
];

type AuthState = {
  token: string | null;
  user: User | null;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  setHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 550));
        const row = DEMO_USERS.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        );
        if (!row) {
          return { ok: false, error: 'Credenciales incorrectas. Revisa el correo y la contraseña.' };
        }
        const token = `jwt.${row.user.id}.${Date.now()}`;
        set({ token, user: row.user });
        return { ok: true };
      },
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'alesli-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ token: s.token, user: s.user }),
      onRehydrateStorage: () => (state, error) => {
        if (!error) {
          useAuthStore.getState().setHydrated(true);
        } else {
          useAuthStore.getState().setHydrated(true);
        }
      },
    }
  )
);

