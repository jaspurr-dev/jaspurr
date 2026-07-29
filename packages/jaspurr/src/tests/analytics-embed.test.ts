import {describe, expect, it} from 'vitest';
/* ?raw keeps this to the app's own toolchain -- tsconfig.app.json scopes types
to vite/client, which declares these, so no node typings are pulled in. */
import html from '../../index.html?raw';
import headers from '../../public/_headers?raw';

/* The analytics embed fails SILENTLY in every direction: a wrong website id, a
hostname missing from data-domains, or a vendor host absent from the CSP all
look exactly like "nobody visited". Nothing in the running app surfaces any of
it, so these assertions stand in for the feedback the browser never gives. */

const VENDOR_ORIGIN = 'https://cloud.umami.is';
const PRODUCTION_HOSTS = ['jaspurr.dev', 'www.jaspurr.dev'];

function attribute(name: string): string {
    const found = new RegExp(`${name}="([^"]*)"`).exec(html);
    return found?.[1] ?? '';
}

describe('analytics embed', () => {
    it('loads the tracker from the vendor origin', () => {
        expect(html).toContain(`${VENDOR_ORIGIN}/script.js`);
    });

    it('carries a website id in the shape the vendor issues', () => {
        expect(attribute('data-website-id')).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        );
    });

    /* An exact-match allowlist over window.location.hostname: a production host
    missing here reports nothing at all. */
    it('allowlists every production hostname', () => {
        const domains = attribute('data-domains').split(',');
        expect(domains).toEqual(PRODUCTION_HOSTS);
    });

    /* The point of the allowlist is that dev and preview traffic never lands in
    the production numbers and skews the conversion rate. */
    it('keeps local and preview hosts out of the allowlist', () => {
        const domains = attribute('data-domains');
        expect(domains).not.toMatch(/localhost|127\.0\.0\.1|pages\.dev/);
    });

    /* The CSP is deny-by-default. script-src alone is the quiet half-failure:
    the tracker loads and then every event is dropped. */
    it('permits the vendor in both script-src and connect-src', () => {
        const csp = /Content-Security-Policy:([^\n]*)/.exec(headers)?.[1] ?? '';
        const directive = (name: string) =>
            new RegExp(`${name} ([^;]*)`).exec(csp)?.[1] ?? '';
        expect(directive('script-src')).toContain(VENDOR_ORIGIN);
        expect(directive('connect-src')).toContain(VENDOR_ORIGIN);
    });
});
