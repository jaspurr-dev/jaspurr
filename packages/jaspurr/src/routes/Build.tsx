import type {ReactNode} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';
import {
    assembledAtom,
    draftAtom,
    flowAtom,
    selectionAtom,
    stepAtom,
} from '@/state/flow';
import {saveTemplateAtom} from '@/state/library';
import {getRole} from '@/core/scaffold/roles';
import {ENVIRONMENT_QUESTION, OUTPUT_QUESTION} from '@/core/scaffold/questions';
import {RoleGrid} from '@components/role/RoleGrid';
import {QuestionScreen} from '@components/flow/QuestionScreen';
import {TopicScreen} from '@/components/flow/TopicScreen';
import {ResultScreen} from '@/components/flow/ResultScreen';
import {Text} from '@/primitives';
import style from './Build.module.css';

/* The tool flow to the final assembled result. */
export function RouteBuild() {
    const step = useAtomValue(stepAtom);
    const draft = useAtomValue(draftAtom);
    const dispatch = useSetAtom(flowAtom);
    const assembled = useAtomValue(assembledAtom);
    const selection = useAtomValue(selectionAtom);
    const save = useSetAtom(saveTemplateAtom);

    const role = draft.roleId ? getRole(draft.roleId) : undefined;

    const content = ((): ReactNode => {
        switch (step) {
            case 'role':
                return (
                    <div className={style.roleStep}>
                        <Text as="h1" className={style.title}>
                            Pick your role
                        </Text>
                        <RoleGrid
                            selectedId={draft.roleId}
                            onSelect={(roleId) => {
                                dispatch({type: 'pickRole', roleId});
                            }}
                        />
                    </div>
                );
            case 'task': {
                if (!role) return null;
                return (
                    <QuestionScreen
                        stem={role.question.stem}
                        options={role.question.options}
                        questionNumber={1}
                        selectedId={draft.taskId}
                        onSelect={(taskId) => {
                            dispatch({type: 'pickTask', taskId});
                        }}
                        onBack={() => {
                            dispatch({type: 'back'});
                        }}
                    />
                );
            }
            case 'environment':
                return (
                    <QuestionScreen
                        stem={ENVIRONMENT_QUESTION.stem}
                        options={ENVIRONMENT_QUESTION.options}
                        questionNumber={2}
                        selectedId={draft.environmentId}
                        onSelect={(environmentId) => {
                            dispatch({type: 'pickEnvironment', environmentId});
                        }}
                        onBack={() => {
                            dispatch({type: 'back'});
                        }}
                    />
                );
            case 'output':
                return (
                    <QuestionScreen
                        stem={OUTPUT_QUESTION.stem}
                        options={OUTPUT_QUESTION.options}
                        questionNumber={3}
                        selectedId={draft.outputId}
                        onSelect={(outputId) => {
                            dispatch({type: 'pickOutput', outputId});
                        }}
                        onBack={() => {
                            dispatch({type: 'back'});
                        }}
                    />
                );
            case 'topic':
                if (!role) return null;
                return (
                    <TopicScreen
                        examples={role.examples}
                        topic={draft.topic}
                        questionNumber={4}
                        onTopic={(topic) => {
                            dispatch({type: 'setTopic', topic});
                        }}
                        onSubmit={() => {
                            dispatch({type: 'finish'});
                        }}
                        onBack={() => {
                            dispatch({type: 'back'});
                        }}
                    />
                );
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
