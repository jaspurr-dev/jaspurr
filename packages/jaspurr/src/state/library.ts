import {atom} from 'jotai';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {assemble, toText, type Selection} from '@/core/scaffold/assemble';
import {getRole} from '@/core/scaffold/roles';
import {ENVIRONMENT_QUESTION, OUTPUT_QUESTION} from '@/core/scaffold/questions';
import type {RoleId} from '@/core/scaffold/types';
import {sanitize} from '@/core/sanitize';

export const LIBRARY_STORAGE_KEY = 'jaspurr-library';

/* A saved template is the user's ANSWERS (a Selection) plus a stable id. The
rendered prompt is derived from the selection on read -- never stored -- so a
wording fix to the underlying templates flows through to everything already
saved. The id keys the list and lets a single entry be removed. */
export interface SavedTemplate {
    readonly id: string;
    readonly selection: Selection;
}

/* --- Validation: what came out of localStorage is untyped ---------------- */

function hasOption(
    options: readonly {readonly id: string}[],
    id: unknown
): boolean {
    return typeof id === 'string' && options.some((o) => o.id === id);
}

/* A persisted selection is only trustworthy if every id still resolves against
the current domain data. Task options are role-specific, so the taskId is
checked against the selected role's own options. */
export function isValidSelection(value: unknown): value is Selection {
    if (typeof value !== 'object' || value === null) return false;
    const s = value as Record<string, unknown>;
    if (typeof s.topic !== 'string' || typeof s.roleId !== 'string') {
        return false;
    }
    const role = getRole(s.roleId as RoleId);
    return (
        role !== undefined &&
        hasOption(role.question.options, s.taskId) &&
        hasOption(ENVIRONMENT_QUESTION.options, s.environmentId) &&
        hasOption(OUTPUT_QUESTION.options, s.outputId)
    );
}

/* A stored entry is a stable id over a still-valid selection. This is the guard
that keeps a shape change (or hand-edited storage) from putting an entry the
rest of the module can't handle into the library. */
export function isSavedTemplate(value: unknown): value is SavedTemplate {
    if (typeof value !== 'object' || value === null) return false;
    const t = value as Record<string, unknown>;
    return typeof t.id === 'string' && isValidSelection(t.selection);
}

/* --- Storage: filter out anything that no longer validates on load ------- */

/* No-arg createJSONStorage uses jotai's default localStorage access, which is
guarded so it no-ops (rather than throwing) where localStorage is absent, e.g.
under the node test runner. */
const baseStorage = createJSONStorage<readonly SavedTemplate[]>();

/* Drop entries that fail isSavedTemplate on read, so data written by an older
shape is discarded rather than surfacing downstream as a broken SavedTemplate
that would crash assemble(). Persisting only ever writes valid entries, so this
is purely a one-way cleanup of legacy/corrupt storage. */
const libraryStorage = {
    ...baseStorage,
    getItem(
        key: string,
        initialValue: readonly SavedTemplate[]
    ): readonly SavedTemplate[] {
        const stored = baseStorage.getItem(key, initialValue);
        return Array.isArray(stored) ? stored.filter(isSavedTemplate) : [];
    },
};

/* localStorage only -- no account, no server. getOnInit so the saved list is
available on the first render rather than popping in a frame later. */
export const libraryAtom = atomWithStorage<readonly SavedTemplate[]>(
    LIBRARY_STORAGE_KEY,
    [],
    libraryStorage,
    {getOnInit: true}
);

/* --- Pure operations: no storage, no randomness, safe to unit-test ------- */

/* Append a saved template, skipping one whose answers are already in the
library (e.g. a double-tapped Save). Dedup is on the selection, not the id, so
re-saving the same answers is a no-op even though it carries a fresh id. Returns
the same array when nothing changes so callers can skip a write. */
export function addTemplate(
    library: readonly SavedTemplate[],
    saved: SavedTemplate
): readonly SavedTemplate[] {
    const key = JSON.stringify(saved.selection);
    const exists = library.some((t) => JSON.stringify(t.selection) === key);
    return exists ? library : [...library, saved];
}

/* Drop the entry with the given id. Returns the same array when no id matches,
so callers can skip a write. */
export function removeTemplate(
    library: readonly SavedTemplate[],
    id: string
): readonly SavedTemplate[] {
    const next = library.filter((t) => t.id !== id);
    return next.length === library.length ? library : next;
}

const EMPTY_LIBRARY: readonly SavedTemplate[] = [];

/* Empty the library. */
export function clearTemplates(): readonly SavedTemplate[] {
    return EMPTY_LIBRARY;
}

/* Wrap a body in a fence of more backticks than the longest run inside it, per
CommonMark's rule that a fenced block closes only on a backtick run at least as
long as its opener. Without this, a template whose text contains ``` would end
its own code block early and corrupt the rest of the markdown. */
function fence(body: string): string {
    const longest = (body.match(/`+/g) ?? []).reduce(
        (max, run) => Math.max(max, run.length),
        0
    );
    const ticks = '`'.repeat(Math.max(3, longest + 1));
    return `${ticks}\n${body}\n${ticks}`;
}

/* The whole library as one markdown document: each saved template as a level-2
heading (role, plus its one-line topic) over the assembled prompt in a fenced
block. Assembled here, on read, so it always reflects the current templates.
Entries are guaranteed valid by libraryStorage, so assemble() never throws. */
export function libraryToMarkdown(library: readonly SavedTemplate[]): string {
    return library
        .map(({selection}) => {
            const role = getRole(selection.roleId);
            const label = role ? role.label : 'Template';
            const topic = sanitize(selection.topic);
            const heading = topic ? `${label}: ${topic}` : label;
            return `## ${heading}\n\n${fence(toText(assemble(selection)))}`;
        })
        .join('\n\n');
}

/* --- Write atoms: thin wrappers that inject the id / persist the result -- */

export const saveTemplateAtom = atom(null, (get, set, selection: Selection) => {
    const library = get(libraryAtom);
    const next = addTemplate(library, {id: crypto.randomUUID(), selection});
    if (next !== library) {
        set(libraryAtom, next);
    }
});

export const removeTemplateAtom = atom(null, (get, set, id: string) => {
    const library = get(libraryAtom);
    const next = removeTemplate(library, id);
    if (next !== library) {
        set(libraryAtom, next);
    }
});

export const clearLibraryAtom = atom(null, (get, set) => {
    if (get(libraryAtom).length > 0) {
        set(libraryAtom, clearTemplates());
    }
});
