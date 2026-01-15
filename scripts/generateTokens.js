import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const GITHUB_API_URL = 'https://api.github.com/repos/nibinlab99-dev/design-tokens/contents/tokens.json';
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
    console.error('❌ VITE_GITHUB_TOKEN not found');
    console.error('   Add VITE_GITHUB_TOKEN to .env file');
    process.exit(1);
}

async function fetchTokens() {
    const response = await fetch(GITHUB_API_URL, {
        headers: {
            'Accept': 'application/vnd.github.v3.raw',
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

function convertTokensToCSS(tokens) {
    let css = ':root {\n';
    
    function processTokens(obj, prefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            if (key.startsWith('$')) continue;

            if (typeof value === 'object' && value !== null && !value.value) {
                const newPrefix = key.includes('/') ? '' : (prefix ? `${prefix}-${key}` : key);
                processTokens(value, newPrefix);
            } else {
                let tokenValue = value.value || value;
                if (typeof tokenValue === 'string' && tokenValue.startsWith('{') && tokenValue.endsWith('}')) {
                    const alias = tokenValue.slice(1, -1);
                    tokenValue = `var(--${alias})`;
                }
                const cssVarName = prefix ? `${prefix}-${key}` : key;
                css += `    --${cssVarName}: ${tokenValue};\n`;
            }
        }
    }
    
    processTokens(tokens);
    css += '}\n';
    return css;
}

async function generateTokensCSS() {
    try {
        console.log('🔄 Fetching design tokens from GitHub...');
        const tokens = await fetchTokens();
        
        console.log('🔄 Converting tokens to CSS...');
        const cssVariables = convertTokensToCSS(tokens);
        
        const cssContent = `/* Design tokens - Auto-generated from Figma via GitHub */
/* Last updated: ${new Date().toISOString()} */
/* To update: run 'npm run tokens:generate' */

${cssVariables}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}
`;
        
        const outputPath = path.join(__dirname, '../src/tokens.css');
        fs.writeFileSync(outputPath, cssContent);
        
        console.log('✅ Design tokens generated successfully at src/tokens.css');
    } catch (error) {
        console.error('❌ Error generating tokens:', error);
        process.exit(1);
    }
}

generateTokensCSS();
