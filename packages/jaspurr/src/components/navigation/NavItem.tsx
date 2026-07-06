import type {AnchorHTMLAttributes, ReactNode} from 'react';
import {Icon, type IconName} from '@/components/icons/Icon';
import {DesignLayer} from '@/styles/core.styles';

interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    icon: IconName;
    children: ReactNode;
}

export function NavItem({icon, children, ...rest}: NavItemProps) {
    return (
        <a {...rest} className={DesignLayer.classes.navButton}>
            <Icon name={icon} />
            {children}
        </a>
    );
}
