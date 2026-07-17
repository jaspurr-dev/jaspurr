import type {Story} from '@/sandbox/types';
import {LibraryView} from './LibraryView';
import type {SavedTemplate} from '@/state/library';
import {RoleId} from '@/core/scaffold/types';

const noop = () => undefined;

const samples: readonly SavedTemplate[] = [
    {
        id: '1',
        selection: {
            roleId: RoleId.SoftwareEngineer,
            taskId: 'refactor',
            environmentId: 'mature',
            outputId: 'output-only',
            topic: 'Refactor a 2,000-line React component into hooks',
        },
    },
    {
        id: '2',
        selection: {
            roleId: RoleId.TechnicalPm,
            taskId: 'scope',
            environmentId: 'legacy',
            outputId: 'plan-first',
            topic: 'Cut the checkout redesign to a shippable first slice',
        },
    },
    {
        id: '3',
        selection: {
            roleId: RoleId.DataAnalyst,
            taskId: 'explore',
            environmentId: 'unsure',
            outputId: 'output-plus-reasoning',
            topic: 'Find why weekly active users dipped in March',
        },
    },
];

export const story: Story = {
    name: 'LibraryView',
    layer: 'components',
    render: () => (
        <>
            <LibraryView items={samples} onDelete={noop} />
            <LibraryView items={[]} onDelete={noop} />
        </>
    ),
};
