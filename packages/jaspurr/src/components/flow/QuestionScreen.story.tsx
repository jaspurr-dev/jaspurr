import type {Story} from '@/sandbox/types';
import {QuestionScreen} from './QuestionScreen';

const noop = () => undefined;
const options = [
    {id: 'screen', label: 'Design a new screen'},
    {id: 'refresh', label: 'Refresh an existing UI'},
    {id: 'explore', label: 'Explore a direction'},
];

export const story: Story = {
    name: 'QuestionScreen',
    layer: 'components',
    render: () => (
        <QuestionScreen
            stem="What do you need?"
            options={options}
            questionNumber={3}
            total={3}
            selectedId="refresh"
            onSelect={noop}
            onBack={noop}
        />
    ),
};
