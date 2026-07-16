import type {ButtonHTMLAttributes} from 'react';
import {cx} from '@/util/cx';
import style from './ChoiceButton.module.css';

interface ChoiceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    description?: string;
    selected?: boolean;
}

/* A large multiple-choice answer. In the flow a tap auto-advances, but the
selected state still drives the accent highlight when reviewing answers. */
export function ChoiceButton({
    label,
    description,
    selected = false,
    className,
    ...rest
}: ChoiceButtonProps) {
    return (
        <button
            type="button"
            className={cx(style.choice, className)}
            aria-pressed={selected}
            {...rest}>
            <span className={style.label}>{label}</span>
            {description && (
                <span className={style.description}>{description}</span>
            )}
        </button>
    );
}
