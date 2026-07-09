import {Text, TextTitle} from '@/primitives';
import {Card} from '@components/card/Card';
import style from './Home.module.css';

export function RouteHome() {
    const templates = ['Template1', 'Template2', 'Template3', 'Template4'];
    return (
        <div className={style.home}>
            {/* TODO: Placeholder header space */}
            <header className={style.header}>
                <TextTitle>Header</TextTitle>
            </header>
            {templates.map((t) => (
                <Card>
                    <TextTitle>{t}</TextTitle>
                    <Text>Placeholder template content.</Text>
                </Card>
            ))}
        </div>
    );
}
