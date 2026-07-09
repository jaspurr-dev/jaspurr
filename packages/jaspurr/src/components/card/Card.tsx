import {cx} from '@/util/cx';
import style from './Card.module.css';

type CardProps = React.ComponentPropsWithRef<'div'>;

export function Card({className, ...props}: CardProps) {
    return <div className={cx(style.card, className)} {...props} />;
}
