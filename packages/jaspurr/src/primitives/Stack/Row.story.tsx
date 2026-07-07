import type {Story} from '@/sandbox/types';
import {Row} from './Stack';
import {Text} from '@/primitives/Text/Text';

export const story: Story = {
    name: 'Row',
    layer: 'primitive',
    render: () => (
        <Row>
            <Text as="h2" size="base">
                Foo
            </Text>
            <Text as="h2" size="base">
                Bar
            </Text>
            <Text as="h2" size="base">
                World!
            </Text>
        </Row>
    ),
};
