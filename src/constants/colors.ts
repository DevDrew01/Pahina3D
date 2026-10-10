export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  primary: string;
  primaryHover: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accentBlue: string;
  cardShadow: string;
  progressTrack: string;
  progressFill: string;
}

export const lightColors: ThemeColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#EFF6FF',
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  accentBlue: '#60A5FA',
  cardShadow: 'rgba(37, 99, 235, 0.08)',
  progressTrack: '#E2E8F0',
  progressFill: '#2563EB',
};

export const darkColors: ThemeColors = {
  background: '#0B1120',
  surface: '#1E293B',
  surfaceSecondary: '#1E3A8A',
  primary: '#3B82F6',
  primaryHover: '#60A5FA',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#334155',
  accentBlue: '#93C5FD',
  cardShadow: 'rgba(0, 0, 0, 0.3)',
  progressTrack: '#334155',
  progressFill: '#3B82F6',
};