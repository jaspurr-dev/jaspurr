import type {Story} from '@/sandbox/types';
import {Card} from './Card';
import {Text, TextTitle} from '@/primitives';

export const story: Story = {
    name: 'Card',
    layer: 'components',
    render: () => (
        <Card>
            <TextTitle>Card</TextTitle>
            <Text>This is some placeholder Card content.</Text>
        </Card>
    ),
};
