import type {Story} from '@/sandbox/types';
import {TextScreen} from './TextScreen';
import {Stack} from '@/primitives';

const noop = () => undefined;

export const story: Story = {
    name: 'TextScreen',
    layer: 'components',
    render: () => (
        <Stack gap="4">
            <TextScreen
                stem="Whose design style are you aiming for?"
                placeholder="e.g. a product whose design you admire"
                examples={['Foobar', 'Barfoo', 'Foobarfoo']}
                value="Foobar"
                questionNumber={1}
                total={3}
                submitLabel="Next"
                onChange={noop}
                onSubmit={noop}
                onBack={noop}
            />
            {/* The multi-line variant: a taller box for an answer that runs on. */}
            <TextScreen
                stem="What are you trying to do?"
                placeholder="e.g. Roll a 2GB log file up by hour"
                multiline
                value={
                    'Roll a 2GB log file up by hour.\n' +
                    'It has to stream -- the file will not fit in memory.'
                }
                questionNumber={1}
                total={2}
                submitLabel="Next"
                onChange={noop}
                onSubmit={noop}
                onBack={noop}
            />
        </Stack>
    ),
};
