import {useAtomValue, useSetAtom} from 'jotai';
import {libraryAtom, removeTemplateAtom} from '@/state/library';
import {LibraryView} from '@components/library/LibraryView';

/* The saved-templates route. Reads the persisted library and wires delete back
to the store; the view owns the copy actions and empty state itself. */
export function RouteLibrary() {
    const library = useAtomValue(libraryAtom);
    const remove = useSetAtom(removeTemplateAtom);
    return (
        <LibraryView
            items={library}
            onDelete={(id) => {
                remove(id);
            }}
        />
    );
}
