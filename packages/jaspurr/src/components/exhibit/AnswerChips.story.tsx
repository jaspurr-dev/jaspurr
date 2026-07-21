import type {Story} from '@/sandbox/types';
import {AnswerChips} from './AnswerChips';
import {assembleTemplate, type Selection} from '@/core/scaffold/assemble';
import {RoleId} from '@/core/scaffold/types';

const softwareExample: Selection = {
    roleId: RoleId.VisualDesigner,
    answers: {company: 'ABC foobar', context: 'existing', task: 'refresh'},
};

const template = assembleTemplate(softwareExample);

export const story: Story = {
    name: 'AnswerChips',
    layer: 'components',
    render: () => <AnswerChips chips={template.chips} />,
};
