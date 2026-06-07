/**
 * Summus Edge — Design tokens for programmatic use (StyleSheet, navigation, etc.)
 */
export const SummusColors = {
  primary: {
    surface: '#020617',
    background: '#0B1220',
    card: '#0F172A',
    elevated: '#1E293B',
    border: '#334155',
    foreground: '#F8FAFC',
    muted: '#94A3B8',
  },
  secondary: {
    DEFAULT: '#0EA5E9',
    electric: '#38BDF8',
    neon: '#00D4FF',
    glow: '#22D3EE',
  },
  accent: {
    gold: '#FBBF24',
    goldPremium: '#EAB308',
    emerald: '#10B981',
    emeraldBright: '#34D399',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#E11D48',
    info: '#0EA5E9',
  },
} as const

/** @deprecated Use SummusColors for new code */
const tintColorLight = SummusColors.secondary.DEFAULT
const tintColorDark = SummusColors.primary.foreground

export default {
  light: {
    text: SummusColors.primary.foreground,
    background: SummusColors.primary.background,
    tint: tintColorLight,
    tabIconDefault: SummusColors.primary.muted,
    tabIconSelected: SummusColors.secondary.neon,
  },
  dark: {
    text: SummusColors.primary.foreground,
    background: SummusColors.primary.surface,
    tint: tintColorDark,
    tabIconDefault: SummusColors.primary.muted,
    tabIconSelected: SummusColors.secondary.neon,
  },
}

export { SummusColors as Colors }
