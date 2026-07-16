import type {Story} from '@/sandbox/types';
import {TemplateExhibit} from './TemplateExhibit';
import {assembleTemplate, type Selection} from '@/core/scaffold/assemble';
import {RoleId} from '@/core/scaffold/types';

const softwareExample: Selection = {
    roleId: RoleId.SoftwareEngineer,
    taskId: 'refactor',
    environmentId: 'mature',
    outputId: 'output-only',
    topic: 'Refactor a 2,000-line React component into hooks',
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
