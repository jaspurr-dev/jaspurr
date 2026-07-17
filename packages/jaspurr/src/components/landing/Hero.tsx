import {Link} from 'react-router';
import style from './Hero.module.css';

/* Landing hero: the one-line pitch and a single way in. There is exactly one
primary action -- everything else on the page supports this. */
export function Hero() {
    return (
        <section className={style.hero}>
            <span className={style.badge}>No prompt engineering required</span>
            <h1 className={style.headline}>
                Your AI isn&apos;t the problem. Your prompt is.
            </h1>
            <p className={style.subhead}>
                Answer a few questions about your work. Jaspurr turns them into
                a structured prompt that gets a usable answer on the first try.
            </p>
            <Link to="/build" className={style.cta}>
                Build your template
            </Link>
            <p className={style.trust}>
                Free, no sign-up, and nothing leaves your browser.
            </p>
        </section>
    );
}
