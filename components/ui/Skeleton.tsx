import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import type { AppTheme } from '@/constants/theme';
import { radii } from '@/constants/theme';

export function Skeleton({
  theme,
  height,
  width,
  radius = radii.md,
}: {
  theme: AppTheme;
  height: number;
  width: number | `${number}%`;
  radius?: number;
}) {
  const t = useSharedValue(0.35);

  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, [t]);

  const style = useAnimatedStyle(() => ({
    opacity: 0.35 + t.value * 0.35,
  }));

  return (
    <Animated.View
      style={[
        {
          height,
          width,
          borderRadius: radius,
          backgroundColor: theme.colors.border,
        },
        style,
      ]}
    />
  );
}
