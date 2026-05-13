import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, spacing } from '@/constants/theme';

type Props = {
  theme: AppTheme;
};

/**
 * Solo montar cuando `canImportExpoNotifications()` sea true (nunca en Expo Go Android).
 * Import estático aquí: si este archivo no se carga, el bundle no ejecuta expo-notifications.
 */
export default function PushNotificationsSettings({ theme }: Props) {
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    void Notifications.getPermissionsAsync().then((s) => {
      if (!cancelled) setPushEnabled(s.status === 'granted');
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const registerPush = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPushEnabled(status === 'granted');
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Activa notificaciones desde ajustes del sistema si lo deseas.');
      return;
    }
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      Alert.alert('Push listo (demo)', `Token Expo: ${token.data.slice(0, 28)}…`);
    } catch {
      Alert.alert(
        'Push listo (demo)',
        'Permisos concedidos. En builds EAS configura projectId para tokens completos.'
      );
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <Text style={{ color: theme.colors.text, flex: 1 }}>Estado permisos</Text>
      <Switch value={pushEnabled} onValueChange={(v) => (v ? void registerPush() : setPushEnabled(false))} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
});
