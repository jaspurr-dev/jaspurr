import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {assembleTemplate, toText} from '@/core/scaffold/assemble';
import {libraryToMarkdown, type SavedTemplate} from '@/state/library';
import {sanitize} from '@/core/sanitize';
import {ROLE_ICON} from '@components/role/roleIcon';
import {Icon} from '@components/icons/Icon';
import {Stack, Text} from '@/primitives';
import {cx} from '@/util/cx';
import style from './LibraryView.module.css';

interface LibraryViewProps {
    items: readonly SavedTemplate[];
    onDelete: (id: string) => void;
}

/* The copy-all button shares the one "Copied!" flag with the per-item buttons.
Item ids are UUIDs, so this sentinel can never collide with one. */
const COPY_ALL_KEY = 'all';

/* The saved-templates screen: an honest note about where these live, a list of
what was kept, and the things to do with them -- copy one out, copy the whole
lot as markdown, or delete one. Templates store the ANSWERS, so each row is
assembled on render and always reflects the current wording. */
export function LibraryView({items, onDelete}: LibraryViewProps) {
    // One key drives whichever "Copied!" label is showing: an item id, or
    // COPY_ALL_KEY for the copy-all button. It clears itself after a beat.
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    useEffect(() => {
        if (copiedKey === null) return;
        const timer = setTimeout(() => {
            setCopiedKey(null);
        }, 1500);
        return () => {
            clearTimeout(timer);
        };
    }, [copiedKey]);

    const copy = (key: string, text: string) => {
        // Ignore a rejected clipboard write (denied permission); the button
        // just won't flip to "Copied!" rather than throwing.
        void navigator.clipboard.writeText(text).then(
            () => {
                setCopiedKey(key);
            },
            () => undefined
        );
    };

    return (
        <Stack gap="4" className={style.screen}>
            <Stack gap="1">
                <Text as="h1" className={style.title}>
                    Your library
                </Text>
                <Text className={style.note}>
                    Saved in this browser only. No account, and nothing leaves
                    your device.
                </Text>
            </Stack>

            {items.length === 0 ? (
                <div className={style.empty}>
                    <Text className={style.emptyLine}>
                        Nothing saved yet. Build a template and hit Save to keep
                        it here.
                    </Text>
                    <Link to="/build" className={style.cta}>
                        Build a template
                    </Link>
                </div>
            ) : (
                <>
                    <div className={style.toolbar}>
                        <button
                            type="button"
                            className={cx(style.action, style.primary)}
                            onClick={() => {
                                copy(COPY_ALL_KEY, libraryToMarkdown(items));
                            }}>
                            {copiedKey === COPY_ALL_KEY
                                ? 'Copied!'
                                : 'Copy all as markdown'}
                        </button>
                    </div>
                    <ul className={style.list}>
                        {items.map((item) => {
                            const {sections, chips} = assembleTemplate(
                                item.selection
                            );
                            const title =
                                sanitize(item.selection.topic) || 'Untitled';
                            return (
                                <li key={item.id} className={style.row}>
                                    <span className={style.iconTile}>
                                        <Icon
                                            name={
                                                ROLE_ICON[item.selection.roleId]
                                            }
                                            size={20}
                                        />
                                    </span>
                                    <div className={style.meta}>
                                        <span className={style.itemTitle}>
                                            {title}
                                        </span>
                                        <span className={style.subtitle}>
                                            {chips.join(', ')}
                                        </span>
                                    </div>
                                    <div className={style.rowActions}>
                                        <button
                                            type="button"
                                            className={style.rowButton}
                                            aria-label={`Copy ${title}`}
                                            onClick={() => {
                                                copy(item.id, toText(sections));
                                            }}>
                                            {copiedKey === item.id
                                                ? 'Copied!'
                                                : 'Copy'}
                                        </button>
                                        <button
                                            type="button"
                                            className={style.rowButton}
                                            aria-label={`Delete ${title}`}
                                            onClick={() => {
                                                onDelete(item.id);
                                            }}>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </Stack>
    );
}
