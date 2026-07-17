import {Link} from 'react-router';
import style from './BuildCta.module.css';

interface BuildCtaProps {
    label?: string;
}

export function BuildCta({label = 'Build your template'}: BuildCtaProps) {
    return (
        <Link to="/build" className={style.cta}>
            {label}
        </Link>
    );
}
