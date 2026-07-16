import {useAtomValue} from 'jotai';
import {useLayoutEffect} from 'react';
import {themeAtom} from '@/state/theme';

/* Applies the theme preference to the document. Rendered once near the app root
so the choice takes effect on every route, not just inside the nav shell.
'system' removes the attribute and lets the CSS light-dark() tokens follow the
OS; an explicit choice pins data-theme. Renders nothing. */
export function ThemeManager() {
    const pref = useAtomValue(themeAtom);
    useLayoutEffect(() => {
        const root = document.documentElement;
        if (pref === 'system') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', pref);
        }
    }, [pref]);
    return null;
}
