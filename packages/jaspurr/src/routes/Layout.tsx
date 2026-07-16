import {Outlet} from 'react-router';
import {Nav} from '@components/navigation/Nav';

/* App shell wrapping the product pages: the persistent nav plus the routed
page beneath it. */
export function RouteLayout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
}
