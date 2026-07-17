import {Link} from 'react-router';
import {BrandMark} from '@components/icons/BrandMark';
import {ThemeToggle} from '@components/theme/ThemeToggle';
import style from './Nav.module.css';

/* App shell top bar: wordmark home link, section links, theme toggle, and the
primary "Get started" call to action into the tool flow. The section links
target landing anchors. */
export function Nav() {
    return (
        <nav className={style.nav}>
            <Link to="/" className={style.brand} aria-label="Jaspurr home">
                <BrandMark />
                <span className={style.wordmark}>Jaspurr</span>
            </Link>
            <div className={style.actions}>
                <a href="#roles" className={style.link}>
                    Roles
                </a>
                <a href="#how-it-works" className={style.link}>
                    How it works
                </a>
                <Link to="/library" className={style.link}>
                    Library
                </Link>
                <ThemeToggle />
                <Link to="/build" className={style.cta}>
                    Get started
                </Link>
            </div>
        </nav>
    );
}
