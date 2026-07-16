import type {Assembled} from '@/core/scaffold/assemble';
import {cx} from '@/util/cx';
import style from './TemplateExhibit.module.css';

interface TemplateExhibitProps {
    sections: Assembled;
}

/* The assembled prompt shown in monospace. The TASK section -- the only part
that comes from the user's free-text line -- is highlighted and tagged. */
export function TemplateExhibit({sections}: TemplateExhibitProps) {
    return (
        <div className={style.exhibit}>
            {sections.map((section) => {
                const isTask = section.heading === 'TASK';
                return (
                    <div
                        key={section.heading}
                        className={cx(style.section, isTask && style.task)}>
                        <div className={style.headingRow}>
                            <span className={style.heading}>
                                {section.heading}
                            </span>
                            {isTask && (
                                <span className={style.tag}>your one line</span>
                            )}
                        </div>
                        <pre className={style.body}>{section.body}</pre>
                    </div>
                );
            })}
        </div>
    );
}
