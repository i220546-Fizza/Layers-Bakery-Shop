/**
 * JS-readable mirror of the CSS custom properties in `index.css`.
 * Three.js materials and canvas-based charts can't consume CSS vars directly,
 * so these hex values must be kept in sync with the `--layers-*` tokens.
 */
export const layersColors = {
  primary: '#5fa9c2',
  primaryHover: '#4c879b',
  primaryLight: '#a9d8e8',
  ink: '#242424',
  inkSoft: '#55524f',
  muted: '#8a8580',
  background: '#ffffff',
  surface: '#ffffff',
  surfaceAlt: '#faf7f0',
  surfaceCool: '#ddf2f7',
  deep: '#3a2925',
  accent: '#c9a24d',
  accentSoft: '#d8bd78',
  accentHover: '#a1823e',
  border: '#e6e3dd',
  success: '#4c7a5b',
  warning: '#c67c2e',
  error: '#b3372c',
} as const;
