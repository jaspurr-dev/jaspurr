import {useEffect, useState} from 'react';
import {toText, type Assembled} from '@/core/scaffold/assemble';
import {Stack} from '@/primitives';
import {TemplateExhibit} from '@components/exhibit/TemplateExhibit';
import {AnswerChips} from '@components/exhibit/AnswerChips';
import {cx} from '@/util/cx';
import style from './ResultScreen.module.css';

interface ResultScreenProps {
    sections: Assembled;
    chips: readonly string[];
    onSave: () => void;
    onChangeAnswers: () => void;
}

/* A boolean that flips back off on its own, for the "Copied!"/"Saved" labels
that should confirm the action and then quietly clear. */
function useTransientFlag(duration: number): readonly [boolean, () => void] {
    const [on, setOn] = useState(false);
    useEffect(() => {
        if (!on) return;
        const timer = setTimeout(() => {
            setOn(false);
        }, duration);
        return () => {
            clearTimeout(timer);
        };
    }, [on, duration]);
    return [
        on,
        () => {
            setOn(true);
        },
    ];
}

/* The end of the flow: the assembled template, a summary of the answers behind
it, and the three things to do with it -- copy it out, save it to the library,
or step back into the flow to change an answer. */
export function ResultScreen({
    sections,
    chips,
    onSave,
    onChangeAnswers,
}: ResultScreenProps) {
    const [copied, flagCopied] = useTransientFlag(1500);
    const [saved, flagSaved] = useTransientFlag(1500);

    const onCopy = () => {
        // Ignore a rejected clipboard write (denied permission); the button
        // simply won't show "Copied!" rather than throwing.
        void navigator.clipboard
            .writeText(toText(sections))
            .then(flagCopied, () => undefined);
    };

    const onSaveClick = () => {
        onSave();
        flagSaved();
    };

    return (
        <Stack gap="4" className={style.screen}>
            <TemplateExhibit sections={sections} />
            <AnswerChips chips={chips} />
            <div className={style.actions}>
                <button
                    type="button"
                    className={cx(style.action, style.primary)}
                    onClick={onCopy}>
                    {copied ? 'Copied!' : 'Copy template'}
                </button>
                <button
                    type="button"
                    className={cx(style.action, style.secondary)}
                    onClick={onSaveClick}>
                    {saved ? 'Saved' : 'Save'}
                </button>
                <button
                    type="button"
                    className={cx(style.action, style.secondary)}
                    onClick={onChangeAnswers}>
                    Change my answers
                </button>
            </div>
        </Stack>
    );
}
