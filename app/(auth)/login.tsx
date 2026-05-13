import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ElegantInput } from '@/components/ui/ElegantInput';
import { FloralButton } from '@/components/ui/FloralButton';
import { palette, radii, spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useResponsive } from '@/hooks/useResponsive';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

const LOGO_LOCAL = require('../../assets/logos/logo1.jpg');

export default function LoginScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const setThemePreference = useUiStore((s) => s.setThemePreference);
  const insets = useSafeAreaInsets();
  const { maxContentWidth, width, fs, gutter } = useResponsive();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const isDark = theme.mode === 'dark';

  const gradientColors = useMemo(
    () =>
      isDark
        ? ([palette.wine, '#2A1623', theme.colors.background] as const)
        : ([palette.rosePastel, palette.white, palette.cream] as const),
    [isDark, theme.colors.background]
  );

  const toggleAppearance = useCallback(() => {
    setThemePreference(isDark ? 'light' : 'dark');
  }, [isDark, setThemePreference]);

  const onSubmit = async () => {
    setError(undefined);
    setLoading(true);
    const res = await login(email.trim(), password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.replace('/(main)/(tabs)');
  };

  return (
    <LinearGradient
      key={theme.mode}
      colors={[...gradientColors]}
      style={styles.flex}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
          <View style={{ flex: 1 }} />
          <Pressable
            onPress={toggleAppearance}
            accessibilityRole="button"
            accessibilityLabel={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            style={[
              styles.themeBtn,
              {
                backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(196,69,151,0.12)',
                borderColor: theme.colors.border,
              },
            ]}>
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={22} color={isDark ? '#FFE8B8' : palette.roseStrong} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingHorizontal: gutter }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Animated.View
            entering={FadeInUp.duration(520)}
            style={[styles.logoBlock, { width: '100%', maxWidth: maxContentWidth }]}>
            <View
              style={[
                styles.logoWrap,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  shadowColor: isDark ? '#000' : palette.roseStrong,
                },
              ]}>
              <Image
                source={LOGO_LOCAL}
                style={[styles.logoImg, { width: Math.min(width - 80, 260), height: Math.min(width - 80, 260) * 0.34 }]}
                contentFit="contain"
                transition={240}
              />
            </View>
            <Text style={[styles.brand, { color: theme.colors.text, fontFamily: theme.fonts.heading, fontSize: fs(28) }]}>
              Florería Alesli
            </Text>
            <Text style={[styles.tagline, { color: theme.colors.textSecondary, fontSize: fs(15) }]}>
              Boutique floral · pedidos, inventario y entregas con elegancia
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(120).duration(560)}
            style={[styles.card, { backgroundColor: theme.colors.surface, width: '100%', maxWidth: maxContentWidth }]}>
            <Text style={[styles.title, { fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: fs(26) }]}>
              Bienvenida
            </Text>
            <Text style={{ color: theme.colors.textSecondary, marginBottom: spacing.lg }}>
              Accede al panel interno con tu cuenta corporativa.
            </Text>

            <ElegantInput
              label="Correo electrónico"
              theme={theme}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholder="tu@correo.com"
            />
            <View style={{ height: spacing.md }} />
            <ElegantInput
              label="Contraseña"
              theme={theme}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
            />

            {error ? (
              <Text style={{ color: theme.colors.error, marginTop: spacing.sm }}>{error}</Text>
            ) : null}

            <View style={{ height: spacing.lg }} />

            <FloralButton title="Entrar" theme={theme} loading={loading} onPress={onSubmit} />

            <Link href="/(auth)/forgot-password" asChild>
              <Pressable>
                <Text style={[styles.link, { color: theme.colors.primary }]}>¿Olvidaste tu contraseña?</Text>
              </Pressable>
            </Link>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  themeBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  logoBlock: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoWrap: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.xl,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: spacing.md,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 8,
  },
  logoImg: {
    maxWidth: '100%',
  },
  brand: {
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  tagline: {
    marginTop: spacing.sm,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    lineHeight: 22,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.xl,
    shadowColor: '#6B1F52',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 10,
  },
  title: {
    marginBottom: spacing.sm,
  },
  link: {
    textAlign: 'center',
    marginTop: spacing.md,
    fontSize: 14,
  },
});
