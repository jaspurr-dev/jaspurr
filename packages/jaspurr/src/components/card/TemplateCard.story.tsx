import type {Story} from '@/sandbox/types';
import {TemplateCard} from './TemplateCard';
import {TEMPLATES} from '@/core/templates';

export const story: Story = {
    name: 'TemplateCard',
    layer: 'components',
    render: () => <TemplateCard template={TEMPLATES['tech-pm-type-a']} />,
};
