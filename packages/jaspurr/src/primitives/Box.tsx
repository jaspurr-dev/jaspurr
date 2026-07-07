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
