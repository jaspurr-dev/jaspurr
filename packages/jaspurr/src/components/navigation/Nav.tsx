import {Link} from 'react-router';
import logo from '@assets/jaspurr_logo.png';
import {StartBuildLink} from './StartBuildLink';
import style from './Nav.module.css';

export function Nav() {
    return (
        <nav className={style.nav}>
            <Link to="/" className={style.brand} aria-label="Jaspurr home">
                <img
                    src={logo}
                    alt=""
                    width={28}
                    height={28}
                    className={style.logo}
                />
                <span className={style.wordmark}>Jaspurr</span>
            </Link>
            <div className={style.actions}>
                <Link to="/library" className={style.link}>
                    Library
                </Link>
                <StartBuildLink className={style.cta}>
                    Get started
                </StartBuildLink>
            </div>
        </nav>
    );
}
