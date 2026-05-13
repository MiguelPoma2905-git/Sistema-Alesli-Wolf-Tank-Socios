import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import * as Linking from 'expo-linking';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { FloralButton } from '@/components/ui/FloralButton';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { Skeleton } from '@/components/ui/Skeleton';
import { ADMIN_WHATSAPP_DIGITS } from '@/constants/branding';
import { radii, spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchProductById } from '@/lib/api';

export default function ProductDetailScreen() {
  const { width: W } = useWindowDimensions();
  const theme = useAppTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [idx, setIdx] = useState(0);
  const q = useQuery({ queryKey: ['product', id], queryFn: () => fetchProductById(String(id)) });

  const whatsappUrl = useMemo(() => {
    const phone = ADMIN_WHATSAPP_DIGITS;
    const msg = encodeURIComponent(`Hola Florería Alesli, consulto por ${q.data?.name ?? 'producto'}`);
    return `https://wa.me/${phone}?text=${msg}`;
  }, [q.data?.name]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const slideW = W || 1;
    const i = Math.round(x / slideW);
    setIdx(i);
  };

  if (q.isLoading) {
    return (
      <FloralScreen theme={theme} constrainWidth={false}>
        <View style={{ padding: spacing.lg }}>
          <Skeleton theme={theme} width="100%" height={260} radius={radii.lg} />
          <View style={{ height: spacing.lg }} />
          <Skeleton theme={theme} width="70%" height={28} />
        </View>
      </FloralScreen>
    );
  }

  if (!q.data) {
    return (
      <FloralScreen theme={theme} constrainWidth={false}>
        <Text style={{ padding: spacing.lg, color: theme.colors.text }}>Producto no encontrado.</Text>
        <FloralButton title="Volver" theme={theme} variant="outline" onPress={() => router.back()} />
      </FloralScreen>
    );
  }

  const p = q.data;

  return (
    <FloralScreen theme={theme} edges={['top']} constrainWidth={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={p.images}
          keyExtractor={(u) => u}
          onScroll={onScroll}
          renderItem={({ item }) => (
            <View style={{ width: W, height: 320 }}>
              <Image source={{ uri: item }} style={styles.img} contentFit="cover" transition={200} />
            </View>
          )}
        />
        <View style={styles.dots}>
          {p.images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === idx ? theme.colors.primary : theme.colors.border },
              ]}
            />
          ))}
        </View>

        <View style={{ paddingHorizontal: spacing.lg }}>
          <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 28 }}>{p.name}</Text>
          <Text style={{ color: theme.colors.primary, marginTop: 8, fontFamily: theme.fonts.bodyMedium, fontSize: 22 }}>
            Bs {p.priceBs} · {p.code}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, marginTop: spacing.md, lineHeight: 22 }}>{p.description}</Text>

          {p.flowers?.length ? (
            <View style={{ marginTop: spacing.md }}>
              <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>Flores</Text>
              <Text style={{ color: theme.colors.textSecondary, marginTop: 6 }}>{p.flowers.join(' · ')}</Text>
            </View>
          ) : null}

          {p.colors?.length ? (
            <View style={{ marginTop: spacing.md }}>
              <Text style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>Colores</Text>
              <Text style={{ color: theme.colors.textSecondary, marginTop: 6 }}>{p.colors.join(' · ')}</Text>
            </View>
          ) : null}

          <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
            <FloralButton title="Comprar ahora" theme={theme} onPress={() => Alert.alert('Checkout', 'Integra pasarela + QR en backend.')} />
            <FloralButton
              title="Reservar"
              theme={theme}
              variant="outline"
              onPress={() => Alert.alert('Reserva', 'Se confirmará por WhatsApp y agenda de entregas.')}
            />
            <FloralButton
              title="Consultar por WhatsApp"
              theme={theme}
              variant="ghost"
              leftIcon={<Ionicons name="logo-whatsapp" size={18} color={theme.colors.primary} />}
              onPress={() => Linking.openURL(whatsappUrl)}
            />
          </View>
        </View>
      </ScrollView>
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginVertical: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
