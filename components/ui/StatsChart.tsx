import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';

import type { AppTheme } from '@/constants/theme';
import { spacing } from '@/constants/theme';

type Point = { label: string; value: number };

type Props = {
  theme: AppTheme;
  title: string;
  data: Point[];
  variant?: 'line' | 'bar';
};

export function StatsChart({ theme, title, data, variant = 'line' }: Props) {
  const { width: screenW } = useWindowDimensions();
  const chartW = Math.max(220, Math.min(screenW - spacing.lg * 2 - spacing.md * 2, 680));

  const primary = theme.colors.primary;
  const secondary = theme.colors.accentSoft;

  const lineData = data.map((d) => ({
    value: d.value,
    label: d.label,
    dataPointText: `${Math.round(d.value)}`,
  }));

  const barData = data.map((d) => ({
    value: d.value,
    label: d.label,
    frontColor: primary,
    gradientColor: secondary,
  }));

  return (
    <View style={[styles.box, { backgroundColor: theme.colors.surface }]}>
      <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 18, marginBottom: spacing.sm }}>
        {title}
      </Text>
      {variant === 'line' ? (
        <LineChart
          data={lineData}
          width={chartW}
          height={200}
          spacing={Math.min(42, chartW / 8)}
          initialSpacing={12}
          color={primary}
          thickness={3}
          startFillColor={primary}
          endFillColor={theme.colors.surface}
          startOpacity={0.35}
          endOpacity={0.05}
          hideDataPoints={false}
          dataPointsColor={secondary}
          textColor={theme.colors.textSecondary}
          yAxisTextStyle={{ color: theme.colors.textSecondary }}
          xAxisLabelTextStyle={{ color: theme.colors.textSecondary, fontSize: 10 }}
          curved
          areaChart
        />
      ) : (
        <BarChart
          barWidth={Math.min(22, chartW / 14)}
          spacing={Math.min(18, chartW / 20)}
          barBorderRadius={8}
          frontColor={primary}
          data={barData}
          width={chartW}
          height={200}
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: theme.colors.textSecondary }}
          xAxisLabelTextStyle={{ color: theme.colors.textSecondary, fontSize: 10 }}
          noOfSections={4}
          rulesColor={theme.colors.border}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
});
