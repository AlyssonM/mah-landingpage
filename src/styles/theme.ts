export const colors = {
  background: '#131313',
  surface: '#131313',
  surfaceContainerLowest: '#0e0e0e',
  surfaceContainerLow: '#1c1b1b',
  surfaceContainer: '#201f1f',
  surfaceContainerHigh: '#2a2a2a',
  surfaceContainerHighest: '#353534',
  surfaceBright: '#3a3939',
  surfaceVariant: '#353534',
  surfaceTint: '#00dbe7',
  onSurface: '#e5e2e1',
  onSurfaceVariant: '#b9cacb',
  primary: '#e1fdff',
  primaryContainer: '#00f2ff',
  primaryFixed: '#74f5ff',
  primaryFixedDim: '#00dbe7',
  secondary: '#a5c8ff',
  secondaryContainer: '#2792ff',
  secondaryFixed: '#d4e3ff',
  secondaryFixedDim: '#a5c8ff',
  tertiary: '#fef5ff',
  tertiaryContainer: '#ead2ff',
  tertiaryFixed: '#efdbff',
  tertiaryFixedDim: '#dcb8ff',
  outline: '#849495',
  outlineVariant: '#3a494b',
  // Accent colors
  accent: '#00F2FF',
  accentSecondary: '#1E90FF',
  accentTertiary: '#8A2BE2',
} as const;

export const typography = {
  fontFamily: {
    inter: "'Inter', sans-serif",
    spaceGrotesk: "'Space Grotesk', sans-serif",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

export const spacing = {
  radius: '8px',
  radiusSm: '4px',
  radiusMd: '8px',
  radiusLg: '16px',
  radiusXl: '24px',
  radiusFull: '9999px',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
