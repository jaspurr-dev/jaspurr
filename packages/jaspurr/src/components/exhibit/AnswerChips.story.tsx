import type {Story} from '@/sandbox/types';
import {AnswerChips} from './AnswerChips';
import {assembleTemplate} from '@/core/scaffold/assemble';
import {EXAMPLE_SELECTION} from '@/core/scaffold/roles';

const template = assembleTemplate(EXAMPLE_SELECTION);

export const story: Story = {
    name: 'AnswerChips',
    layer: 'components',
    render: () => <AnswerChips chips={template.chips} />,
};
