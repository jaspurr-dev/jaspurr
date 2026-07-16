import type {Story} from '@/sandbox/types';
import {AnswerChips} from './AnswerChips';
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

export const story: Story = {
    name: 'AnswerChips',
    layer: 'components',
    render: () => <AnswerChips chips={template.chips} />,
};
