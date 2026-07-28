import type {MouseEvent} from 'react';

/* True when the browser -- not the router -- will act on this click, because a
held modifier or a non-primary button means "open in a new tab or window". The
current tab does not navigate in that case, so side effects that belong to
navigating it should be skipped. */
export function opensNewContext(event: MouseEvent): boolean {
    return (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    );
}
