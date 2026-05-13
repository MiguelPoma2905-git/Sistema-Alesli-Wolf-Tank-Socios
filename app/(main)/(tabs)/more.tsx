import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { radii, shadows, spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { openCatalogPdf } from '@/lib/openCatalogPdf';
import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '@/store/authStore';

type Item = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
  roles?: ('admin' | 'vendedor' | 'almacen')[];
};

const ITEMS: Item[] = [
  {
    title: 'Catálogo PDF',
    subtitle: 'Lista oficial de productos (documento)',
    icon: 'document-text-outline',
    href: '__catalog_pdf__',
  },
  {
    title: 'Proveedores',
    subtitle: 'Contacto, WhatsApp e historial',
    icon: 'leaf-outline',
    href: '/(main)/suppliers',
    roles: ['admin', 'almacen'],
  },
  {
    title: 'Inventario',
    subtitle: 'Stock detallado por insumo',
    icon: 'cube-outline',
    href: '/(main)/(tabs)/inventory',
    roles: ['admin'],
  },
  {
    title: 'Compras',
    subtitle: 'Órdenes y comprobantes',
    icon: 'bag-handle-outline',
    href: '/(main)/(tabs)/purchases',
    roles: ['admin'],
  },
  {
    title: 'Reportes',
    subtitle: 'Analytics ejecutivos',
    icon: 'bar-chart-outline',
    href: '/(main)/(tabs)/reports',
    roles: ['admin'],
  },
  {
    title: 'Escanear QR',
    subtitle: 'Pagos y referencias rápidas',
    icon: 'qr-code-outline',
    href: '/(main)/scanner',
  },
  {
    title: 'Ajustes',
    subtitle: 'Dark mode, notificaciones',
    icon: 'settings-outline',
    href: '/(main)/settings',
  },
];

export default function MoreScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const role = useAuthStore((s) => s.user?.role ?? 'admin');
  const logout = useAuthStore((s) => s.logout);
  const [openingPdf, setOpeningPdf] = useState(false);

  const items = ITEMS.filter((i) => !i.roles || i.roles.includes(role));

  const onOpenCatalogPdf = async () => {
    setOpeningPdf(true);
    try {
      await openCatalogPdf();
    } finally {
      setOpeningPdf(false);
    }
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
      <DashboardHeader theme={theme} title="Más opciones" subtitle="Todo lo premium en un solo lugar." />

      <ScrollView contentContainerStyle={styles.pad}>
        {items.map((it) => (
          <Pressable
            key={it.href}
            onPress={() => {
              if (it.href === '__catalog_pdf__') {
                void onOpenCatalogPdf();
                return;
              }
              router.push(it.href as never);
            }}
            disabled={it.href === '__catalog_pdf__' && openingPdf}
            style={({ pressed }) => [
              styles.row,
              shadows.soft,
              {
                backgroundColor: theme.colors.surface,
                opacity: pressed ? 0.94 : 1,
              },
            ]}>
            <View style={[styles.icon, { backgroundColor: `${theme.colors.primary}14` }]}>
              <Ionicons name={it.icon} size={22} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 17 }}>{it.title}</Text>
              <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>{it.subtitle}</Text>
            </View>
            {it.href === '__catalog_pdf__' && openingPdf ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : (
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            )}
          </Pressable>
        ))}

        <Text style={[styles.sectionLabel, { fontFamily: theme.fonts.heading, color: theme.colors.text }]}>Sesión</Text>
        <Pressable
          onPress={confirmLogout}
          style={({ pressed }) => [
            styles.row,
            shadows.soft,
            styles.logoutRow,
            {
              backgroundColor: `${theme.colors.error}12`,
              opacity: pressed ? 0.92 : 1,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: `${theme.colors.error}44`,
            },
          ]}>
          <View style={[styles.icon, { backgroundColor: `${theme.colors.error}22` }]}>
            <Ionicons name="log-out-outline" size={22} color={theme.colors.error} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.error, fontSize: 17 }}>Cerrar sesión</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>Salir de la cuenta en este dispositivo</Text>
          </View>
        </Pressable>
      </ScrollView>
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  pad: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: 120,
  },
  sectionLabel: {
    fontSize: 18,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  logoutRow: {
    marginTop: spacing.xs,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
