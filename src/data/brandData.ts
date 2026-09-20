import { ColorSwatch, GradientStyle, Project } from '../types';

export const BRAND_PALETTE: ColorSwatch[] = [
  {
    name: 'Primary Warm Linen',
    hex: '#F2E7D1',
    role: 'Primary Brand Canvas',
    description: 'The foundation of the identity—a tactile, calming mineral cream evoking lime plaster and raw linen.',
    isPrimary: true,
  },
  {
    name: 'Alabaster Light',
    hex: '#FAF6EE',
    role: 'Ambient Highlight',
    description: 'Used for gentle top-light gradients and elevated card surfaces.',
  },
  {
    name: 'Oatmeal Sand',
    hex: '#E5D8BE',
    role: 'Secondary Depth',
    description: 'Adds tactile shading and organic contour transitions across structural elevations.',
  },
  {
    name: 'Raw Travertine',
    hex: '#D7C4A5',
    role: 'Subtle Structural Accent',
    description: 'Drawn from unpolished stone surfaces and weathered timber detailing.',
  },
  {
    name: 'Obsidian Ink',
    hex: '#1E1D1A',
    role: 'Typographic Contrast',
    description: 'Deep high-contrast charcoal for razor-sharp typography and structural wireframes.',
  },
];

export const GRADIENT_PRESETS: GradientStyle[] = [
  {
    id: 'mineral-cream',
    name: 'Primary Mineral #f2e7d1',
    subtitle: 'Classic Brand Essence',
    background: 'radial-gradient(circle at 50% 0%, #FAF6EE 0%, #F2E7D1 55%, #E8DAC0 100%)',
    accent: '#1E1D1A',
  },
  {
    id: 'warm-linear',
    name: 'Linear Silk',
    subtitle: '135° Balanced Flow',
    background: 'linear-gradient(135deg, #FBF8F1 0%, #F2E7D1 45%, #E6D7BD 100%)',
    accent: '#262420',
  },
  {
    id: 'studio-glow',
    name: 'Atelier Glow',
    subtitle: 'Dual Radial Depth',
    background: 'radial-gradient(at 20% 20%, #FAF6EE 0px, transparent 50%), radial-gradient(at 80% 80%, #E3D3B5 0px, transparent 50%), #F2E7D1',
    accent: '#1A1917',
  },
  {
    id: 'terracotta-soft',
    name: 'Parchment Drift',
    subtitle: 'Quiet Horizon',
    background: 'linear-gradient(180deg, #FAF7F0 0%, #F2E7D1 60%, #EADCBE 100%)',
    accent: '#2B2925',
  },
];

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'The Linen Pavilion',
    category: 'Civic Cultural Space',
    year: '2025',
    location: 'Kyoto / Arashiyama',
    description: 'A quiet monolithic pavilion structured with poured rammed earth and translucent acoustic linen veils, tuned to natural solar declination.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    area: '480 m²',
  },
  {
    id: '02',
    title: 'Monolith House',
    category: 'Private Residence',
    year: '2024',
    location: 'Mallorca / Serra de Tramuntana',
    description: 'Anchored directly into calcified limestone terraces with sweeping courtyards framed in brushed bronze and warm plaster.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    area: '720 m²',
  },
  {
    id: '03',
    title: 'Atelier Gallery 07',
    category: 'Spatial Design & Exhibition',
    year: '2025',
    location: 'Copenhagen / Christianshavn',
    description: 'Restoration of a naval warehouse into an adaptive daylight gallery utilizing monolithic travertine plinths and flax pigments.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    area: '1,150 m²',
  },
];
