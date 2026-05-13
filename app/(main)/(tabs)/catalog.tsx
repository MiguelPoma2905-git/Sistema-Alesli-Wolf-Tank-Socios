import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { ElegantInput } from '@/components/ui/ElegantInput';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { ProductCard } from '@/components/ui/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchProducts } from '@/lib/api';
import { openCatalogPdf } from '@/lib/openCatalogPdf';
import { useUiStore } from '@/store/uiStore';
import type { ProductCategory } from '@/types/models';

const CATEGORIES: { id: 'todas' | ProductCategory; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'ramos', label: 'Ramos' },
  { id: 'arreglos', label: 'Arreglos' },
  { id: 'cajas', label: 'Cajas' },
  { id: 'globos', label: 'Globos' },
  { id: 'chocolates', label: 'Chocolates' },
];

export default function CatalogScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]['id']>('todas');
  const favorites = useUiStore((s) => s.favorites);
  const toggleFavorite = useUiStore((s) => s.toggleFavorite);
  const [pdfLoading, setPdfLoading] = useState(false);

  const queryKey = useMemo(() => ['products', q, cat], [q, cat]);
  const products = useQuery({
    queryKey,
    queryFn: () => fetchProducts(q, cat === 'todas' ? undefined : cat),
  });

  return (
    <FloralScreen theme={theme} edges={['top']}>
      <DashboardHeader theme={theme} title="Catálogo boutique" subtitle="Arreglos únicos, pensados para emocionar." />

      <Pressable
        onPress={async () => {
          setPdfLoading(true);
          try {
            await openCatalogPdf();
          } finally {
            setPdfLoading(false);
          }
        }}
        disabled={pdfLoading}
        style={({ pressed }) => [
          styles.pdfLink,
          {
            borderColor: theme.colors.primary,
            backgroundColor: pressed ? `${theme.colors.primary}18` : `${theme.colors.primary}0D`,
            opacity: pdfLoading ? 0.85 : 1,
          },
        ]}>
        <Ionicons name="document-text-outline" size={22} color={theme.colors.primary} />
        <Text style={{ flex: 1, color: theme.colors.primary, fontFamily: theme.fonts.bodyMedium }}>
          Catálogo PDF oficial Alesli
        </Text>
        {pdfLoading ? <ActivityIndicator color={theme.colors.primary} /> : null}
      </Pressable>

      <View style={{ paddingHorizontal: spacing.lg, marginTop: -spacing.md }}>
        <ElegantInput label="Buscar por nombre o código" theme={theme} value={q} onChangeText={setQ} placeholder="A-2, rosas..." />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {CATEGORIES.map((c) => {
          const active = cat === c.id;
          return (
            <Pressable
              key={c.id}
              onPress={() => setCat(c.id)}
              style={[
                styles.chip,
                {
                  borderColor: active ? theme.colors.primary : theme.colors.border,
                  backgroundColor: active ? `${theme.colors.primary}18` : theme.colors.surface,
                },
              ]}>
              <Text style={{ color: theme.colors.text, fontFamily: theme.fonts.bodyMedium }}>{c.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {products.isLoading ? (
        <View style={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}>
          <Skeleton theme={theme} height={220} width="100%" />
          <Skeleton theme={theme} height={220} width="100%" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={products.data ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: 120 }}
            ListEmptyComponent={
              <EmptyState theme={theme} title="Sin resultados" description="Prueba otra categoría o limpia la búsqueda." />
            }
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                theme={theme}
                favorite={favorites.includes(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onPress={() => router.push(`/(main)/product/${item.id}`)}
              />
            )}
          />
        </View>
      )}
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  pdfLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: spacing.lg,
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  chips: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
});
