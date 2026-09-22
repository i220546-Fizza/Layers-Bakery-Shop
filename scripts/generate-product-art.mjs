// Generates original, brand-palette SVG illustrations used as placeholder
// product/hero photography. Network access to external image hosts is
// blocked in this environment, so imagery is generated rather than fetched
// — replace files in client/public/images/ with real photography anytime.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../client/public/images/products');
mkdirSync(OUT_DIR, { recursive: true });

// Brand chrome (nav/buttons/text) is near-black + khaki-gold — see
// client/src/index.css — but that reads as flat/monochrome when used as
// the *food* illustration palette. These tones stay food-appropriate
// (chocolate/caramel/cream) while still using the brand gold as the one
// recurring accent, so the generated art still feels on-brand.
const palette = {
  chocolateDark: '#3d2a1c',
  chocolateMid: '#6b4226',
  espresso: '#2a1d14',
  accent: '#a8895c', // brand khaki-gold — matches --layers-accent
  accentSoft: '#e6dcc4', // matches --layers-accent-soft
  cream: '#f6f5f2', // matches --layers-background
  white: '#ffffff',
};

const bgVariants = [
  `linear-gradient(160deg, ${palette.chocolateMid}, ${palette.espresso})`,
  `linear-gradient(160deg, ${palette.chocolateDark}, ${palette.chocolateMid})`,
  `linear-gradient(160deg, ${palette.accent}, ${palette.chocolateDark})`,
  `linear-gradient(160deg, ${palette.espresso}, ${palette.chocolateDark})`,
];

function svgBg(gradient, id) {
  const stops = gradient.match(/#([0-9a-f]{6})/gi) ?? [palette.primary, palette.ink];
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${stops[0]}"/>
    <stop offset="100%" stop-color="${stops[1] ?? stops[0]}"/>
  </linearGradient></defs>
  <rect width="600" height="600" fill="url(#${id})"/>`;
}

const icons = {
  cake: (c1, c2, c3) => `
    <g transform="translate(150,190)">
      <ellipse cx="150" cy="230" rx="150" ry="22" fill="${palette.ink}" opacity="0.15"/>
      <rect x="10" y="150" width="280" height="80" rx="10" fill="${c1}"/>
      <rect x="35" y="80" width="230" height="75" rx="10" fill="${c2}"/>
      <rect x="65" y="15" width="170" height="70" rx="10" fill="${c3}"/>
      <path d="M65 15 q85 -30 170 0" stroke="${palette.accent}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="150" cy="0" r="10" fill="${palette.accent}"/>
      <rect x="10" y="150" width="280" height="10" fill="${palette.accent}" opacity="0.6"/>
      <rect x="35" y="80" width="230" height="10" fill="${palette.accent}" opacity="0.6"/>
    </g>`,
  cupcake: (c1, c2) => `
    <g transform="translate(210,160)">
      <path d="M20 120 L80 120 L70 230 Q50 245 30 230 Z" fill="${c1}"/>
      <path d="M0 60 Q90 -10 180 60 Q170 130 90 130 Q10 130 0 60 Z" fill="${c2}"/>
      <circle cx="90" cy="20" r="10" fill="${palette.accent}"/>
      <path d="M20 130 L160 130" stroke="${palette.accent}" stroke-width="6" opacity="0.5"/>
    </g>`,
  brownie: (c1, c2) => `
    <g transform="translate(150,220)">
      <rect x="0" y="0" width="300" height="140" rx="18" fill="${c1}"/>
      <rect x="20" y="18" width="260" height="30" rx="8" fill="${c2}" opacity="0.7"/>
      <circle cx="60" cy="90" r="10" fill="${palette.accent}" opacity="0.8"/>
      <circle cx="150" cy="70" r="8" fill="${palette.accent}" opacity="0.6"/>
      <circle cx="230" cy="95" r="11" fill="${palette.accent}" opacity="0.8"/>
    </g>`,
  cookie: (c1, c2) => `
    <g transform="translate(180,180)">
      <circle cx="120" cy="120" r="120" fill="${c1}"/>
      <circle cx="70" cy="80" r="12" fill="${c2}"/>
      <circle cx="150" cy="60" r="9" fill="${c2}"/>
      <circle cx="170" cy="140" r="11" fill="${c2}"/>
      <circle cx="90" cy="170" r="8" fill="${c2}"/>
      <circle cx="140" cy="110" r="7" fill="${c2}"/>
    </g>`,
  donut: (c1, c2) => `
    <g transform="translate(160,180)">
      <circle cx="140" cy="140" r="140" fill="${c1}"/>
      <circle cx="140" cy="140" r="55" fill="${palette.cream}"/>
      <path d="M20 100 Q140 40 260 100 Q220 60 140 60 Q60 60 20 100Z" fill="${c2}" opacity="0.9"/>
      <circle cx="90" cy="70" r="6" fill="${palette.accent}"/>
      <circle cx="180" cy="65" r="6" fill="${palette.ink}"/>
      <circle cx="220" cy="110" r="6" fill="${palette.accent}"/>
      <circle cx="60" cy="120" r="6" fill="${palette.ink}"/>
    </g>`,
  dessert: (c1, c2) => `
    <g transform="translate(190,150)">
      <path d="M0 200 L110 200 L95 40 Q55 10 15 40 Z" fill="${c1}" opacity="0.5"/>
      <path d="M15 130 L95 130 L88 200 L22 200 Z" fill="${c2}"/>
      <path d="M8 90 L102 90 L95 140 L15 140 Z" fill="${c1}"/>
      <circle cx="55" cy="30" r="10" fill="${palette.accent}"/>
    </g>`,
  sundae: (c1, c2) => `
    <g transform="translate(190,140)">
      <path d="M10 40 L110 40 L75 210 Q55 225 35 210 Z" fill="${c2}" opacity="0.35"/>
      <ellipse cx="60" cy="40" rx="60" ry="26" fill="${c1}"/>
      <ellipse cx="60" cy="10" rx="45" ry="20" fill="${c2}"/>
      <circle cx="60" cy="-15" r="16" fill="${palette.accent}"/>
    </g>`,
  beverage: (c1, c2) => `
    <g transform="translate(220,150)">
      <path d="M10 20 L150 20 L135 220 Q80 240 25 220 Z" fill="${c1}" opacity="0.25"/>
      <rect x="10" y="20" width="140" height="30" rx="6" fill="${c2}"/>
      <path d="M25 60 L135 60 L122 210 Q80 226 38 210 Z" fill="${c1}"/>
    </g>`,
};

const products = [
  ['cake', 1], ['cake', 2], ['cake', 3],
  ['cupcake', 1], ['cupcake', 2], ['cupcake', 3],
  ['brownie', 1], ['brownie', 2], ['brownie', 3],
  ['cookie', 1], ['cookie', 2], ['cookie', 3],
  ['donut', 1], ['donut', 2], ['donut', 3],
  ['dessert', 1], ['dessert', 2], ['dessert', 3],
  ['sundae', 1], ['sundae', 2], ['sundae', 3],
  ['beverage', 1], ['beverage', 2], ['beverage', 3],
];

const shades = [
  [palette.chocolateMid, palette.chocolateDark, palette.espresso],
  [palette.chocolateDark, palette.accent, palette.chocolateMid],
  [palette.espresso, palette.chocolateMid, palette.accentSoft],
  [palette.accent, palette.espresso, palette.chocolateDark],
];

products.forEach(([type, variant], i) => {
  const bg = bgVariants[i % bgVariants.length];
  const [c1, c2, c3] = shades[i % shades.length];
  const iconSvg = icons[type](c1, c2, c3);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    ${svgBg(bg, `g${i}`)}
    ${iconSvg}
  </svg>`;
  writeFileSync(join(OUT_DIR, `${type}-${variant}.svg`), svg.trim());
});

console.log(`Generated ${products.length} product illustrations in ${OUT_DIR}`);
