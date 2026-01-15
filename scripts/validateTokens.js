import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractCSSVariables(cssContent) {
    const varRegex = /--([a-zA-Z0-9-_]+):/g;
    const variables = new Set();
    let match;
    
    while ((match = varRegex.exec(cssContent)) !== null) {
        variables.add(match[1]);
    }
    
    return variables;
}

function findUsedVariables(cssContent) {
    const usageRegex = /var\(--([a-zA-Z0-9-_]+)\)/g;
    const used = new Set();
    let match;
    
    while ((match = usageRegex.exec(cssContent)) !== null) {
        used.add(match[1]);
    }
    
    return used;
}

function validateCSSFiles() {
    const tokensPath = path.join(__dirname, '../src/tokens.css');
    const componentsDir = path.join(__dirname, '../src/components');
    
    const tokensContent = fs.readFileSync(tokensPath, 'utf-8');
    const definedVars = extractCSSVariables(tokensContent);
    
    console.log(`✅ Found ${definedVars.size} defined CSS variables in tokens.css`);
    
    const cssFiles = fs.readdirSync(componentsDir)
        .filter(file => file.endsWith('.css'))
        .map(file => path.join(componentsDir, file));
    
    let hasErrors = false;
    
    for (const cssFile of cssFiles) {
        const content = fs.readFileSync(cssFile, 'utf-8');
        const usedVars = findUsedVariables(content);
        const undefined = [...usedVars].filter(v => !definedVars.has(v));
        
        if (undefined.length > 0) {
            hasErrors = true;
            console.error(`\n❌ ${path.basename(cssFile)} uses undefined variables:`);
            undefined.forEach(v => console.error(`   --${v}`));
        }
    }
    
    if (!hasErrors) {
        console.log('\n✅ All CSS variables are valid!');
    } else {
        console.error('\n❌ Fix undefined CSS variables before deploying');
        process.exit(1);
    }
}

validateCSSFiles();
