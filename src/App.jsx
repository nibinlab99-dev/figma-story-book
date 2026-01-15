import Button from './components/Button';
import { useDesignTokens } from './tokens/useDesignTokens';

function App() {
    const { tokensLoaded, error } = useDesignTokens();

    if (error) {
        return <div>Error loading design tokens: {error}</div>;
    }

    if (!tokensLoaded) {
        return <div>Loading design tokens...</div>;
    }

    return (
        <div style={{ padding: '40px' }}>
            <Button variant="primary" size="md" disabled>Label</Button>
            <Button variant="primary" size="lg">Label</Button>
        </div>
    );
}

export default App;