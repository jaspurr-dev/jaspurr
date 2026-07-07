import type {Story} from './types';

const modules = import.meta.glob<{story: Story}>('/src/**/*.story.tsx', {
    eager: true,
});

export const stories: Story[] = Object.values(modules)
    .map((m) => m.story)
    .sort(
        (a, b) => a.layer.localeCompare(b.layer) || a.name.localeCompare(b.name)
    );
