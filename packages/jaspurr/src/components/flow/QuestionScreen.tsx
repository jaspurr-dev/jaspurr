import {Stack, Text} from '@/primitives';
import {IconButton} from '@components/buttons/IconButton';
import {ChoiceButton} from './ChoiceButton';
import {StepHeader} from './StepHeader';
import style from './QuestionScreen.module.css';

interface Option {
    readonly id: string;
    readonly label: string;
}

interface QuestionScreenProps<O extends Option> {
    stem: string;
    options: readonly O[];
    questionNumber: number;
    total?: number;
    selectedId: O['id'] | null;
    onSelect: (id: O['id']) => void;
    onBack: () => void;
}

/* One multiple-choice step of the flow: back control, progress, the question
stem, and the tappable answers. A tap calls onSelect, which auto-advances. */
export function QuestionScreen<O extends Option>({
    stem,
    options,
    questionNumber,
    total = 4,
    selectedId,
    onSelect,
    onBack,
}: QuestionScreenProps<O>) {
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
            </Stack>
        </Stack>
    );
}
