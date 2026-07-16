import style from './ProgressDots.module.css';

interface ProgressDotsProps {
    current: number;
    total?: number;
}

/* Progress indicator for the flow: dots up to and including the current step
take the accent. Decorative -- the step count is announced by StepHeader. */
export function ProgressDots({current, total = 4}: ProgressDotsProps) {
    return (
        <div className={style.dots} aria-hidden="true">
            {Array.from({length: total}, (_, i) => (
                <span key={i} className={style.dot} data-active={i < current} />
            ))}
        </div>
    );
}
