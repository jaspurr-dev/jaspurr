// components/Chip.tsx — mobile filter
import type {ButtonHTMLAttributes, ReactNode} from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    children: ReactNode;
}

export function Chip({active = false, children, ...rest}: ChipProps) {
    return (
        <button className="btn btn--chip" aria-pressed={active} {...rest}>
            {children}
        </button>
    );
}
