import {isRouteErrorResponse, useRouteError} from 'react-router';

export function RouteError() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <>
                <h1>
                    {error.status} {error.statusText}
                </h1>
            </>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}
