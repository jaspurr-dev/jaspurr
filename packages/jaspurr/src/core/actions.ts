import {Output} from '@/core/template';

export type CompositionAction =
    | {type: 'deleteStep'; index: number}
    | {type: 'setOutput'; format: Output};
