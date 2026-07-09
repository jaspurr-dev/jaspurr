import type {Template} from '@/core/template';
import {Row} from '@/primitives';
import {Card} from '@components/card/Card';
import {IconTile} from '@components/icons/IconTile';
import {StepList} from '@components/list/StepList';
import {categoryToIconName} from '@/util/icon';
import {Link} from 'react-router';
import style from './TemplateCard.module.css';
import {TemplateURLPrefix} from '@/util/template';

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
                <Link
                    key={template.id}
                    to={`${TemplateURLPrefix}${template.id}`}
                    className={style.cardLink}>
                    {template.name}
                </Link>
            </Row>
            <StepList
                variant="preview"
                steps={[...template.steps].slice(0, PREVIEW_STEPS)}
            />
        </Card>
    );
}
