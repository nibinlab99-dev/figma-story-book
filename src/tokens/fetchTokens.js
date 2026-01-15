const GITHUB_API_URL = 'https://api.github.com/repos/nibinlab99-dev/design-tokens/contents/tokens.json';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function fetchDesignTokens() {
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3.raw',
            'Authorization': `token ${GITHUB_TOKEN}`
        };
        
        const response = await fetch(GITHUB_API_URL, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching design tokens:', error);
        return null;
    }
}