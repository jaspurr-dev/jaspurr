import {afterEach, describe, expect, it, vi} from 'vitest';
import {trackTemplateCopied, type Globals} from '@/util/analytics';

const globals: Globals = globalThis;

function bindGlobals(onTrack: (event: string) => void, pathname = '/build') {
    globals.umami = {track: onTrack};
    globals.location = {pathname};
}

afterEach(() => {
    delete globals.umami;
    delete globals.location;
});

describe('templateCopied', () => {
    it('is a silent no-op when the tracker never loaded', () => {
        // The ad-blocked path, and the one the test runner itself takes.
        expect(() => {
            trackTemplateCopied();
        }).not.toThrow();
    });

    it('reports the copy exactly once on a normal route', () => {
        const spy = vi.fn();
        bindGlobals(spy);
        trackTemplateCopied();
        expect(spy).toHaveBeenCalledExactlyOnceWith('copy-template');
    });

    /* The sandbox ships in the production bundle and renders a live, clickable
    ResultScreen, so a demo click there must not read as a conversion. */
    it('drops events fired from the sandbox and design-token routes', () => {
        const spy = vi.fn();
        bindGlobals(spy, '/sandbox');
        trackTemplateCopied();
        bindGlobals(spy, '/designtokens');
        trackTemplateCopied();
        expect(spy).not.toHaveBeenCalled();
    });

    it('does not let a broken tracker surface to the caller', () => {
        bindGlobals(() => {
            throw new Error('blocked mid-initialisation');
        });
        expect(() => {
            trackTemplateCopied();
        }).not.toThrow();
    });
});
