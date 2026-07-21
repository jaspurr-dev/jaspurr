import type {Story} from '@/sandbox/types';
import {LibraryView} from './LibraryView';
import type {SavedTemplate} from '@/state/library';
import {RoleId} from '@/core/scaffold/types';

const noop = () => undefined;

const samples: readonly SavedTemplate[] = [
    {
        id: '1',
        selection: {
            roleId: RoleId.VisualDesigner,
            answers: {company: 'Linear', context: 'existing', task: 'refresh'},
        },
    },
    {
        id: '2',
        selection: {
            roleId: RoleId.VisualDesigner,
            answers: {company: 'Airbnb', context: 'new', task: 'screen'},
        },
    },
    {
        id: '3',
        selection: {
            roleId: RoleId.VisualDesigner,
            answers: {company: 'Stripe', context: 'existing', task: 'explore'},
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
