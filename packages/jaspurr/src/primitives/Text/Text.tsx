import {cx} from '@/util/cx';
import styles from './Text.module.css';

type TextProps = {
    as?: React.ElementType;
    className?: string | undefined;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function Text({as, children, className, ...props}: TextProps) {
    const Component = as ?? 'p';
    return (
        <Component className={className ?? styles.text} {...props}>
            {children}
        </Component>
    );
}

export function TextTitle({as, children, ...props}: TextProps) {
    const Component = as ?? 'h1';
    return (
        <Text
            as={Component}
            className={cx(styles.text, styles.title)}
            {...props}>
            {children}
        </Text>
    );
}
