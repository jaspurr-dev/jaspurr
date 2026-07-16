import style from './SegmentedToggle.module.css';

interface Segment<T extends string> {
    readonly value: T;
    readonly label: string;
}

interface SegmentedToggleProps<T extends string> {
    segments: readonly Segment<T>[];
    value: T;
    onChange: (value: T) => void;
    label?: string;
}

/* Two-or-more-way segmented control. Drives the mobile before/after exhibit;
the selected segment reads as an elevated card on a recessed track. */
export function SegmentedToggle<T extends string>({
    segments,
    value,
    onChange,
    label,
}: SegmentedToggleProps<T>) {
    return (
        <div className={style.toggle} aria-label={label}>
            {segments.map((segment) => (
                <button
                    key={segment.value}
                    type="button"
                    className={style.segment}
                    aria-pressed={segment.value === value}
                    onClick={() => {
                        onChange(segment.value);
                    }}>
                    {segment.label}
                </button>
            ))}
        </div>
    );
}
