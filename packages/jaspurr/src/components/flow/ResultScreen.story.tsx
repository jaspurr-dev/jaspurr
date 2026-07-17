import type {Story} from '@/sandbox/types';
import {ResultScreen} from './ResultScreen';
import {assembleTemplate, type Selection} from '@/core/scaffold/assemble';
import {RoleId} from '@/core/scaffold/types';

const softwareExample: Selection = {
    roleId: RoleId.SoftwareEngineer,
    taskId: 'refactor',
    environmentId: 'mature',
    outputId: 'output-only',
    topic: 'Refactor a 2,000-line React component into hooks',
};

const template = assembleTemplate(softwareExample);
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
