import type {ButtonHTMLAttributes} from 'react';
import {Icon} from '@components/icons/Icon';
import {type Role} from '@/core/scaffold/types';
import {ROLE_ICON} from './roleIcon';
import {cx} from '@/util/cx';
import style from './RoleCard.module.css';

type RoleCardProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> & {
    role: Role;
    selected?: boolean;
};

/* A role choice in the flow's first step: icon, name, one-liner. One tap
advances; the accent selected state marks the current pick when reviewing. */
export function RoleCard({
    role,
    selected = false,
    className,
    ...rest
}: RoleCardProps) {
    const comingSoon = role.status === 'coming-soon';
    return (
        <button
            type="button"
            className={cx(style.card, className)}
            aria-pressed={selected}
            disabled={comingSoon}
            {...rest}>
            <span className={style.iconTile}>
                <Icon name={ROLE_ICON[role.id]} size={20} />
            </span>
            <span className={style.name}>
                {role.label}
                {comingSoon && <span className={style.badge}>Soon</span>}
                {role.badge === 'new' && (
                    <span className={cx(style.badge, style.new)}>New</span>
                )}
            </span>
            <span className={style.line}>{role.line}</span>
        </button>
    );
}
