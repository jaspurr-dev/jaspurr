import {useState, type Dispatch, type SetStateAction} from 'react';
import type {Layer, Story} from './types';
import {stories} from './registry';
import s from './Sandbox.module.css';
import {Row, Stack, Text} from '@/primitives';
import {Chip} from '@/components/buttons/Chip';
import {SearchField} from '@/components/input/SearchField';

interface SidebarProps {
    stories: Story[];
    query: string;
    selected?: string | undefined;
    onSelect: Dispatch<SetStateAction<string>>;
    onQuery: Dispatch<SetStateAction<string>>;
}

function Sidebar({stories, query, onSelect, onQuery}: SidebarProps) {
    const layers: Layer[] = ['primitive'];
    return (
        <nav className={s.sidebar}>
            <SearchField
                className={s.search}
                placeholder="Search"
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
                        <Text className={s.layerName}>{layer}</Text>

                        {group.map((st) => (
                            <Chip
                                key={st.name}
                                onClick={() => {
                                    onSelect(st.name);
                                }}
                                children={st.name}></Chip>
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
