import {Link} from 'react-router';
import {BrandMark} from '@components/icons/BrandMark';
import {ThemeToggle} from '@components/theme/ThemeToggle';
import style from './Nav.module.css';

/* App shell top bar: wordmark home link, section links, theme toggle, and the
primary "Get started" call to action. The section links target landing anchors;
"Get started" points home until the tool-flow route lands. */
export function Nav() {
    return (
        <nav className={style.nav}>
            <Link to="/" className={style.brand} aria-label="Scaffold home">
                <BrandMark />
                <span className={style.wordmark}>Scaffold</span>
            </Link>
            <div className={style.actions}>
                <a href="#roles" className={style.link}>
                    Roles
                </a>
                <a href="#how-it-works" className={style.link}>
                    How it works
                </a>
                <ThemeToggle />
                <Link to="/" className={style.cta}>
                    Get started
                </Link>
            </div>
        </nav>
    );
}
