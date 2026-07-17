import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    type LoaderFunctionArgs,
} from 'react-router';
import {Provider} from 'jotai';
import '@styles/index.css';
import '@styles/components.css'; // TODO: this will be removed in the future once CSS components are refactored to co-locate
import {
    RouteHome,
    RouteSandbox,
    RouteError,
    RouteDesignTokens,
    RouteTemplate,
    RouteLayout,
    RouteBuild,
    RouteLibrary,
} from '@/routes';
import {ThemeManager} from '@components/theme/ThemeManager';
import {getTemplate, type TemplateId} from '@/core/templates';
import {TemplateURLPrefix} from './util/template';

export function templateLoader({params}: LoaderFunctionArgs) {
    const template = getTemplate(params.templateId as TemplateId);
    if (!template) {
        console.error('template not found!');
        throw new Error('404 - Template Not Found');
    }
    return template;
}

const router = createBrowserRouter([
    {
        Component: RouteLayout,
        ErrorBoundary: RouteError,
        children: [
            {index: true, Component: RouteHome},
            {path: 'build', Component: RouteBuild},
            {path: 'library', Component: RouteLibrary},
            {path: 'sandbox', Component: RouteSandbox},
            {path: 'designtokens', Component: RouteDesignTokens},
            {
                path: `${TemplateURLPrefix}:templateId`,
                Component: RouteTemplate,
                loader: templateLoader,
            },
        ],
    },
]);

const root: HTMLElement | null = document.getElementById('root');
if (!root) throw new Error('Root element not found in the DOM');

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <Provider>
            <ThemeManager />
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
