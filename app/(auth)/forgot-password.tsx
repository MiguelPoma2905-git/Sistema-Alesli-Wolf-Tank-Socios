import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { ElegantInput } from '@/components/ui/ElegantInput';
import { FloralButton } from '@/components/ui/FloralButton';
import { FloralScreen } from '@/components/ui/FloralScreen';
import { palette, radii, spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function ForgotPasswordScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    Alert.alert(
      'Listo',
      'Si el correo existe en Alesli, enviaremos instrucciones para restablecer tu acceso.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <FloralScreen theme={theme}>
      <LinearGradient
        colors={[palette.fuchsia, palette.roseStrong]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}>
        <Text style={{ fontFamily: theme.fonts.heading, color: '#fff', fontSize: 26 }}>Recuperar acceso</Text>
        <Text style={{ color: 'rgba(255,255,255,0.9)', marginTop: 8 }}>
          Te enviaremos un enlace seguro para crear una nueva contraseña.
        </Text>
      </LinearGradient>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <ElegantInput
          label="Correo registrado"
          theme={theme}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="nombre@empresa.com"
        />
        <View style={{ height: spacing.lg }} />
        <FloralButton title="Enviar instrucciones" theme={theme} loading={loading} onPress={submit} />
        <FloralButton title="Volver al login" theme={theme} variant="ghost" onPress={() => router.back()} />
      </View>
    </FloralScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
  },
  card: {
    marginHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.xl,
    gap: spacing.sm,
  },
});
