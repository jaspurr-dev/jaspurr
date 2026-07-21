import type {ReactNode} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';
import {
    answersAtom,
    assembledAtom,
    currentQuestionAtom,
    flowAtom,
    positionAtom,
    roleIdAtom,
    selectionAtom,
    stepAtom,
} from '@/state/flow';
import {saveTemplateAtom} from '@/state/library';
import {RoleGrid} from '@components/role/RoleGrid';
import {QuestionScreen} from '@components/flow/QuestionScreen';
import {TextScreen} from '@components/flow/TextScreen';
import {ResultScreen} from '@components/flow/ResultScreen';
import {Text} from '@/primitives';
import style from './Build.module.css';

/* The tool flow: pick a role, walk that role's own questions, then the result.
Each role supplies its own question list, so the middle steps are driven by the
current question's kind rather than a fixed sequence. */
export function RouteBuild() {
    const step = useAtomValue(stepAtom);
    const roleId = useAtomValue(roleIdAtom);
    const question = useAtomValue(currentQuestionAtom);
    const position = useAtomValue(positionAtom);
    const answers = useAtomValue(answersAtom);
    const assembled = useAtomValue(assembledAtom);
    const selection = useAtomValue(selectionAtom);
    const dispatch = useSetAtom(flowAtom);
    const save = useSetAtom(saveTemplateAtom);

    const content = ((): ReactNode => {
        switch (step) {
            case 'role':
                return (
                    <div className={style.roleStep}>
                        <Text as="h1" className={style.title}>
                            Pick your role
                        </Text>
                        <RoleGrid
                            selectedId={roleId}
                            onSelect={(picked) => {
                                dispatch({type: 'pickRole', roleId: picked});
                            }}
                        />
                    </div>
                );
            case 'question': {
                if (!question) return null;
                if (question.kind === 'select') {
                    return (
                        <QuestionScreen
                            stem={question.prompt}
                            options={question.options}
                            questionNumber={position.number}
                            total={position.total}
                            selectedId={answers[question.id] ?? null}
                            onSelect={(value) => {
                                dispatch({type: 'answer', value});
                            }}
                            onBack={() => {
                                dispatch({type: 'back'});
                            }}
                        />
                    );
                }
                const isLast = position.number === position.total;
                return (
                    <TextScreen
                        stem={question.prompt}
                        placeholder={question.placeholder}
                        examples={question.examples}
                        value={answers[question.id] ?? ''}
                        questionNumber={position.number}
                        total={position.total}
                        submitLabel={isLast ? 'Build my template' : 'Next'}
                        onChange={(value) => {
                            dispatch({type: 'setText', value});
                        }}
                        onSubmit={() => {
                            dispatch({type: 'next'});
                        }}
                        onBack={() => {
                            dispatch({type: 'back'});
                        }}
                    />
                );
            }
            case 'result':
                if (!assembled || !selection) return null;
                return (
                    <ResultScreen
                        sections={assembled.sections}
                        chips={assembled.chips}
                        onSave={() => {
                            save(selection);
                        }}
                        onChangeAnswers={() => {
                            dispatch({type: 'changeAnswers'});
                        }}
                    />
                );
        }
    })();

    return <div className={style.build}>{content}</div>;
}
