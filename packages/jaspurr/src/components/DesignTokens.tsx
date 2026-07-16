import {DesignLayer} from '@/styles/core.styles';
import {Icon, IconGallery} from '@components/icons/Icon';
import {IconTile} from '@components/icons/IconTile';
import {PrimaryButton} from '@components/buttons/PrimaryButton';
import {Badge, BadgeIcon} from '@components/icons/Badge';
import {BrandMark} from '@components/icons/BrandMark';
import {IconButton} from '@components/buttons/IconButton';
import {Chip} from '@components/buttons/Chip';
import {SearchField} from '@components/input/SearchField';
import {NavItem} from '@components/navigation/NavItem';
import {StepList} from '@components/list/StepList';
import {OutlineBox} from '@/primitives';

export default function DesignTokens() {
    return (
        <div style={{padding: 24, display: 'grid', gap: 24, maxWidth: 520}}>
            <div className={DesignLayer.classes.title}>Text</div>

            {/* Text hierarchy */}
            <OutlineBox style={{gap: 6}}>
                <div className={DesignLayer.classes.title}>
                    text-title · Title
                </div>
                <div className={DesignLayer.classes.hero}>
                    text-strong · Hero Title
                </div>
                <div className={DesignLayer.classes.name}>text · name</div>
                <div className={DesignLayer.classes.nameSmall}>
                    text-small · name
                </div>
                <div className={DesignLayer.classes.section}>
                    text-section · section
                </div>
                <div className={DesignLayer.classes.step}>
                    text-step · 1. step{' '}
                </div>
                <div className={DesignLayer.classes.nav}>
                    text-nav · nav content{' '}
                </div>
                <div className={DesignLayer.classes.button}>
                    text-btn · Use{' '}
                </div>
                <div className={DesignLayer.classes.label}>
                    text-label · Small Label
                </div>
                <div className={DesignLayer.classes.meta}>
                    text-meta · byline metadata
                </div>
                <div className={DesignLayer.classes.numeral}>
                    text-numeral · 12345
                </div>
                <div className={DesignLayer.classes.source}>
                    text-source · # this is some text
                </div>
            </OutlineBox>

            <div className={DesignLayer.classes.title}>Fonts</div>
            {/* Fonts — confirm both families actually loaded */}
            <OutlineBox>
                <div
                    style={{
                        font: `400 15px var(${DesignLayer.fonts.fontSans})`,
                    }}>
                    System Sans 400 — the quick brown fox
                </div>
                <div
                    style={{
                        font: `500 15px var(${DesignLayer.fonts.fontSans})`,
                    }}>
                    System Sans 500 — the quick brown fox
                </div>
                <div
                    style={{
                        font: `400 15px var(${DesignLayer.fonts.fontMono})`,
                    }}>
                    {'UI Mono 400 — 0123 {}'}
                </div>
            </OutlineBox>

            <div className={DesignLayer.classes.title}>Components</div>
            {/* Accent + the one action */}
            <OutlineBox>
                <div className={DesignLayer.classes.section}>Icons</div>
                <IconTile name="check"></IconTile>

                <Badge></Badge>
                <Badge children={<BadgeIcon name="code"></BadgeIcon>}></Badge>

                <div
                    style={{
                        display: 'flex',
                        gap: 8,
                        maxWidth: 520,
                    }}>
                    <BrandMark></BrandMark>
                    <BrandMark width={48} height={48}></BrandMark>
                    <BrandMark width={64} height={64}></BrandMark>
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: 8,
                        maxWidth: 520,
                    }}>
                    <IconButton icon="back" label="back"></IconButton>
                    <IconButton icon="dots" label="options"></IconButton>
                    <IconButton icon="search" label="search"></IconButton>
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: 8,
                        maxWidth: 520,
                    }}>
                    <Chip children={<>All</>}></Chip>
                    <Chip children={<>Code</>}></Chip>
                    <Chip children={<>Design</>}></Chip>
                    <Chip children={<>Strategy</>}></Chip>
                </div>

                <span
                    className={DesignLayer.classes.badge}
                    aria-label="Verified">
                    <Icon name="check" size={11} strokeWidth={2} />
                </span>

                <div className={DesignLayer.classes.section}>Buttons</div>

                <button className={DesignLayer.classes.button}>
                    <Icon name="play" size={16} strokeWidth={2} /> Default
                    Button
                </button>

                <PrimaryButton label="Use"></PrimaryButton>
                <PrimaryButton label="Disabled Button" disabled></PrimaryButton>

                <SearchField></SearchField>

                <div
                    style={{
                        display: 'flex',
                        gap: 8,
                        maxWidth: 520,
                    }}>
                    <NavItem icon="home" children={<>Home</>}></NavItem>
                    <NavItem icon="code" children={<>Code</>}></NavItem>
                    <NavItem icon="brush" children={<>Design</>}></NavItem>
                    <NavItem icon="target" children={<>Strategy</>}></NavItem>
                </div>

                <StepList
                    steps={[
                        'Ship + when',
                        'Constraints',
                        'Happy path',
                    ]}></StepList>

                <StepList
                    variant="preview"
                    steps={[
                        'Ship + when',
                        'Constraints',
                        'Happy path',
                    ]}></StepList>

                <span
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: `var(--${DesignLayer.colors.accent})`,
                    }}
                />
                <span style={{color: `var(--${DesignLayer.colors.accent}`}}>
                    accent link
                </span>
            </OutlineBox>

            <div className={DesignLayer.classes.title}>Icons</div>
            <div>
                <IconGallery></IconGallery>
            </div>
        </div>
    );
}
