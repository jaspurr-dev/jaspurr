import {Outlet} from 'react-router';
import {Nav} from '@components/navigation/Nav';
import {Footer} from '@/components/navigation/Footer';
import style from './Layout.module.css';

/* App shell wrapping the product pages: the persistent nav, the routed page
beneath it, and the footer. */
export function RouteLayout() {
    return (
        <div className={style.shell}>
            <Nav />
            <main className={style.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
