import {BuildCta} from './BuildCta';
import style from './HowItWorks.module.css';

export function HowItWorks() {
    return (
        <section id="how-it-works" className={style.section}>
            <div className={style.intro}>
                <h2 className={style.heading}>
                    Answer some questions. That&apos;s the whole thing.
                </h2>
                <p className={style.subhead}>
                    Save time, get the AI results you want faster.
                </p>
            </div>

            <div className={style.section}>
                <div className={style.cta}>
                    <BuildCta />
                </div>
            </div>
        </section>
    );
}
