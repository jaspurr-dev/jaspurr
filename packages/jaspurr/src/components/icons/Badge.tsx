import {DesignLayer} from '@/styles/core.styles';
import type React from 'react';
import {Icon, type IconProps} from '@/components/icons/Icon';

export function Badge({...rest}: React.ComponentProps<'span'>) {
    return (
        <span className={DesignLayer.classes.badge} role="img" {...rest}></span>
    );
}

export function BadgeIcon({name}: IconProps) {
    // TODO: size, strokeWidth should live in CSS not here.
    return <Icon name={name} size={11} strokeWidth={2}></Icon>;
}
