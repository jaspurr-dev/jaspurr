import type {Story} from '@/sandbox/types';
import {ProgressDots} from './ProgressDots';
import {Stack} from '@/primitives';

export const story: Story = {
    name: 'ProgressDots',
    layer: 'components',
    render: () => (
        <Stack gap="3">
            <ProgressDots current={1} />
            <ProgressDots current={2} />
            <ProgressDots current={4} />
        </Stack>
    ),
};
