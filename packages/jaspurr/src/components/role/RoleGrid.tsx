import {ROLE_LIST} from '@/core/scaffold/roles';
import type {RoleId} from '@/core/scaffold/types';
import {RoleCard} from './RoleCard';
import style from './RoleGrid.module.css';

interface RoleGridProps {
    selectedId?: RoleId | null;
    onSelect?: (id: RoleId) => void;
}

/* Responsive grid of the eight role cards for the flow's first step. */
export function RoleGrid({selectedId, onSelect}: RoleGridProps) {
    return (
        <div className={style.grid}>
            {ROLE_LIST.map((role) => (
                <RoleCard
                    key={role.id}
                    role={role}
                    selected={role.id === selectedId}
                    onClick={() => {
                        onSelect?.(role.id);
                    }}
                />
            ))}
        </div>
    );
}
