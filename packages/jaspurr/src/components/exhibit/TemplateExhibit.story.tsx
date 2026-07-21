import type {Story} from '@/sandbox/types';
import {TemplateExhibit} from './TemplateExhibit';
import {assembleTemplate, type Selection} from '@/core/scaffold/assemble';
import {RoleId} from '@/core/scaffold/types';

const softwareExample: Selection = {
    roleId: RoleId.VisualDesigner,
    answers: {
        company: 'Foobar',
        context: 'existing',
        task: 'refresh',
    },
};

const template = assembleTemplate(softwareExample);

export const story: Story = {
    name: 'TemplateExhibit',
    layer: 'components',
    render: () => (
        <div style={{maxWidth: 560}}>
            <TemplateExhibit sections={template.sections} />
        </div>
    ),
};
