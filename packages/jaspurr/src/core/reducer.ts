import type {CompositionAction} from './actions';
import type {Composition} from './template';

export function compositionReducer(
    comp: Composition,
    action: CompositionAction
): Composition {
    switch (action.type) {
        case 'deleteStep':
            return {
                ...comp,
                steps: comp.steps.filter((_, i) => i !== action.index),
            };
        case 'setOutput':
            return {...comp, output: action.format};
        default:
            throw new Error(`Unhandled case: ${JSON.stringify(action)}`);
    }
}
