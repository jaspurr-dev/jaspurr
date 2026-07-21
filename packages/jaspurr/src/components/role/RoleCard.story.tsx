import type {Story} from '@/sandbox/types';
import {RoleCard} from './RoleCard';
import {ROLES} from '@/core/scaffold/roles';
import {RoleId} from '@/core/scaffold/types';
import {Row} from '@/primitives';

export const story: Story = {
    name: 'RoleCard',
    layer: 'components',
    render: () => (
        <Row gap="3" align="stretch" style={{maxWidth: 520}}>
            <RoleCard role={ROLES[RoleId.VisualDesigner]} />
            <RoleCard role={ROLES[RoleId.FrontendEngineer]} selected />
            <RoleCard role={ROLES[RoleId.GameDesigner]} selected />
        </Row>
    ),
};
