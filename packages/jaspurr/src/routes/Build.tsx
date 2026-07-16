import type {ReactNode} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';
import {draftAtom, flowAtom, stepAtom} from '@/state/flow';
import {getRole} from '@/core/scaffold/roles';
import {ENVIRONMENT_QUESTION} from '@/core/scaffold/questions';
import {RoleGrid} from '@components/role/RoleGrid';
import {QuestionScreen} from '@components/flow/QuestionScreen';
import {Text} from '@/primitives';
import style from './Build.module.css';

/* The tool flow. Steps 1-3 (role, then the first two questions) are wired here;
the later steps land in a follow-up. */
export function RouteBuild() {
    const step = useAtomValue(stepAtom);
    const draft = useAtomValue(draftAtom);
    const dispatch = useSetAtom(flowAtom);

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
                const role = draft.roleId ? getRole(draft.roleId) : undefined;
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
            case 'topic':
            case 'result':
                return (
                    <Text className={style.placeholder}>
                        The rest of the flow is coming soon.
                    </Text>
                );
        }
    })();

    return <div className={style.build}>{content}</div>;
}
