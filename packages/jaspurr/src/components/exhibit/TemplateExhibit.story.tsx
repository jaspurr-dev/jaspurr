import type {Story} from '@/sandbox/types';
import {TemplateExhibit} from './TemplateExhibit';
import {assembleTemplate} from '@/core/scaffold/assemble';
import {EXAMPLE_SELECTION} from '@/core/scaffold/roles';

const template = assembleTemplate(EXAMPLE_SELECTION);

export const story: Story = {
    name: 'TemplateExhibit',
    layer: 'components',
    render: () => (
        <div style={{maxWidth: 560}}>
            <TemplateExhibit sections={template.sections} />
        </div>
    ),
};
