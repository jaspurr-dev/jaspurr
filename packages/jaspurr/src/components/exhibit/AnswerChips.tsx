import style from './AnswerChips.module.css';

interface AnswerChipsProps {
    chips: readonly string[];
}

/* Read-only summary of the chosen answers shown under the exhibit on the flow
result. Non-interactive -- these describe the template, they don't change it. */
export function AnswerChips({chips}: AnswerChipsProps) {
    return (
        <ul className={style.chips}>
            {chips.map((chip, i) => (
                <li key={i} className={style.chip}>
                    {chip}
                </li>
            ))}
        </ul>
    );
}
