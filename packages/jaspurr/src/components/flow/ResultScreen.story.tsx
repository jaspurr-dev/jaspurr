import type {Story} from '@/sandbox/types';
import {ResultScreen} from './ResultScreen';
import {assembleTemplate, type Selection} from '@/core/scaffold/assemble';
import {RoleId} from '@/core/scaffold/types';

const example: Selection = {
    roleId: RoleId.VisualDesigner,
    answers: {company: 'Linear', context: 'existing', task: 'refresh'},
};

const template = assembleTemplate(example);
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
