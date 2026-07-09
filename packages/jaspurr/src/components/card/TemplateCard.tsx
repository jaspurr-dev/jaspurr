import type {Template} from '@/core/template';
import {DesignLayer} from '@/styles/core.styles';
import {Row, Text} from '@/primitives';
import {Card} from '@components/card/Card';
import {IconTile} from '@components/icons/IconTile';
import {StepList} from '@components/list/StepList';
import {categoryToIconName} from '@/util/icon';

const PREVIEW_STEPS = 3;

interface TemplateCardProps {
    template: Template;
}

export function TemplateCard({template}: TemplateCardProps) {
    const iconName = categoryToIconName(template.category);
    return (
        <Card>
            <Row>
                <IconTile name={iconName} />
                <Text as="h2" className={DesignLayer.classes.name}>
                    {template.name}
                </Text>
            </Row>
            <StepList
                variant="preview"
                steps={[...template.steps].slice(0, PREVIEW_STEPS)}
            />
        </Card>
    );
}
