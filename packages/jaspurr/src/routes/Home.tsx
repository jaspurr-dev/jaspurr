import {TextTitle} from '@/primitives';
import style from './Home.module.css';
import {TEMPLATES} from '@/core/templates';
import {TemplateCard} from '@/components/card/TemplateCard';

export function RouteHome() {
    const templates = Object.values(TEMPLATES);
    return (
        <div className={style.home}>
            {/* TODO: Placeholder header space */}
            <header className={style.header}>
                <TextTitle>Header</TextTitle>
            </header>
            {templates.map((t) => (
                <TemplateCard key={t.id} template={t}></TemplateCard>
            ))}
        </div>
    );
}
