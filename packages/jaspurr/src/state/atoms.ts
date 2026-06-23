import {atom} from 'jotai';
import {atomWithReducer} from 'jotai/utils';
import {compositionReducer} from '@/core/reducer';
import {defaultComposition} from '@/core/templates';
import {serialize} from '@/core/serialize';

export const compositionAtom = atomWithReducer(
    defaultComposition,
    compositionReducer
);

export const outputSelectAtom = atom((get) => get(compositionAtom).output);
export const stepsSelectAtom = atom((get) => get(compositionAtom).steps);
export const previewAtom = atom((get) => serialize(get(compositionAtom)));

export const copyAtom = atom(null, async (get) => {
    const text = get(previewAtom);
    await navigator.clipboard.writeText(text);
    return text;
});
