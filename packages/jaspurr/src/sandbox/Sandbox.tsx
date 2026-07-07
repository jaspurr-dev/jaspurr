import {useState} from 'react';
import type {Layer, Story} from './types';
import {stories} from './registry';
import {Box} from '@/primitives/Box';

interface SidebarProps {
    stories: Story[];
    query: string;
    selected?: string | undefined;
}

function Sidebar({stories, selected, query}: SidebarProps) {
    const layers: Layer[] = ['component']; //'composite'
    return (
        <nav>
            <h1>Selected: {selected ?? 'None'}</h1>
            <input placeholder="Search components" value={query} />
            {layers.map((layer) => {
                const group = stories.filter((st) => st.layer === layer);
                return group.length === 0 ? (
                    <h1>{layer}: No stories found.</h1>
                ) : (
                    <div>
                        {group.map((st) => (
                            <button>{st.name}</button>
                        ))}
                    </div>
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
        <Box>
            <h1>Harness: {story.name}</h1>

            <div>
                <div>{story.render()}</div>
            </div>
        </Box>
    );
}

export function UISandbox() {
    const [selected] = useState(stories[0]?.name);
    const [query] = useState('');

    const visible = stories.filter((st) =>
        st.name.toLowerCase().includes(query.toLowerCase())
    );
    const active = stories.find((st) => st.name === selected);

    return (
        <div>
            <h1>Active: {active?.name}</h1>
            <Sidebar {...{stories: visible, selected, query}}></Sidebar>
            <main></main>
            {active ? (
                <Harness story={active} />
            ) : (
                <h1>No matching component.</h1>
            )}
        </div>
    );
}
