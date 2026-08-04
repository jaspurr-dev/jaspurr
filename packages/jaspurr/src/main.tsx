import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router';
import {Provider} from 'jotai';
import '@styles/index.css';
import '@styles/components.css'; // TODO: this will be removed in the future once CSS components are refactored to co-locate
import {
    RouteHome,
    RouteSandbox,
    RouteError,
    RouteDesignTokens,
    RouteLayout,
    RouteBuild,
    RouteLibrary,
} from '@/routes';
import {Privacy} from './routes/Privacy';

const router = createBrowserRouter([
    {
        Component: RouteLayout,
        ErrorBoundary: RouteError,
        children: [
            {index: true, Component: RouteHome},
            {path: 'build', Component: RouteBuild},
            {path: 'library', Component: RouteLibrary},
            {path: 'privacy', Component: Privacy},
            {path: 'sandbox', Component: RouteSandbox},
            {path: 'designtokens', Component: RouteDesignTokens},
        ],
    },
]);

const root: HTMLElement | null = document.getElementById('root');
if (!root) throw new Error('Root element not found in the DOM');

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
