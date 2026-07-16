import type {ButtonHTMLAttributes} from 'react';
import {Icon, type IconName} from '@components/icons/Icon';
import {RoleId, type Role} from '@/core/scaffold/types';
import {cx} from '@/util/cx';
import style from './RoleCard.module.css';

/* Each role's card glyph. Four roles reuse existing icons; the rest were added
to Icon PATHS in this PR. */
const ROLE_ICON: Record<RoleId, IconName> = {
    [RoleId.SoftwareEngineer]: 'code',
    [RoleId.TechnicalPm]: 'target',
    [RoleId.ProductDesigner]: 'brush',
    [RoleId.DataAnalyst]: 'chartBar',
    [RoleId.DevopsSre]: 'server',
    [RoleId.QaEngineer]: 'listCheck',
    [RoleId.SecurityEngineer]: 'shield',
    [RoleId.EngManager]: 'users',
};

interface RoleCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    role: Role;
    selected?: boolean;
}

/* A role choice in the flow's first step: icon, name, one-liner. One tap
advances; the accent selected state marks the current pick when reviewing. */
export function RoleCard({
    role,
    selected = false,
    className,
    ...rest
}: RoleCardProps) {
    return (
        <button
            type="button"
            className={cx(style.card, className)}
            aria-pressed={selected}
            {...rest}>
            <span className={style.iconTile}>
                <Icon name={ROLE_ICON[role.id]} size={20} />
            </span>
            <span className={style.name}>{role.label}</span>
            <span className={style.line}>{role.line}</span>
        </button>
    );
}
