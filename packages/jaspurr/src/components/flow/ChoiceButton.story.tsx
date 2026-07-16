import type {Story} from '@/sandbox/types';
import {ChoiceButton} from './ChoiceButton';
import {Stack} from '@/primitives';

export const story: Story = {
    name: 'ChoiceButton',
    layer: 'components',
    render: () => (
        <Stack gap="2" style={{width: 360}}>
            <ChoiceButton
                label="Write new code"
                description="Establish patterns worth copying."
            />
            <ChoiceButton
                label="Refactor existing code"
                description="Behaviour must not change."
                selected
            />
            <ChoiceButton
                label="Debug a problem"
                description="Form a hypothesis first."
            />
        </Stack>
    ),
};
