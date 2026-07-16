import type {Story} from '@/sandbox/types';
import {SegmentedToggle} from './SegmentedToggle';
import {Stack} from '@/primitives';

const SEGMENTS = [
    {value: 'before', label: 'Weak prompt'},
    {value: 'after', label: 'With Scaffold'},
] as const;

const noop = () => undefined;

export const story: Story = {
    name: 'SegmentedToggle',
    layer: 'components',
    render: () => (
        <Stack gap="3">
            <SegmentedToggle
                segments={SEGMENTS}
                value="before"
                onChange={noop}
                label="Prompt comparison"
            />
            <SegmentedToggle
                segments={SEGMENTS}
                value="after"
                onChange={noop}
                label="Prompt comparison"
            />
        </Stack>
    ),
};
