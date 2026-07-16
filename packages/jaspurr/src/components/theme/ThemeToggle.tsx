import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {IconButton} from '@components/buttons/IconButton';
import {resolveTheme, themeAtom, toggle} from '@/state/theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/* Tracks the OS setting so the icon stays correct while the preference is
'system', including when the user flips their OS theme with the app open. */
function usePrefersDark(): boolean {
    const [prefersDark, setPrefersDark] = useState(
        () => window.matchMedia(DARK_QUERY).matches
    );
    useEffect(() => {
        const query = window.matchMedia(DARK_QUERY);
        const onChange = (e: MediaQueryListEvent) => {
            setPrefersDark(e.matches);
        };
        query.addEventListener('change', onChange);
        return () => {
            query.removeEventListener('change', onChange);
        };
    }, []);
    return prefersDark;
}

export function ThemeToggle() {
    const [pref, setPref] = useAtom(themeAtom);
    const prefersDark = usePrefersDark();
    const effective = resolveTheme(pref, prefersDark);
    const target = toggle(effective);
    return (
        <IconButton
            icon={target === 'dark' ? 'moon' : 'sun'}
            label={`Switch to ${target} theme`}
            onClick={() => {
                setPref(target);
            }}
        />
    );
}
