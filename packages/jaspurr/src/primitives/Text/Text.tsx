import {cx} from '@/util/cx';

type TextProps<T extends React.ElementType = 'p'> = {
    as?: T;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    tone?: 'primary' | 'secondary' | 'disabled';
    weight?: 'regular' | 'medium' | 'bold';
} & Omit<React.ComponentPropsWithRef<T>, 'as'>;

export function Text<T extends React.ElementType = 'p'>({
    as,
    size = 'base',
    tone = 'primary',
    weight,
    className,
    ...props
}: TextProps<T>) {
    const Component = as ?? 'p';
    return (
        <Component
            data-size={size}
            data-tone={tone}
            data-weight={weight}
            className={cx('text', className)}
            {...props}
        />
    );
}
