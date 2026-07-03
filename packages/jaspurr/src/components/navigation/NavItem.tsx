import type {AnchorHTMLAttributes, ReactNode} from 'react';
import {Icon, type IconName} from '@/components/icons/Icon';

interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    icon: IconName;
    children: ReactNode;
}

export function NavItem({icon, children, ...rest}: NavItemProps) {
    return (
        <a {...rest} className="nav">
            <Icon name={icon} />
            {children}
        </a>
    );
}
