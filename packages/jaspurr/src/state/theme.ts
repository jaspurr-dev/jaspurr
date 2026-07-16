import {atomWithStorage} from 'jotai/utils';

/* 'system' follows the OS via CSS (no data-theme attribute); 'light'/'dark' are
explicit user choices that pin the theme. */
export type ThemePref = 'system' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'scaffold-theme';

/* Persisted preference. Defaults to 'system' and is only written to
localStorage once the user actually toggles, so a first-time visitor keeps
following their OS. getOnInit reads storage synchronously so the stored choice
applies on the first render rather than flashing the default first. */
export const themeAtom = atomWithStorage<ThemePref>(
    THEME_STORAGE_KEY,
    'system',
    undefined,
    {getOnInit: true}
);

/* The concrete theme the UI should show, given the preference and the current
OS setting (which only matters while the preference is 'system'). */
export function resolveTheme(pref: ThemePref, prefersDark: boolean): Theme {
    if (pref === 'system') {
        return prefersDark ? 'dark' : 'light';
    }
    return pref;
}

/* Toggling always commits to an explicit theme -- the opposite of what is on
screen right now. */
export function toggle(effective: Theme): Theme {
    return effective === 'dark' ? 'light' : 'dark';
}
