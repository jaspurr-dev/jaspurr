import {Text} from '@/primitives';
import {ProgressDots} from './ProgressDots';
import style from './StepHeader.module.css';

interface StepHeaderProps {
    current: number;
    total?: number;
}

/* The flow step header: "Question X of Y" above the progress dots. */
export function StepHeader({current, total = 4}: StepHeaderProps) {
    return (
        <div className={style.header}>
            <Text className={style.count}>
                Question {current} of {total}
            </Text>
            <ProgressDots current={current} total={total} />
        </div>
    );
}
