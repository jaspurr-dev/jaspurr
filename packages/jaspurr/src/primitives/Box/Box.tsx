import style from './Box.module.css';

type BoxProps<T extends React.ElementType = 'div'> = {
    as?: T;
} & Omit<React.ComponentPropsWithRef<T>, 'as'>;

export function Box<T extends React.ElementType = 'div'>({
    as,
    ...props
}: BoxProps<T>) {
    const Component = as ?? 'div';
    return <Component {...props} />;
}

export function OutlineBox<T extends React.ElementType = 'div'>({
    ...props
}: BoxProps<T>) {
    return <Box className={style.outlineBox} {...props}></Box>;
}
