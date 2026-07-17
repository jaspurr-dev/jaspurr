import {ROLE_LIST} from '@/core/scaffold/roles';
import {RoleId} from '@/core/scaffold/types';
import {ROLE_ICON} from '@components/role/roleIcon';
import {Icon} from '@components/icons/Icon';
import {cx} from '@/util/cx';
import style from './RolesSection.module.css';

/* The grid opens on Software engineer so the selected state is visible at a
glance; this is a still of the flow's first step, not the step itself. */
const SELECTED_ID = RoleId.SoftwareEngineer;

/* Static showcase of the eight roles. Display only -- the single way in is the
CTA, so the cards do not link or respond to taps. */
export function RolesSection() {
    return (
        <section id="roles" className={style.section}>
            <div className={style.intro}>
                <h2 className={style.heading}>
                    Eight roles. Each one asks different questions.
                </h2>
                <p className={style.subhead}>
                    An SDE and a designer do not need the same brief. Jaspurr
                    knows the difference.
                </p>
            </div>

            <ul className={style.grid}>
                {ROLE_LIST.map((role) => (
                    <li
                        key={role.id}
                        className={cx(
                            style.card,
                            role.id === SELECTED_ID && style.selected
                        )}>
                        <span className={style.iconTile}>
                            <Icon name={ROLE_ICON[role.id]} size={20} />
                        </span>
                        <span className={style.name}>{role.label}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
