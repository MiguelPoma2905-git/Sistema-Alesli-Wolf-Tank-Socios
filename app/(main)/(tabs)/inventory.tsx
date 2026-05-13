import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { InventoryCard } from '@/components/ui/InventoryCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchInventory } from '@/lib/api';

export default function InventoryScreen() {
  const theme = useAppTheme();
  const q = useQuery({ queryKey: ['inventory'], queryFn: fetchInventory });

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader theme={theme} title="Inventario floral" subtitle="Insumos, detalles y materiales premium." />

      {q.isLoading ? (
        <View style={{ padding: spacing.lg, gap: spacing.sm }}>
          <Skeleton theme={theme} height={72} width="100%" />
          <Skeleton theme={theme} height={72} width="100%" />
        </View>
      ) : (
        <FlatList
          refreshControl={<RefreshControl refreshing={q.isFetching} onRefresh={() => void q.refetch()} />}
          data={q.data ?? []}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <Text style={{ color: theme.colors.textSecondary, marginBottom: spacing.sm }}>
              Entradas / salidas se sincronizarán con tu API Node + PostgreSQL.
            </Text>
          }
          ListEmptyComponent={<EmptyState theme={theme} title="Sin ítems" description="Conecta la API para ver stock real." />}
          renderItem={({ item }) => <InventoryCard item={item} theme={theme} />}
        />
      )}
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
});
