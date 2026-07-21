import type {Story} from '@/sandbox/types';
import {LibraryView} from './LibraryView';
import type {SavedTemplate} from '@/state/library';
import {EXAMPLE_SELECTION} from '@/core/scaffold/roles';

const noop = () => undefined;

const samples: readonly SavedTemplate[] = [
    {
        id: '1',
        selection: EXAMPLE_SELECTION,
    },
    {
        id: '2',
        selection: EXAMPLE_SELECTION,
    },
    {
        id: '3',
        selection: EXAMPLE_SELECTION,
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
