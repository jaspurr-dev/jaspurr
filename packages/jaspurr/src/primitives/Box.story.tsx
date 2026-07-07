import type {Story} from '@/sandbox/types';
import {Box} from './Box';

export const story: Story = {
    name: 'Box',
    layer: 'component',
    render: () => (
        <Box>
            <h2>This is some placeholder Box text</h2>
        </Box>
    ),
};
