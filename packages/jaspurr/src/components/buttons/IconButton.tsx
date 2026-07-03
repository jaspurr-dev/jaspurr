import {Icon, type IconName} from '@/components/icons/Icon';
import {DesignLayer} from '@/styles/core.styles';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconName;
    label: string;
}

export function IconButton({icon, label, ...rest}: IconButtonProps) {
    return (
        <button
            className={DesignLayer.classes.iconButton}
            aria-label={label}
            {...rest}>
            <Icon name={icon} />
        </button>
    );
}
