import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

/** Layout y tipografía adaptativos (ancho, tablet, escala de fuente del sistema). */
export function useResponsive() {
  const { width, height, fontScale } = useWindowDimensions();

  return useMemo(() => {
    const isNarrow = width < 360;
    const isTablet = width >= 720;
    const maxContentWidth = Math.min(width - 24, 720);
    const gutter = width < 400 ? 12 : width < 600 ? 16 : 22;
    /** Limita crecimiento enorme si el usuario tiene fuentes muy grandes en accesibilidad */
    const clampFontScale = Math.min(Math.max(fontScale, 0.9), 1.25);
    const fs = (px: number) => Math.round(px * clampFontScale);

    return {
      width,
      height,
      fontScale: clampFontScale,
      isNarrow,
      isTablet,
      maxContentWidth,
      gutter,
      fs,
    };
  }, [width, height, fontScale]);
}
