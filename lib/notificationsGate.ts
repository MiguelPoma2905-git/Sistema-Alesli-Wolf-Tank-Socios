import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

/** Expo Go (cliente tienda) — distinto de standalone / dev build */
export function isExpoGoClient(): boolean {
  return Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
}

/** Caso que rompe al cargar el módulo `expo-notifications` (push remotas retiradas). */
export function isExpoGoAndroid(): boolean {
  return isExpoGoClient() && Platform.OS === 'android';
}

/**
 * Solo entonces conviene cargar código que importe `expo-notifications`.
 * En Expo Go Android debe ser false siempre → sin import del paquete (ni dinámico).
 */
export function canImportExpoNotifications(): boolean {
  return !isExpoGoAndroid();
}
