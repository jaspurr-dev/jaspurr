import type {KeyboardEvent} from 'react';
import {Stack, Text} from '@/primitives';
import {IconButton} from '@components/buttons/IconButton';
import {Chip} from '@components/buttons/Chip';
import {Icon} from '@components/icons/Icon';
import {StepHeader} from './StepHeader';
import style from './TopicScreen.module.css';

interface TopicScreenProps {
    examples: readonly string[];
    topic: string;
    questionNumber: number;
    total?: number;
    onTopic: (topic: string) => void;
    onSubmit: () => void;
    onBack: () => void;
}

/* The final, free-text step: one line about the task. Example chips make it
completable without a keyboard, and it's last by design so a blank box is never
the first thing on screen. */
export function TopicScreen({
    examples,
    topic,
    questionNumber,
    total = 4,
    onTopic,
    onSubmit,
    onBack,
}: TopicScreenProps) {
    const canSubmit = topic.trim().length > 0;

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && canSubmit) {
            onSubmit();
        }
    };

    return (
        <Stack gap="4" className={style.screen}>
            <div className={style.top}>
                <IconButton icon="back" label="Back" onClick={onBack} />
                <StepHeader current={questionNumber} total={total} />
            </div>
            <Stack gap="1">
                <Text as="h2" className={style.stem}>
                    What&apos;s it about?
                </Text>
                <Text className={style.hint}>One line is plenty.</Text>
            </Stack>
            <input
                className={style.input}
                type="text"
                value={topic}
                aria-label="What it's about"
                placeholder="Type it, or tap an example"
                onChange={(event) => {
                    onTopic(event.target.value);
                }}
                onKeyDown={onKeyDown}
            />
            <div className={style.chips}>
                {examples.map((example) => (
                    <Chip
                        key={example}
                        type="button"
                        onClick={() => {
                            onTopic(example);
                        }}>
                        {example}
                    </Chip>
                ))}
            </div>
            <div className={style.actions}>
                <button
                    type="button"
                    className={style.build}
                    disabled={!canSubmit}
                    onClick={onSubmit}>
                    <Icon name="check" />
                    Build my template
                </button>
            </div>
        </Stack>
    );
}
