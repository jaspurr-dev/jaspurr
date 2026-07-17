import {cx} from '@/util/cx';
import {BuildCta} from './BuildCta';
import style from './HowItWorks.module.css';

const STEPS: readonly string[] = [
    'Pick your role',
    'Tap three answers',
    'Add one line',
    'Copy and paste',
];

/* Stills of the two question types the flow uses, shown for illustration only --
neither the options nor the field respond to input here. */
const MC_OPTIONS: readonly {label: string; selected: boolean}[] = [
    {label: 'Greenfield, no legacy', selected: false},
    {label: 'Mature and well-tested', selected: true},
    {label: 'Legacy and fragile', selected: false},
    {label: 'Something else', selected: false},
];

const EXAMPLE_CHIPS: readonly string[] = [
    'Refactor a slow endpoint',
    'Add tests to a legacy module',
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className={style.section}>
            <div className={style.intro}>
                <h2 className={style.heading}>
                    Four questions. That&apos;s the whole thing.
                </h2>
                <p className={style.subhead}>
                    Roughly forty seconds, start to finish.
                </p>
            </div>

            <ol className={style.steps}>
                {STEPS.map((step, i) => (
                    <li key={step} className={style.sample}>
                        <span className={style.stepNumber}>{i + 1}</span>
                        <span className={style.stepText}>{step}</span>
                    </li>
                ))}
            </ol>

            <div className={style.samples}>
                <div className={style.sample}>
                    <span className={style.sampleLabel}>Multiple choice</span>
                    <span className={style.mockStem}>
                        What kind of codebase is it?
                    </span>
                    <div className={style.mockOptions}>
                        {MC_OPTIONS.map((option) => (
                            <span
                                key={option.label}
                                className={cx(
                                    style.mockOption,
                                    option.selected && style.mockOptionSelected
                                )}>
                                {option.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={style.sample}>
                    <span className={style.sampleLabel}>
                        One free-text line
                    </span>
                    <span className={style.mockStem}>
                        What&apos;s it about?
                    </span>
                    <span className={style.mockInput}>
                        Refactor a 2,000-line React component into hooks
                    </span>
                    <div className={style.mockChips}>
                        {EXAMPLE_CHIPS.map((chip) => (
                            <span key={chip} className={style.mockChip}>
                                {chip}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className={style.section}>
                <div className={style.cta}>
                    <BuildCta />
                </div>
            </div>
        </section>
    );
}
