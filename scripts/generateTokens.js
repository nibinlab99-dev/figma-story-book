import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const GITHUB_API_URL =
  'https://api.github.com/repos/nibinlab99-dev/design-tokens/contents/tokens.json';
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('❌ VITE_GITHUB_TOKEN not found');
  process.exit(1);
}

/* ------------------------- helpers ------------------------- */

function sanitizeKey(key) {
  return key
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/-mode-\d+/i, '')
    .toLowerCase();
}

function resolveAlias(value) {
  if (
    typeof value === 'string' &&
    value.startsWith('{') &&
    value.endsWith('}')
  ) {
    return `var(--${value.slice(1, -1).replace(/\./g, '-')})`;
  }
  return value;
}

/* ------------------------- fetch ------------------------- */

async function fetchTokens() {
  const res = await fetch(GITHUB_API_URL, {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });

  if (!res.ok) {
    throw new Error(`GitHub fetch failed: ${res.status}`);
  }

  return res.json();
}

/* ------------------------- core logic ------------------------- */

function convertTokensToCSS(tokens) {
  let css = ':root {\n';

  function walk(node, path = [], skipFirstLevel = false) {
    if (typeof node !== 'object' || node === null) return;

    for (const [key, val] of Object.entries(node)) {
      if (key.startsWith('$')) continue;
      if (key === 'type') continue;

      const cleanKey = sanitizeKey(key);
      
      // Skip adding collection names (Color, Radius, etc.) to the path
      const nextPath = skipFirstLevel ? path : [...path, cleanKey];

      // 1️⃣ Emit token if it has a value
      if (val && typeof val === 'object' && 'value' in val) {
        const cssName = nextPath.join('-');
        const cssValue = resolveAlias(val.value);

        css += `  --${cssName}: ${cssValue};\n`;
      }

      // 2️⃣ Continue walking
      walk(val, nextPath, false);
    }
  }

  // Start walking but skip the first level (collection names)
  walk(tokens, [], true);
  
  css += '}\n';

  return css;
}

/* ------------------------- generate ------------------------- */

async function generateTokensCSS() {
  try {
    console.log('🔄 Fetching tokens from GitHub...');
    const tokens = await fetchTokens();

    console.log('🔄 Generating CSS variables...');
    const cssVars = convertTokensToCSS(tokens);

    const output = `/* Design tokens - Auto-generated from Figma via GitHub */
/* Last updated: ${new Date().toISOString()} */
/* To update: run 'npm run tokens:generate' */

${cssVars}`;

    const outPath = path.join(
      __dirname,
      '../src/scss/abstracts/_variables.scss'
    );

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output);

    console.log('✅ Tokens generated successfully at src/scss/abstracts/_variables.scss');
  } catch (err) {
    console.error('❌ Token generation failed:', err);
    process.exit(1);
  }
}

generateTokensCSS();