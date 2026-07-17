import type {IconName} from '@components/icons/Icon';
import {RoleId} from '@/core/scaffold/types';

/* Each role's glyph. Four reuse existing icons; the rest were added to Icon
PATHS alongside the role grid. Shared by the role cards and the library list so
the two stay in lockstep. */
export const ROLE_ICON: Record<RoleId, IconName> = {
    [RoleId.SoftwareEngineer]: 'code',
    [RoleId.TechnicalPm]: 'target',
    [RoleId.ProductDesigner]: 'brush',
    [RoleId.DataAnalyst]: 'chartBar',
    [RoleId.DevopsSre]: 'server',
    [RoleId.QaEngineer]: 'listCheck',
    [RoleId.SecurityEngineer]: 'shield',
    [RoleId.EngManager]: 'users',
};
