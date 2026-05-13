import { useRouter } from 'expo-router';
import React, { Suspense, lazy } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { FloralScreen } from '@/components/ui/FloralScreen';
import type { AppTheme } from '@/constants/theme';
import { radii, spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { canImportExpoNotifications, isExpoGoAndroid } from '@/lib/notificationsGate';
import { queryClient } from '@/lib/queryClient';
import type { ThemePreference } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

const PushNotificationsSettings = lazy(() => import('@/components/settings/PushNotificationsSettings'));

export default function SettingsScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const pref = useUiStore((s) => s.themePreference);
  const setPref = useUiStore((s) => s.setThemePreference);

  const pushModuleOk = canImportExpoNotifications();
  const showExpoGoAndroidNotice = isExpoGoAndroid();

  const cycleTheme = () => {
    const order: ThemePreference[] = ['system', 'light', 'dark'];
    const i = order.indexOf(pref);
    setPref(order[(i + 1) % order.length]);
  };

  const confirmLogout = () => {
    Alert.alert('Cerrar sesión', '¿Salir de Florería Alesli?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: () => {
          logout();
          queryClient.clear();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader
        theme={theme}
        title="Ajustes"
        subtitle="Experiencia boutique personalizada."
        rightSlot={
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={{ color: '#fff', fontFamily: theme.fonts.bodyMedium }}>Cerrar</Text>
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.pad}>
        <Section title="Apariencia" theme={theme} />
        <Pressable
          onPress={cycleTheme}
          style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={{ color: theme.colors.text, fontFamily: theme.fonts.bodyMedium }}>Tema</Text>
          <Text style={{ color: theme.colors.textSecondary }}>
            {pref === 'system' ? 'Sistema' : pref === 'light' ? 'Claro' : 'Oscuro elegante'}
          </Text>
        </Pressable>

        <Section title="Notificaciones" theme={theme} />
        {showExpoGoAndroidNotice ? (
          <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={{ color: theme.colors.textSecondary, flex: 1 }}>
              Las push remotas no están disponibles en Expo Go para Android (SDK 53+). Para probarlas usa un{' '}
              <Text style={{ fontFamily: theme.fonts.bodyMedium, color: theme.colors.text }}>development build</Text> (EAS
              Build).
            </Text>
          </View>
        ) : pushModuleOk ? (
          <Suspense
            fallback={
              <View style={[styles.card, { borderColor: theme.colors.border, justifyContent: 'center' }]}>
                <ActivityIndicator color={theme.colors.primary} />
              </View>
            }>
            <PushNotificationsSettings theme={theme} />
          </Suspense>
        ) : (
          <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={{ color: theme.colors.textSecondary, flex: 1 }}>
              Activa permisos de notificación en este entorno desde los ajustes del sistema si hace falta.
            </Text>
          </View>
        )}
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginBottom: spacing.md }}>
          En producción configura EAS y credenciales FCM/APNs.
        </Text>

        <Section title="Sesión" theme={theme} />
        <Pressable
          onPress={confirmLogout}
          style={[styles.card, styles.logoutCard, { backgroundColor: `${theme.colors.error}10`, borderColor: `${theme.colors.error}55` }]}>
          <Text style={{ color: theme.colors.error, fontFamily: theme.fonts.heading, fontSize: 17 }}>Cerrar sesión</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 }}>
            Disponible para admin, ventas y almacén
          </Text>
        </Pressable>

        <Section title="Marca" theme={theme} />
        <Text style={{ color: theme.colors.textSecondary, lineHeight: 22 }}>
          Paleta oficial Alesli: rosa fuerte, fucsia y morado floral sobre fondos nude. Diseñado para transmitir romanticismo y lujo.
        </Text>
      </ScrollView>
    </FloralScreen>
  );
}

function Section({ title, theme }: { title: string; theme: AppTheme }) {
  return (
    <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 18, marginBottom: spacing.sm }}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  pad: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  card: {
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  logoutCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
