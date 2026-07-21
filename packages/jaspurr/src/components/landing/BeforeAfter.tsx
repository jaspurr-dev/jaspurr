import {useState} from 'react';
import {assembleTemplate} from '@/core/scaffold/assemble';
import {EXAMPLE_SELECTION} from '@/core/scaffold/roles';
import {TemplateExhibit} from '@components/exhibit/TemplateExhibit';
import {SegmentedToggle} from '@components/flow/SegmentedToggle';
import style from './BeforeAfter.module.css';

type View = 'before' | 'after';

const {sections} = assembleTemplate(EXAMPLE_SELECTION);
const WEAK_PROMPT =
    'Redesign our settings page to feel more modern and premium.';

const SEGMENTS: readonly {value: View; label: string}[] = [
    {value: 'before', label: 'Weak prompt'},
    {value: 'after', label: 'With Jaspurr'},
];

/* The centerpiece: the same request as a bare one-liner and as the structured
prompt Jaspurr assembles from it. Side by side on desktop; on mobile a toggle
swaps between them, opening on the Jaspurr version so the payoff shows first. */
export function BeforeAfter() {
    const [view, setView] = useState<View>('after');

    return (
        <section className={style.section}>
            <div className={style.intro}>
                <h2 className={style.heading}>Same request. Better prompt.</h2>
                <p className={style.subhead}>
                    The one line you would type, and what Jaspurr builds around
                    it.
                </p>
            </div>

            <div className={style.mobileToggle}>
                <SegmentedToggle
                    segments={SEGMENTS}
                    value={view}
                    onChange={setView}
                    label="Weak prompt or with Jaspurr"
                />
            </div>

            <div className={style.grid} data-active={view}>
                <div className={style.panel} data-view="before">
                    <span className={style.panelLabel}>Weak prompt</span>
                    <div className={style.weak}>
                        <pre className={style.weakBody}>{WEAK_PROMPT}</pre>
                        <p className={style.weakNote}>
                            No role, no context, no format. The model fills the
                            gaps by guessing.
                        </p>
                    </div>
                </div>
                <div className={style.panel} data-view="after">
                    <span className={style.panelLabel}>With Jaspurr</span>
                    <TemplateExhibit sections={sections} />
                </div>
            </div>
        </section>
    );
}
