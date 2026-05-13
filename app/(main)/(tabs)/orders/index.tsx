import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { OrderCard } from '@/components/ui/OrderCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { palette, spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchOrders } from '@/lib/api';

export default function OrdersListScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const q = useQuery({ queryKey: ['orders'], queryFn: fetchOrders });

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader theme={theme} title="Pedidos" subtitle="Control total del ciclo: reserva → entrega." />

      {q.isLoading ? (
        <View style={{ padding: spacing.lg, gap: spacing.sm }}>
          <Skeleton theme={theme} height={110} width="100%" />
          <Skeleton theme={theme} height={110} width="100%" />
        </View>
      ) : (
        <FlatList
          refreshControl={<RefreshControl refreshing={q.isFetching} onRefresh={() => void q.refetch()} />}
          data={q.data ?? []}
          keyExtractor={(o) => o.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <EmptyState theme={theme} title="Sin pedidos aún" description="Crea el primero con el botón flotante." />
          }
          renderItem={({ item }) => (
            <OrderCard order={item} theme={theme} onPress={() => router.push(`/(main)/(tabs)/orders/${item.id}`)} />
          )}
        />
      )}

      <Pressable
        onPress={() => router.push('/(main)/(tabs)/orders/new')}
        style={[styles.fab, { backgroundColor: palette.fuchsia }]}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    paddingBottom: 140,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xxl,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
});
