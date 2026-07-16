import {DesignLayer} from '@/styles/core.styles';
import type {SVGProps} from 'react';

// Icon paths in PATHS adapted from tabler-icons (MIT License)
// https://github.com/tabler/tabler-icons
// See docs/licenses/tabler-icons/license.txt
const PATHS = {
    home: 'M5 12l-2 0l9 -9l9 9l-2 0M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7',
    braces: 'M7 4a2 2 0 0 0 -2 2v3a2 2 0 0 1 -2 2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2M17 4a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2v3a2 2 0 0 1 -2 2',
    brush: 'M3 21v-4a4 4 0 1 1 4 4h-4M21 3a16 16 0 0 0 -12.8 10.2M21 3a16 16 0 0 1 -10.2 12.8M10.6 9a9 9 0 0 1 4.4 4.4',
    target: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
    search: 'M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0M21 21l-6 -6',
    back: 'M15 6l-6 6l6 6',
    dots: 'M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
    play: 'M7 4v16l13 -8z',
    check: 'M5 12l5 5l10 -10',
    listCheck:
        'M11 6h9M11 12h9M11 18h9M4 6l1 1l2 -2M4 12l1 1l2 -2M4 18l1 1l2 -2',
    code: 'M7 8l-4 4l4 4M17 8l4 4l-4 4M14 4l-4 16',
    message:
        'M8 9h8M8 13h6M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-1a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z',
    sun: 'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 17.7l.7 .7M6.3 17.7l-.7 .7',
    moon: 'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z',
} as const satisfies Record<string, string>;

export type IconName = keyof typeof PATHS;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
    name: IconName;
    size?: number;
    strokeWidth?: number;
}

// TODO: move size, strokeWidth default params out to styling layer
export function Icon({name, size = 16, strokeWidth = 2, ...rest}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...rest}>
            <path d={PATHS[name]} />
        </svg>
    );
}

export function IconGallery({size = 24}) {
    const iconNames = Object.keys(PATHS) as IconName[];

    return (
        <div className={DesignLayer.classes.iconGalleryGrid}>
            {iconNames.map((name) => (
                <div key={name} className={DesignLayer.classes.iconOutlineBox}>
                    <Icon name={name} size={size} />
                    <div className={DesignLayer.classes.source}>{name}</div>
                </div>
            ))}
        </div>
    );
}
