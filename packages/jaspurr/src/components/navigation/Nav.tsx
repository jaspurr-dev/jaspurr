import {Link} from 'react-router';
import {BrandMark} from '@components/icons/BrandMark';
import style from './Nav.module.css';

export function Nav() {
    return (
        <nav className={style.nav}>
            <Link to="/" className={style.brand} aria-label="Jaspurr home">
                <BrandMark />
                <span className={style.wordmark}>Jaspurr</span>
            </Link>
            <div className={style.actions}>
                <Link to="/library" className={style.link}>
                    Library
                </Link>
                <Link to="/build" className={style.cta}>
                    Get started
                </Link>
            </div>
        </nav>
    );
}
