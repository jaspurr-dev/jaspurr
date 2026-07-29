import {Link} from 'react-router';
import style from './Footer.module.css';

export function Footer() {
    return (
        <footer className={style.footer}>
            <Link to="/privacy" className={style.link}>
                Privacy Policy
            </Link>
        </footer>
    );
}
