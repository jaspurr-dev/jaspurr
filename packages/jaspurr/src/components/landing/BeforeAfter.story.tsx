import type {Story} from '@/sandbox/types';
import {BeforeAfter} from './BeforeAfter';

export const story: Story = {
    name: 'BeforeAfter',
    layer: 'components',
    render: () => <BeforeAfter />,
};
