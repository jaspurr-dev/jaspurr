import type {Story} from '@/sandbox/types';
import {Hero} from './Hero';

export const story: Story = {
    name: 'Hero',
    layer: 'components',
    render: () => <Hero />,
};
