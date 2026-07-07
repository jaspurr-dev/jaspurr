import {useState, type Dispatch, type SetStateAction} from 'react';
import type {Layer, Story} from './types';
import {stories} from './registry';
import s from './Sandbox.module.css';
import {cx} from '@/util/cx';
import {Row, Stack, Text} from '@/primitives';

interface SidebarProps {
    stories: Story[];
    query: string;
    selected?: string | undefined;
    onSelect: Dispatch<SetStateAction<string>>;
    onQuery: Dispatch<SetStateAction<string>>;
}

function Sidebar({stories, selected, query, onSelect, onQuery}: SidebarProps) {
    const layers: Layer[] = ['primitive'];
    return (
        <nav className={s.sidebar}>
            <input
                className={s.search}
                placeholder="Search components"
                value={query}
                onChange={(e) => {
                    onQuery(e.target.value);
                }}
            />
            {layers.map((layer) => {
                const group = stories.filter((st) => st.layer === layer);
                return group.length === 0 ? (
                    <Text>{layer}: No stories found.</Text>
                ) : (
                    <Stack key={layer}>
                        <Text>{layer}</Text>
                        {group.map((st) => (
                            <button
                                key={st.name}
                                className={cx(
                                    s.item,
                                    st.name === selected && s.itemActive
                                )}
                                onClick={() => {
                                    onSelect(st.name);
                                }}>
                                {st.name}
                            </button>
                        ))}
                    </Stack>
                );
            })}
        </nav>
    );
}

interface HarnessProps {
    story: Story;
}

function Harness({story}: HarnessProps) {
    return (
        <Stack gap="4">
            <Text>Harness: {story.name}</Text>

            <Row>
                <div className={s.container}>{story.render()}</div>
            </Row>
        </Stack>
    );
}

export function UISandbox() {
    const [selected, setSelected] = useState(''); //stories[0]?.name);
    const [query, setQuery] = useState('');

    const visible = stories.filter((st) =>
        st.name.toLowerCase().includes(query.toLowerCase())
    );
    const active = stories.find((st) => st.name === selected);

    return (
        <div className={s.shell}>
            <Sidebar
                {...{
                    stories: visible,
                    onSelect: setSelected,
                    onQuery: setQuery,
                    selected,
                    query,
                }}></Sidebar>
            <main className={s.detail}>
                {active ? (
                    <Harness story={active} />
                ) : (
                    <Text>Nothing selected.</Text>
                )}
            </main>
        </div>
    );
}
