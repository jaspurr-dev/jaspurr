/* The sandbox and design-token routes render real components -- including a
live ResultScreen with a working copy button -- and they ship in the production
bundle. Events fired from them would be indistinguishable from real conversions,
so they are dropped at the source. */
const EXCLUDED_PREFIXES = ['/sandbox', '/designtokens'];

/* The vendor tracker attaches this global once its script loads. */
interface Analytics {
    track: (event: string) => void;
}

/* Widens globalThis to admit two things the DOM types deny: the vendor's
injected global, and that `location` is absent under the node test runner. */
export interface Globals {
    umami?: Analytics;
    location?: {pathname?: string};
}

function globals(): Globals {
    return globalThis;
}

/* Never throws and never blocks the caller: analytics must not be able to break
a user action it is only observing. A silent no-op under the test runner and
whenever a content blocker drops the script. */
function send(event: string): void {
    const path = globals().location?.pathname ?? '';
    if (EXCLUDED_PREFIXES.some((prefix) => path.startsWith(prefix))) return;
    try {
        globals().umami?.track(event);
    } catch (err) {
        // A blocked or half-initialised tracker must not surface to the user.
        // Log instead for visibility.
        console.error(err);
    }
}

export function templateCopied(): void {
    send('copy-template');
}
