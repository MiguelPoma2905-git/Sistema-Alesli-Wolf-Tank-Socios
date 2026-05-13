import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuthStore } from '@/store/authStore';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color }: { name: IconName; color: string }) {
  return <Ionicons name={name} size={24} color={color} />;
}

export default function TabLayout() {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const role = useAuthStore((s) => s.user?.role ?? 'admin');
  const tabPad = width >= 600 ? 20 : 6;

  const isAdmin = role === 'admin';
  const isVen = role === 'vendedor';
  const isAlm = role === 'almacen';

  const hide = (shouldHide: boolean) => (shouldHide ? null : undefined);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabIconInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopColor: theme.colors.border,
          height: Platform.OS === 'ios' ? (width >= 768 ? 92 : 88) : width >= 768 ? 72 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 10,
          paddingHorizontal: tabPad,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fonts.bodyMedium,
          fontSize: width < 360 ? 10 : 11,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabIcon name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Catálogo',
          href: hide(isAlm),
          tabBarIcon: ({ color }) => <TabIcon name="grid-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventario',
          href: hide(!isAlm),
          tabBarIcon: ({ color }) => <TabIcon name="cube-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <TabIcon name="clipboard-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reportes',
          href: hide(!isAdmin),
          tabBarIcon: ({ color }) => <TabIcon name="bar-chart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: 'Clientes',
          href: hide(!isVen && !isAdmin),
          tabBarIcon: ({ color }) => <TabIcon name="people-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="purchases"
        options={{
          title: 'Compras',
          href: hide(!isAlm),
          tabBarIcon: ({ color }) => <TabIcon name="bag-handle-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'Más',
          tabBarIcon: ({ color }) => <TabIcon name="ellipsis-horizontal-circle-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
