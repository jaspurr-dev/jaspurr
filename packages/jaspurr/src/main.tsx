import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@styles/index.css';
import {App} from '@routes/App';

const root: HTMLElement | null = document.getElementById('root');
if (!root) throw new Error('Root element not found in the DOM');
createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>
);
