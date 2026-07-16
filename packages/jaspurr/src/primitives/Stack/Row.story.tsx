import type {Story} from '@/sandbox/types';
import {Row} from './Stack';
import {Text} from '@/primitives/Text/Text';

export const story: Story = {
    name: 'Row',
    layer: 'primitive',
    render: () => (
        <Row>
            <Text as="h2">Foo</Text>
            <Text as="h2">Bar</Text>
            <Text as="h2">World!</Text>
        </Row>
    ),
};
