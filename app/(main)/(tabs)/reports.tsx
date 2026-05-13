import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { KPIWidget } from '@/components/ui/KPIWidget';
import { StatsChart } from '@/components/ui/StatsChart';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchDashboard, fetchReportSeries } from '@/lib/api';

export default function ReportsScreen() {
  const theme = useAppTheme();
  const dash = useQuery({ queryKey: ['dashboard'], queryFn: fetchDashboard });
  const series = useQuery({ queryKey: ['reports'], queryFn: fetchReportSeries });

  const refreshing = dash.isFetching || series.isFetching;

  const salesPts =
    series.data?.salesMonthly.map((p) => ({
      label: p.month,
      value: p.value / 100,
    })) ?? [];

  const profitPts =
    series.data?.profitMonthly.map((p) => ({
      label: p.month,
      value: p.value / 100,
    })) ?? [];

  const statusPts =
    series.data?.ordersByStatus.map((s) => ({
      label: s.label.slice(0, 4),
      value: s.value,
    })) ?? [];

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader theme={theme} title="Reportes ejecutivos" subtitle="Analytics visuales para decisiones rápidas." />

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void series.refetch()} />}
        contentContainerStyle={styles.pad}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <KPIWidget theme={theme} title="Ingresos mes" value={`Bs ${dash.data?.revenueMonthBs ?? 0}`} />
          </View>
          <View style={{ flex: 1 }}>
            <KPIWidget theme={theme} title="Pedidos activos" value={`${dash.data?.pendingOrders ?? 0}`} />
          </View>
        </View>

        {salesPts.length ? <StatsChart theme={theme} title="Ventas mensuales (×100 Bs)" data={salesPts} variant="line" /> : null}
        {profitPts.length ? (
          <StatsChart theme={theme} title="Ganancia referencial (×100 Bs)" data={profitPts} variant="line" />
        ) : null}
        {statusPts.length ? <StatsChart theme={theme} title="Pedidos por estado" data={statusPts} variant="bar" /> : null}

        <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>
          Los datos son demo local; conecta tu API REST + PostgreSQL para KPI reales y filtros por fecha.
        </Text>
      </ScrollView>
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  pad: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
