import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';
import type {Selection} from '@/core/scaffold/assemble';

export const LIBRARY_STORAGE_KEY = 'jaspurr-library';

/* Saved templates are the user's ANSWERS (Selections), not rendered text, so
wording fixes propagate to already-saved items. localStorage only -- no account,
no server. getOnInit so the saved list is available on the first render. */
export const libraryAtom = atomWithStorage<readonly Selection[]>(
    LIBRARY_STORAGE_KEY,
    [],
    undefined,
    {getOnInit: true}
);

/* Append a selection, skipping an exact duplicate (e.g. a double-tapped Save).
Returns the same array when nothing changes so callers can skip a write. */
export function addTemplate(
    library: readonly Selection[],
    selection: Selection
): readonly Selection[] {
    const exists = library.some(
        (saved) => JSON.stringify(saved) === JSON.stringify(selection)
    );
    return exists ? library : [...library, selection];
}

export const saveTemplateAtom = atom(null, (get, set, selection: Selection) => {
    const library = get(libraryAtom);
    const next = addTemplate(library, selection);
    if (next !== library) {
        set(libraryAtom, next);
    }
});
