import Button from './components/Button';

function App() {
    return (
        <>
            <h3 style={{padding: '60px 60px 0', textAlign: 'center', fontSize: '32px'}}>Buttons</h3>
            <div style={{ padding: '60px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',gap: '32px' }}>
                <div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="primary" size="sm">Label</Button>
                        <Button variant="primary" size="sm" className="focus">Label</Button>
                        <Button variant="primary" size="sm" className="hover">Label</Button>
                        <Button variant="primary" size="sm" disabled>Label</Button>
                    </div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="secondary" size="sm">Label</Button>
                        <Button variant="secondary" size="sm" className="focus">Label</Button>
                        <Button variant="secondary" size="sm" className="hover">Label</Button>
                        <Button variant="secondary" size="sm" disabled>Label</Button>
                    </div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="tertiary" size="sm">Label</Button>
                        <Button variant="tertiary" size="sm" className="focus">Label</Button>
                        <Button variant="tertiary" size="sm" className="hover">Label</Button>
                        <Button variant="tertiary" size="sm" disabled>Label</Button>
                    </div>
                </div>
                <div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="primary" size="md">Label</Button>
                        <Button variant="primary" size="md" className="focus">Label</Button>
                        <Button variant="primary" size="md" className="hover">Label</Button>
                        <Button variant="primary" size="md" disabled>Label</Button>
                    </div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="secondary" size="md">Label</Button>
                        <Button variant="secondary" size="md" className="focus">Label</Button>
                        <Button variant="secondary" size="md" className="hover">Label</Button>
                        <Button variant="secondary" size="md" disabled>Label</Button>
                    </div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="tertiary" size="md">Label</Button>
                        <Button variant="tertiary" size="md" className="focus">Label</Button>
                        <Button variant="tertiary" size="md" className="hover">Label</Button>
                        <Button variant="tertiary" size="md" disabled>Label</Button>
                    </div>
                </div>
                <div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="primary" size="lg">Label</Button>
                        <Button variant="primary" size="lg" className="focus">Label</Button>
                        <Button variant="primary" size="lg" className="hover">Label</Button>
                        <Button variant="primary" size="lg" disabled>Label</Button>
                    </div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="secondary" size="lg">Label</Button>
                        <Button variant="secondary" size="lg" className="focus">Label</Button>
                        <Button variant="secondary" size="lg" className="hover">Label</Button>
                        <Button variant="secondary" size="lg" disabled>Label</Button>
                    </div>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', minHeight: '80px', justifyContent: 'center',gap: '12px' }}>
                        <Button variant="tertiary" size="lg">Label</Button>
                        <Button variant="tertiary" size="lg" className="focus">Label</Button>
                        <Button variant="tertiary" size="lg" className="hover">Label</Button>
                        <Button variant="tertiary" size="lg" disabled>Label</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;