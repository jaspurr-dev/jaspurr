import {DesignLayer} from '@/styles/core.styles';
import {Icon, type IconProps} from '@components/icons/Icon';

export function IconTile(iconProps: IconProps) {
    return (
        <span className={DesignLayer.classes.iconOutlineBox}>
            <Icon {...iconProps} />
        </span>
    );
}
