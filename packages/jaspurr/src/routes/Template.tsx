import style from './Template.module.css';
import {TextTitle} from '@/primitives';

export function RouteTemplate() {
    return (
        <div className={style.template}>
            <TextTitle>Template Route</TextTitle>
        </div>
    );
}
