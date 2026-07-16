import type {Story} from '@/sandbox/types';
import {RoleGrid} from './RoleGrid';
import {RoleId} from '@/core/scaffold/types';

export const story: Story = {
    name: 'RoleGrid',
    layer: 'components',
    render: () => <RoleGrid selectedId={RoleId.SoftwareEngineer} />,
};
