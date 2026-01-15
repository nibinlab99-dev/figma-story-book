import Button from './components/Button';

function App() {
    return (
        <div style={{ padding: '40px' }}>
            <h1>Design Token System</h1>
            <p>✅ Tokens loaded from static CSS!</p>
            <Button variant="primary" size="md" disabled>Label</Button>
            <Button variant="primary" size="lg">Label</Button>
        </div>
    );
}

export default App;