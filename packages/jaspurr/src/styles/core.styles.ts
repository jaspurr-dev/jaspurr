const colorStyles = {
    bg: 'bg',
    card: 'card',
    raised: 'raised',
    raisedActive: 'raised-active',
    border: 'border',
    divider: 'divider',
    borderFocus: 'border-focus',
    text: 'text',
    textStrong: 'text-strong',
    textReading: 'text-reading',
    textSecondary: 'text-secondary',
    textMuted: 'text-muted',
    onPrimary: 'on-primary',
    accent: 'accent',
    primary: 'primary',
    primaryActive: 'primary-active',
    icon: 'icon',
    iconMuted: 'icon-muted',
} as const satisfies Record<string, string>;
export type Color = keyof typeof colorStyles;

const colorScheme = {
    dark: 'dark',
} as const satisfies Record<string, string>;
export type ColorScheme = keyof typeof colorScheme;

const radius = {
    tile: '--r-tile',
    tileLarge: '--r-tile-lg',
    card: '--r-card',
    button: '--r-button',
    input: '--r-input',
    pill: '--r-pill',
    sheet: '--r-sheet',
} as const satisfies Record<string, string>;
export type Radius = keyof typeof radius;

const spacing = {
    1: '--s-1',
    2: '--s-2',
    3: '--s-3',
    4: '--s-4',
    5: '--s-5',
    6: '--s-6',
    8: '--s-8',
} as const satisfies Record<string, string>;
export type Spacing = keyof typeof spacing;

const fonts = {
    fontSans: '--font-sans',
    fontMono: '--font-mono',
} as const satisfies Record<string, string>;
export type Fonts = keyof typeof fonts;

const txtPrefix = 't';
const badgePrefix = 'badge';
const buttonPrefix = 'btn';
const iconPrefix = 'icon';
const classes = {
    title: `${txtPrefix}-title`,
    hero: `${txtPrefix}-hero`,
    name: `${txtPrefix}-name`,
    nameSmall: `${txtPrefix}-name-sm`,
    section: `${txtPrefix}-section`,
    step: `${txtPrefix}-step`,
    nav: `${txtPrefix}-nav`,
    button: `btn`,
    navButton: `nav`,
    label: `${txtPrefix}-label`,
    meta: `${txtPrefix}-meta`,
    numeral: `${txtPrefix}-numeral`,
    source: `${txtPrefix}-source`,
    badge: `badge`,
    badgeLarge: `${badgePrefix}--lg`,
    buttonUse: `${buttonPrefix}-use`,
    iconGalleryGrid: `${iconPrefix}-gallery-grid`,
    iconOutlineBox: `${iconPrefix}-outline-box`,
    iconButton: `${iconPrefix}btn`,
} as const satisfies Record<string, string>;
export type Classes = keyof typeof classes;

export const DesignLayer = {
    colorSchema: colorScheme,
    colors: colorStyles,
    radius: radius,
    spacing: spacing,
    fonts: fonts,
    classes: classes,
} as const satisfies Record<string, object>;
