import type {IconName} from '@components/icons/Icon';
import {RoleId} from '@/core/scaffold/types';

/* Each role's glyph, reusing icons already in Icon PATHS. Shared by the role
cards and the library list so the two stay in lockstep. */
export const ROLE_ICON: Record<RoleId, IconName> = {
    [RoleId.VisualDesigner]: 'brush',
    [RoleId.FrontendEngineer]: 'code',
    [RoleId.SoftwareEngineer]: 'braces',
    [RoleId.GameDesigner]: 'play',
    [RoleId.PmBusiness]: 'target',
};
