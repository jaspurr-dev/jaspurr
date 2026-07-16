import type {Story} from '@/sandbox/types';
import {Stack} from './Stack';
import {Text} from '@primitives/Text/Text';

export const story: Story = {
    name: 'Stack',
    layer: 'primitive',
    render: () => (
        <Stack>
            <Text as="h2">Foo</Text>
            <Text as="h2">Bar</Text>
            <Text as="h2">World!</Text>
        </Stack>
    ),
};
