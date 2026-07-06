import {DesignLayer} from '@/styles/core.styles';
import {Icon, type IconName} from '@/components/icons/Icon';
import type React from 'react';

const DEFAULT_ICON: IconName = 'play';
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: IconName;
    label?: string;
}

export function PrimaryButton({
    icon = DEFAULT_ICON,
    label,
    ...rest
}: PrimaryButtonProps) {
    return (
        <button
            className={`${DesignLayer.classes.button} ${DesignLayer.classes.buttonUse}`}
            {...rest}>
            <Icon name={icon} /> {label}
        </button>
    );
}
