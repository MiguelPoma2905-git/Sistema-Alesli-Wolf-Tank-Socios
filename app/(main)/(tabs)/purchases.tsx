import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { Skeleton } from '@/components/ui/Skeleton';
import { radii, shadows, spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchPurchases } from '@/lib/api';

export default function PurchasesScreen() {
  const theme = useAppTheme();
  const q = useQuery({ queryKey: ['purchases'], queryFn: fetchPurchases });

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader theme={theme} title="Compras a proveedores" subtitle="Trazabilidad de insumos y costos." />

      {q.isLoading ? (
        <View style={{ padding: spacing.lg, gap: spacing.sm }}>
          <Skeleton theme={theme} height={100} width="100%" />
          <Skeleton theme={theme} height={100} width="100%" />
        </View>
      ) : (
        <FlatList
          data={q.data ?? []}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<EmptyState theme={theme} title="Sin compras" description="Registra tu primera orden de compra." />}
          renderItem={({ item }) => (
            <View style={[styles.card, shadows.soft, { backgroundColor: theme.colors.surface }]}>
              <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 17 }}>{item.supplierName}</Text>
              <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
                {new Date(item.date).toLocaleDateString()} · {item.reference}
              </Text>
              <Text style={{ color: theme.colors.primary, marginTop: spacing.sm, fontFamily: theme.fonts.bodyMedium }}>
                Bs {item.amountBs}
              </Text>
              <Text style={{ color: theme.colors.textSecondary, marginTop: 8, fontSize: 13 }}>
                {item.items.join(' · ')}
              </Text>
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
  },
  card: {
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
});
