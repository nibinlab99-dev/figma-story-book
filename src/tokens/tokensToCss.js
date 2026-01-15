export function convertTokensToCSS(tokens) {
    let cssVariables = ':root {\n';

    // Process each token set
    Object.keys(tokens).forEach(setName => {
       if (setName.startsWith('$')) return; // Skip metadata

        const tokenSet = tokens[setName];
        
        Object.keys(tokenSet).forEach(tokenName => {
            const token = tokenSet[tokenName];
            
            // Convert token name to CSS variable format (kebab-case)
            const cssVarName = `--${tokenName}`.replace(/_/g, '-');
            
            // Get the value, handling references like {base-blue-50}
            let value = token.value;
            
            // If value is a reference, convert it to CSS var()
            if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
                const refName = value.slice(1, -1).replace(/_/g, '-');
                value = `var(--${refName})`;
            }
            
            cssVariables += `  ${cssVarName}: ${value};\n`;
        });
        });

        cssVariables += '}';
        return cssVariables;
    }