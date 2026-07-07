import type {Story} from '@/sandbox/types';
import {Text} from './Text';
import {Stack} from '@primitives/Stack/Stack';

export const story: Story = {
    name: 'Text',
    layer: 'primitive',
    render: () => (
        <Stack>
            <Text as="p" size="base">
                Foo
            </Text>
            <Text as="h1" size="base">
                Bar
            </Text>
            <Text as="h3" size="base">
                World!
            </Text>
        </Stack>
    ),
};
