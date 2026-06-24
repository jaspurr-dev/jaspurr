import {entries} from '@/util/records';
import {labelStyles, dropdownStyles} from '@styles/core.styles';

interface Props<T extends string> {
    label: string;
    value: T;
    options: Record<T, string>;
    onChange: (id: T) => void;
    disabled?: boolean;
}

export function Dropdown<T extends string>({
    label,
    value,
    options,
    onChange,
    disabled = false,
}: Props<T>) {
    return (
        <label className={labelStyles.base}>
            <span>{label}</span>
            <select
                disabled={disabled}
                className={
                    disabled ? dropdownStyles.disabled : dropdownStyles.base
                }
                value={value}
                onChange={(e) => {
                    onChange(e.target.value as T);
                }}>
                {entries(options).map(([id, label]) => (
                    <option key={id} value={id}>
                        {label}
                    </option>
                ))}
            </select>
        </label>
    );
}
