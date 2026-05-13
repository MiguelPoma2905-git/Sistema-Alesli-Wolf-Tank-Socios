import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { ProviderCard } from '@/components/ui/ProviderCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchSuppliers } from '@/lib/api';

export default function SuppliersScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const q = useQuery({ queryKey: ['suppliers'], queryFn: fetchSuppliers });

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader
        theme={theme}
        title="Proveedores"
        subtitle="Red floral confiable."
        rightSlot={
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={{ color: '#fff', fontFamily: theme.fonts.bodyMedium }}>Cerrar</Text>
          </Pressable>
        }
      />

      {q.isLoading ? (
        <View style={{ padding: spacing.lg, gap: spacing.sm }}>
          <Skeleton theme={theme} height={110} width="100%" />
          <Skeleton theme={theme} height={110} width="100%" />
        </View>
      ) : (
        <FlatList
          data={q.data ?? []}
          keyExtractor={(s) => s.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<EmptyState theme={theme} title="Sin proveedores" description="Registra tu primera red de compras." />}
          renderItem={({ item }) => <ProviderCard supplier={item} theme={theme} />}
        />
      )}
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
