export type LogoVariant = 'generated' | 'architectural' | 'minimalist' | 'monogram' | 'custom';

export interface LogoConfig {
  variant: LogoVariant;
  customUrl: string | null;
  scale: number;
  contrast: 'charcoal' | 'natural' | 'soft';
  showFrame: boolean;
}

export interface GradientStyle {
  id: string;
  name: string;
  subtitle: string;
  background: string;
  accent: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  image: string;
  area: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
  description: string;
  isPrimary?: boolean;
}
