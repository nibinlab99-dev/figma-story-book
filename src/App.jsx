import Button from './components/Button';

function App() {
    return (
        <>
            <div style={{ padding: '40px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',gap: '12px' }}>
                <Button variant="primary" size="sm">Label</Button>
                <Button variant="primary" size="md">Label</Button>
                <Button variant="primary" size="lg">Label</Button>
            </div>
            <div style={{ padding: '40px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',gap: '12px' }}>
                <Button variant="secondary" size="sm">Label</Button>
                <Button variant="secondary" size="md">Label</Button>
                <Button variant="secondary" size="lg">Label</Button>
            </div>
        </>
    );
}

export default App;