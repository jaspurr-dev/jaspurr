import type {Story} from '@/sandbox/types';
import {ResultScreen} from './ResultScreen';
import {assembleTemplate} from '@/core/scaffold/assemble';
import {EXAMPLE_SELECTION} from '@/core/scaffold/roles';

const template = assembleTemplate(EXAMPLE_SELECTION);
const noop = () => undefined;

export const story: Story = {
    name: 'ResultScreen',
    layer: 'components',
    render: () => (
        <ResultScreen
            sections={template.sections}
            chips={template.chips}
            onSave={noop}
            onChangeAnswers={noop}
        />
    ),
};
