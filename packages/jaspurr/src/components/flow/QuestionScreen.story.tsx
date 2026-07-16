import type {Story} from '@/sandbox/types';
import {QuestionScreen} from './QuestionScreen';
import {ROLES} from '@/core/scaffold/roles';
import {RoleId} from '@/core/scaffold/types';

const noop = () => undefined;
const question = ROLES[RoleId.SoftwareEngineer].question;

export const story: Story = {
    name: 'QuestionScreen',
    layer: 'components',
    render: () => (
        <QuestionScreen
            stem={question.stem}
            options={question.options}
            questionNumber={1}
            selectedId="refactor"
            onSelect={noop}
            onBack={noop}
        />
    ),
};
