/**
 * JS-readable mirror of the CSS custom properties in `index.css`.
 * Three.js materials and canvas-based charts can't consume CSS vars directly,
 * so these hex values must be kept in sync with the `--layers-*` tokens.
 */
export const layersColors = {
  primary: '#141414',
  primaryHover: '#000000',
  primaryLight: '#2e2e2e',
  ink: '#141414',
  inkSoft: '#4a4a4a',
  muted: '#8a8a86',
  background: '#f6f5f2',
  surface: '#ffffff',
  surfaceAlt: '#efe8d8',
  accent: '#a8895c',
  accentSoft: '#e6dcc4',
  accentHover: '#8a6f47',
  border: '#e3e0d9',
  success: '#4c7a5b',
  warning: '#c67c2e',
  error: '#b3372c',
} as const;
