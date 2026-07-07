import {cx} from '@/util/cx';
import style from './Stack.module.css';

type StackProps = React.ComponentPropsWithRef<'div'> & {
    gap?: '1' | '2' | '3' | '4';
    align?: 'start' | 'center' | 'end' | 'stretch';
};

export function Stack({gap = '3', align, className, ...props}: StackProps) {
    return (
        <div
            data-gap={gap}
            data-align={align}
            className={cx(style.stack, className)}
            {...props}
        />
    );
}

export function Row({gap = '3', align, className, ...props}: StackProps) {
    return (
        <div
            data-gap={gap}
            data-align={align}
            className={cx(style.row, className)}
            {...props}
        />
    );
}
