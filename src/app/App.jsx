import { HomePage } from '../pages/home/ui/HomePage';
import { GlowCursor } from '../shared/ui/GlowCursor';

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans antialiased text-white relative">
            <GlowCursor />
            <HomePage />
        </div>
    );
}

export default App;
