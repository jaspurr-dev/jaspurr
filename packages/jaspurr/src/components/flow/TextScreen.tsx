import type {KeyboardEvent} from 'react';
import {Stack, Text} from '@/primitives';
import {IconButton} from '@components/buttons/IconButton';
import {Chip} from '@components/buttons/Chip';
import {Icon} from '@components/icons/Icon';
import {StepHeader} from './StepHeader';
import style from './TextScreen.module.css';

interface TextScreenProps {
    stem: string;
    hint?: string | undefined;
    placeholder?: string | undefined;
    examples?: readonly string[] | undefined;
    value: string;
    questionNumber: number;
    total: number;
    submitLabel: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onBack: () => void;
}

/* A free-text step: one line the user types, with optional starter chips so it
is completable without a keyboard. Reused for any text question in the flow. */
export function TextScreen({
    stem,
    hint = 'One line is plenty.',
    placeholder = 'Type it, or tap an example',
    examples = [],
    value,
    questionNumber,
    total,
    submitLabel,
    onChange,
    onSubmit,
    onBack,
}: TextScreenProps) {
    const canSubmit = value.trim().length > 0;

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
                    {stem}
                </Text>
                <Text className={style.hint}>{hint}</Text>
            </Stack>
            <input
                className={style.input}
                type="text"
                value={value}
                aria-label={stem}
                placeholder={placeholder}
                onChange={(event) => {
                    onChange(event.target.value);
                }}
                onKeyDown={onKeyDown}
            />
            {examples.length > 0 && (
                <div className={style.chips}>
                    {examples.map((example) => (
                        <Chip
                            key={example}
                            type="button"
                            onClick={() => {
                                onChange(example);
                            }}>
                            {example}
                        </Chip>
                    ))}
                </div>
            )}
            <div className={style.actions}>
                <button
                    type="button"
                    className={style.build}
                    disabled={!canSubmit}
                    onClick={onSubmit}>
                    <Icon name="check" />
                    {submitLabel}
                </button>
            </div>
        </Stack>
    );
}
