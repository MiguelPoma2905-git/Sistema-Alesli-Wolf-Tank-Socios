import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { KPIWidget } from '@/components/ui/KPIWidget';
import { OrderCard } from '@/components/ui/OrderCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { StatsChart } from '@/components/ui/StatsChart';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useResponsive } from '@/hooks/useResponsive';
import { fetchDashboard, fetchOrders } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function DashboardScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { isNarrow, fs } = useResponsive();

  const dash = useQuery({ queryKey: ['dashboard'], queryFn: fetchDashboard });
  const orders = useQuery({ queryKey: ['orders'], queryFn: fetchOrders });

  const refreshing = dash.isFetching || orders.isFetching;

  const chartData =
    dash.data?.topProducts.map((p) => ({
      label: p.name.slice(0, 6),
      value: p.units,
    })) ?? [];

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader
        theme={theme}
        title={`Hola, ${user?.name?.split(' ')[0] ?? 'Alesli'}`}
        subtitle="Tu día en Florería Alesli — boutique floral premium."
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              void dash.refetch();
              void orders.refetch();
            }}
          />
        }
        contentContainerStyle={styles.pad}>
        {dash.isLoading ? (
          <View style={{ gap: spacing.sm }}>
            <Skeleton theme={theme} width="100%" height={96} />
            <Skeleton theme={theme} width="100%" height={96} />
          </View>
        ) : (
          <View style={styles.kpiGrid}>
            <View style={[styles.kpiHalf, isNarrow && styles.kpiFull]}>
              <KPIWidget
                theme={theme}
                title="Ventas hoy"
                value={`Bs ${dash.data?.salesTodayBs ?? 0}`}
                subtitle="Incluye pedidos confirmados"
              />
            </View>
            <View style={[styles.kpiHalf, isNarrow && styles.kpiFull]}>
              <KPIWidget
                theme={theme}
                title="Pedidos pendientes"
                value={`${dash.data?.pendingOrders ?? 0}`}
                subtitle="Requieren seguimiento"
              />
            </View>
            <View style={[styles.kpiHalf, isNarrow && styles.kpiFull]}>
              <KPIWidget
                theme={theme}
                title="Ingresos (mes)"
                value={`Bs ${dash.data?.revenueMonthBs ?? 0}`}
                subtitle="Referencial demo"
              />
            </View>
            <View style={[styles.kpiHalf, isNarrow && styles.kpiFull]}>
              <KPIWidget
                theme={theme}
                title="Stock bajo"
                value={`${dash.data?.lowStockCount ?? 0}`}
                subtitle="Alertas de reposición"
              />
            </View>
          </View>
        )}

        {chartData.length ? (
          <StatsChart theme={theme} title="Top productos (unidades)" data={chartData} variant="bar" />
        ) : null}

        <Text
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.text,
            fontSize: fs(20),
            marginBottom: spacing.sm,
          }}>
          Últimos pedidos
        </Text>
        {orders.data?.slice(0, 3).map((o) => (
          <OrderCard key={o.id} order={o} theme={theme} onPress={() => router.push(`/(main)/(tabs)/orders/${o.id}`)} />
        ))}
      </ScrollView>
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  pad: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  kpiHalf: {
    width: '48%',
    flexGrow: 1,
    minWidth: '45%',
  },
  kpiFull: {
    width: '100%',
    minWidth: '100%',
  },
});
