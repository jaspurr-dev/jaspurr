import type {Story} from '@/sandbox/types';
import {QuestionScreen} from './QuestionScreen';
import {toOtherAnswer} from '@/core/scaffold/types';
import {Stack} from '@/primitives';

const noop = () => undefined;
const options = [
    {id: 'screen', label: 'Design a new screen'},
    {id: 'refresh', label: 'Refresh an existing UI'},
    {id: 'explore', label: 'Explore a direction'},
];

const languages = [
    {id: 'typescript', label: 'TypeScript'},
    {id: 'python', label: 'Python'},
];

export const story: Story = {
    name: 'QuestionScreen',
    layer: 'components',
    render: () => (
        <Stack gap="4">
            <QuestionScreen
                stem="What do you need?"
                options={options}
                questionNumber={3}
                total={3}
                selectedId="refresh"
                onSelect={noop}
                onBack={noop}
            />
            {/* The Other field, open on an answer the user typed themselves. */}
            <QuestionScreen
                stem="What language are you using?"
                options={languages}
                other={{label: 'Other', placeholder: 'e.g. Go, Swift, Elixir'}}
                questionNumber={2}
                total={2}
                selectedId={toOtherAnswer('Go')}
                onSelect={noop}
                onBack={noop}
            />
        </Stack>
    ),
};
