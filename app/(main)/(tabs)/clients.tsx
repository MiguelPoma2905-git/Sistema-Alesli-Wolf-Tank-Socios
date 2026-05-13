import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { Skeleton } from '@/components/ui/Skeleton';
import { radii, shadows, spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchClients } from '@/lib/api';

export default function ClientsScreen() {
  const theme = useAppTheme();
  const q = useQuery({ queryKey: ['clients'], queryFn: fetchClients });

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader theme={theme} title="Clientes" subtitle="Relaciones que florecen con cada entrega." />

      {q.isLoading ? (
        <View style={{ padding: spacing.lg, gap: spacing.sm }}>
          <Skeleton theme={theme} height={96} width="100%" />
          <Skeleton theme={theme} height={96} width="100%" />
        </View>
      ) : (
        <FlatList
          data={q.data ?? []}
          keyExtractor={(c) => c.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<EmptyState theme={theme} title="Sin clientes" description="Registra tu primera compradora VIP." />}
          renderItem={({ item }) => (
            <View style={[styles.card, shadows.soft, { backgroundColor: theme.colors.surface }]}>
              <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 18 }}>{item.name}</Text>
              <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>{item.phone}</Text>
              <View style={styles.meta}>
                <Text style={{ color: theme.colors.primary }}>{item.totalOrders} pedidos</Text>
                <Text style={{ color: theme.colors.textSecondary }}>Bs {item.totalSpentBs}</Text>
              </View>
              {item.birthday ? (
                <Text style={{ color: theme.colors.textSecondary, marginTop: 8, fontSize: 13 }}>
                  Cumpleaños · {item.birthday}
                </Text>
              ) : null}
            </View>
          )}
        />
      )}
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    paddingBottom: 120,
    gap: spacing.sm,
  },
  card: {
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
});
