/**
 * JS-readable mirror of the CSS custom properties in `index.css`.
 * Three.js materials and canvas-based charts can't consume CSS vars directly,
 * so these hex values must be kept in sync with the `--layers-*` tokens.
 */
export const layersColors = {
  primary: '#1e6e8c',
  primaryHover: '#14536b',
  primaryLight: '#8fd2e6',
  ink: '#16181a',
  inkSoft: '#4a4f52',
  muted: '#868c8f',
  background: '#f5f7f8',
  surface: '#ffffff',
  surfaceAlt: '#e9f3f7',
  accent: '#a8895c',
  accentSoft: '#e6dcc4',
  accentHover: '#8a6f47',
  border: '#dce4e7',
  success: '#4c7a5b',
  warning: '#c67c2e',
  error: '#b3372c',
} as const;
