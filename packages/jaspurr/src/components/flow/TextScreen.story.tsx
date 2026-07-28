import type {Story} from '@/sandbox/types';
import {TextScreen} from './TextScreen';

const noop = () => undefined;

export const story: Story = {
    name: 'TextScreen',
    layer: 'components',
    render: () => (
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
    ),
};
