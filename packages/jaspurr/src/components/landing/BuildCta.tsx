import {StartBuildLink} from '@components/navigation/StartBuildLink';
import style from './BuildCta.module.css';

interface BuildCtaProps {
    label?: string;
}

export function BuildCta({label = 'Build your template'}: BuildCtaProps) {
    return <StartBuildLink className={style.cta}>{label}</StartBuildLink>;
}
