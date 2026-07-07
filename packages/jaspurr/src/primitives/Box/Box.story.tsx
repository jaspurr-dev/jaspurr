import type {Story} from '@/sandbox/types';
import {Box} from './Box';
import {Text} from '../Text/Text';

export const story: Story = {
    name: 'Box',
    layer: 'primitive',
    render: () => (
        <Box as="main">
            <Text>This is some placeholder Box text</Text>
        </Box>
    ),
};
