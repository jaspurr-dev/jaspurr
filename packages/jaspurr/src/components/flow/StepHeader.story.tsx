import type {Story} from '@/sandbox/types';
import {StepHeader} from './StepHeader';

export const story: Story = {
    name: 'StepHeader',
    layer: 'components',
    render: () => <StepHeader current={2} />,
};
