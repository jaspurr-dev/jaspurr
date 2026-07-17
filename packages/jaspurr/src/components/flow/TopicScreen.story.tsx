import type {Story} from '@/sandbox/types';
import {TopicScreen} from './TopicScreen';
import {ROLES} from '@/core/scaffold/roles';
import {RoleId} from '@/core/scaffold/types';

const noop = () => undefined;

export const story: Story = {
    name: 'TopicScreen',
    layer: 'components',
    render: () => (
        <TopicScreen
            examples={ROLES[RoleId.SoftwareEngineer].examples}
            topic="Refactor a 2,000-line React component into hooks"
            questionNumber={4}
            onTopic={noop}
            onSubmit={noop}
            onBack={noop}
        />
    ),
};
