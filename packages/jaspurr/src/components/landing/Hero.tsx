import style from './Hero.module.css';
import {BuildCta} from './BuildCta';

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
                Answer some questions that should take less than a minute and
                get a finished prompt, tailored to best practices for your
                domain.
            </p>
            <BuildCta />
            <p className={style.trust}>
                Free, no sign-up, and nothing leaves your browser.
            </p>
        </section>
    );
}
