import type {ReactNode} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';
import {draftAtom, flowAtom, stepAtom} from '@/state/flow';
import {getRole} from '@/core/scaffold/roles';
import {ENVIRONMENT_QUESTION, OUTPUT_QUESTION} from '@/core/scaffold/questions';
import {RoleGrid} from '@components/role/RoleGrid';
import {QuestionScreen} from '@components/flow/QuestionScreen';
import {TopicScreen} from '@/components/flow/TopicScreen';
import {Text} from '@/primitives';
import style from './Build.module.css';

/* The tool flow, role through the free-text line. The result screen is the one
step still to come. */
export function RouteBuild() {
    const step = useAtomValue(stepAtom);
    const draft = useAtomValue(draftAtom);
    const dispatch = useSetAtom(flowAtom);

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
                return (
                    <Text className={style.placeholder}>
                        Template is coming together. Result screen is next.
                    </Text>
                );
        }
    })();

    return <div className={style.build}>{content}</div>;
}
