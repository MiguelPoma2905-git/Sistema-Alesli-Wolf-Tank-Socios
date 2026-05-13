import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { AppTheme } from '@/constants/theme';
import { radii, shadows, spacing } from '@/constants/theme';
import type { Product } from '@/types/models';

type Props = {
  product: Product;
  theme: AppTheme;
  onPress: () => void;
  favorite?: boolean;
  onToggleFavorite?: () => void;
};

export function ProductCard({ product, theme, onPress, favorite, onToggleFavorite }: Props) {
  const uri = product.images[0];

  return (
    <Pressable
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [
        styles.card,
        shadows.card,
        {
          backgroundColor: theme.colors.surface,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}>
      <View style={styles.imageWrap}>
        <Image source={{ uri }} style={styles.image} contentFit="cover" transition={200} />
        <LinearGradient
          colors={['transparent', 'rgba(36,36,36,0.65)']}
          style={styles.imageGradient}
        />
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { fontFamily: theme.fonts.bodyMedium }]}>{product.code}</Text>
        </View>
        {onToggleFavorite ? (
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onToggleFavorite();
            }}
            style={styles.favBtn}>
            <Text style={{ fontSize: 18 }}>{favorite ? '♥' : '♡'}</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={{ padding: spacing.md }}>
        <Text
          numberOfLines={2}
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.text,
            fontSize: 17,
            marginBottom: 4,
          }}>
          {product.name}
        </Text>
        <Text numberOfLines={2} style={{ color: theme.colors.textSecondary, fontSize: 13 }}>
          {product.description}
        </Text>
        <View style={styles.row}>
          <Text style={{ color: theme.colors.primary, fontFamily: theme.fonts.bodyMedium, fontSize: 16 }}>
            Bs {product.priceBs}
          </Text>
          <Text style={{ color: product.available ? theme.colors.success : theme.colors.error, fontSize: 12 }}>
            {product.available ? 'Disponible' : 'Agotado'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  imageWrap: {
    height: 160,
    width: '100%',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  badgeText: {
    fontSize: 12,
    color: '#242424',
  },
  favBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
