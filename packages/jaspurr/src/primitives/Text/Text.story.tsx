import type {Story} from '@/sandbox/types';
import {Text, TextTitle} from './Text';
import {Stack} from '@primitives/Stack/Stack';
import {OutlineBox} from '../Box/Box';

export const story: Story = {
    name: 'Text',
    layer: 'primitive',
    render: () => (
        <Stack>
            <TextTitle>Text</TextTitle>
            <Text>Renders the various supported text variants.</Text>
            <OutlineBox>
                <TextTitle>text-title · Title</TextTitle>
                <Text>text · default text</Text>
            </OutlineBox>
        </Stack>
    ),
};
