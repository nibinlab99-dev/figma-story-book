import { useEffect, useState } from 'react';
    import { fetchDesignTokens } from './fetchTokens';
    import { convertTokensToCSS } from './tokensToCss';

    export function useDesignTokens() {
        const [tokensLoaded, setTokensLoaded] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
        async function loadTokens() {
            try {
            // Fetch tokens from GitHub
            const tokens = await fetchDesignTokens();
            
            if (!tokens) {
                throw new Error('Failed to fetch tokens');
            }

            // Convert tokens to CSS
            const cssVariables = convertTokensToCSS(tokens);

            // Inject CSS into the document
            const styleElement = document.getElementById('design-tokens-style') || document.createElement('style');
            styleElement.id = 'design-tokens-style';
            styleElement.textContent = cssVariables;
            
            if (!document.getElementById('design-tokens-style')) {
                document.head.appendChild(styleElement);
            }

            setTokensLoaded(true);
            console.log('✅ Design tokens loaded successfully');
            } catch (err) {
            console.error('❌ Error loading design tokens:', err);
            setError(err.message);
            }
        }

        loadTokens();
        }, []);

    return { tokensLoaded, error };
}