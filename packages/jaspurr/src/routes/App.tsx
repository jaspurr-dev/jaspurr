//import DesignTokens from '@/components/DesignTokens';
import DesignTokens from '@/components/DesignTokens';
import {UISandbox} from '@/sandbox/Sandbox';
import '@styles/App.css';
import '@styles/components.css';

export function App() {
    return (
        <div className="app">
            <UISandbox></UISandbox>
            <DesignTokens></DesignTokens>
        </div>
    );
}
