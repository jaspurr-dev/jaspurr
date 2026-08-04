import {useState} from 'react';
import {Stack, Text} from '@/primitives';
import {IconButton} from '@components/buttons/IconButton';
import {Icon} from '@components/icons/Icon';
import {
    fromOtherAnswer,
    toOtherAnswer,
    type OtherChoice,
} from '@/core/scaffold/types';
import {ChoiceButton} from './ChoiceButton';
import {StepHeader} from './StepHeader';
import style from './QuestionScreen.module.css';

interface Option {
    readonly id: string;
    readonly label: string;
}

interface QuestionScreenProps {
    stem: string;
    options: readonly Option[];
    /* When set, a trailing choice opens a free-text field and answers with the
    encoded text rather than an option id. */
    other?: OtherChoice | undefined;
    questionNumber: number;
    total?: number;
    selectedId: string | null;
    onSelect: (answer: string) => void;
    onBack: () => void;
}

/* One multiple-choice step of the flow: back control, progress, the question
stem, and the tappable answers. A tap calls onSelect, which auto-advances --
including the "Other" field, which advances on its own submit. */
export function QuestionScreen({
    stem,
    options,
    other,
    questionNumber,
    total = 4,
    selectedId,
    onSelect,
    onBack,
}: QuestionScreenProps) {
    // The recorded answer, when it is an "Other" one: re-entering the step
    // lands the user back on their own words rather than an empty field.
    const answered = selectedId === null ? null : fromOtherAnswer(selectedId);
    // Non-null once the field is open: what is being typed this visit.
    const [draft, setDraft] = useState<string | null>(answered);
    const text = draft ?? answered;
    const canSubmit = text !== null && text.trim().length > 0;

    const submitOther = () => {
        if (canSubmit) onSelect(toOtherAnswer(text.trim()));
    };

    return (
        <Stack gap="4" className={style.screen}>
            <div className={style.top}>
                <IconButton icon="back" label="Back" onClick={onBack} />
                <StepHeader current={questionNumber} total={total} />
            </div>
            <Text as="h2" className={style.stem}>
                {stem}
            </Text>
            <Stack gap="2">
                {options.map((option) => (
                    <ChoiceButton
                        key={option.id}
                        label={option.label}
                        selected={option.id === selectedId}
                        onClick={() => {
                            onSelect(option.id);
                        }}
                    />
                ))}
                {other && (
                    <ChoiceButton
                        label={other.label}
                        selected={answered !== null}
                        onClick={() => {
                            setDraft(text ?? '');
                        }}
                    />
                )}
            </Stack>
            {other && text !== null && (
                <div className={style.other}>
                    <input
                        className={style.input}
                        type="text"
                        value={text}
                        aria-label={other.label}
                        placeholder={other.placeholder}
                        autoFocus
                        autoComplete="off"
                        autoCorrect="off"
                        data-1p-ignore
                        data-lpignore="true"
                        onChange={(event) => {
                            setDraft(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') submitOther();
                        }}
                    />
                    <button
                        type="button"
                        className={style.confirm}
                        aria-label="Use this answer"
                        disabled={!canSubmit}
                        onClick={submitOther}>
                        <Icon name="check" />
                    </button>
                </div>
            )}
        </Stack>
    );
}
