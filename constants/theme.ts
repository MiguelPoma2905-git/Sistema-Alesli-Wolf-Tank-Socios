export const palette = {
  roseStrong: '#C44597',
  fuchsia: '#E61E8C',
  rosePastel: '#E4D3DB',
  blackElegant: '#242424',
  purpleFloral: '#9B5AA0',
  roseVintage: '#C987B1',
  wine: '#C00062',
  roseNude: '#D3B4C7',
  magentaSoft: '#CD5A99',
  white: '#FFFFFF',
  cream: '#FBF7F9',
} as const;

export type ThemeMode = 'light' | 'dark';

export type AppTheme = {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    surfaceElevated: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    primaryMuted: string;
    accent: string;
    accentSoft: string;
    success: string;
    warning: string;
    error: string;
    overlay: string;
    gradientStart: string;
    gradientMid: string;
    gradientEnd: string;
    tabBar: string;
    tabIconInactive: string;
    tint: string;
  };
  fonts: {
    heading: string;
    body: string;
    headingSemiBold: string;
    bodyMedium: string;
  };
};

/** Comic Neue — tono cercano a cómic / logo juguetón; legible en UI */
const fonts = {
  heading: 'ComicNeue_700Bold',
  headingBold: 'ComicNeue_700Bold',
  body: 'ComicNeue_400Regular',
  bodyMedium: 'ComicNeue_700Bold',
  bodySemiBold: 'ComicNeue_700Bold',
};

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: palette.rosePastel,
    surface: palette.white,
    surfaceElevated: palette.cream,
    text: palette.blackElegant,
    textSecondary: '#5C5C5C',
    border: 'rgba(196, 69, 151, 0.18)',
    primary: palette.roseStrong,
    primaryMuted: palette.roseVintage,
    accent: palette.fuchsia,
    accentSoft: palette.magentaSoft,
    success: '#2E7D57',
    warning: '#C47F00',
    error: palette.wine,
    overlay: 'rgba(36, 36, 36, 0.45)',
    gradientStart: palette.fuchsia,
    gradientMid: palette.roseStrong,
    gradientEnd: palette.purpleFloral,
    tabBar: palette.white,
    tabIconInactive: '#B8A8B2',
    tint: palette.roseStrong,
  },
  fonts: {
    heading: fonts.heading,
    body: fonts.body,
    headingSemiBold: fonts.heading,
    bodyMedium: fonts.bodyMedium,
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#1A1418',
    surface: '#241C22',
    surfaceElevated: '#2D242C',
    text: palette.rosePastel,
    textSecondary: '#C4B8BF',
    border: 'rgba(228, 211, 219, 0.12)',
    primary: palette.magentaSoft,
    primaryMuted: palette.roseVintage,
    accent: palette.fuchsia,
    accentSoft: palette.roseNude,
    success: '#6BCB9A',
    warning: '#E6B35C',
    error: '#FF6B9D',
    overlay: 'rgba(0, 0, 0, 0.55)',
    gradientStart: '#4A1D3D',
    gradientMid: palette.wine,
    gradientEnd: palette.purpleFloral,
    tabBar: '#1E171C',
    tabIconInactive: '#7A6E76',
    tint: palette.magentaSoft,
  },
  fonts: {
    heading: fonts.heading,
    body: fonts.body,
    headingSemiBold: fonts.heading,
    bodyMedium: fonts.bodyMedium,
  },
};

export const shadows = {
  card: {
    shadowColor: '#6B1F52',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
};

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  full: 999,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  xxl: 40,
};
