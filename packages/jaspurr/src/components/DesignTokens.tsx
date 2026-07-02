export default function DesignTokens() {
    const swatch = (bgVarName: string, label: string) => (
        <div style={{textAlign: 'center'}}>
            <div
                style={{
                    width: 72,
                    height: 48,
                    borderRadius: 8,
                    background: `var(${bgVarName})`,
                    border: '1px solid var(--border)',
                }}
            />
            <div className="t-label" style={{marginTop: 6}}>
                {label}
            </div>
        </div>
    );
    return (
        <div style={{padding: 24, display: 'grid', gap: 24, maxWidth: 520}}>
            {/* Surface ladder — must step visibly lighter left → right */}
            <div style={{display: 'flex', gap: 12}}>
                {swatch('--bg', 'bg')}
                {swatch('--card', 'card')}
                {swatch('--raised', 'raised')}
                {swatch('--raised-active', 'active')}
            </div>

            {/* Text hierarchy — five distinct greys */}
            <div style={{display: 'grid', gap: 6}}>
                <div className="t-title">text-title · Title</div>
                <div className="t-hero">text-strong · Hero Title</div>
                <div className="t-name">text · name</div>
                <div className="t-name-sm">text-small · name</div>
                <div className="t-section">text-section · section</div>
                <div className="t-step">text-step · 1. step </div>
                <div className="t-nav">text-nav · nav content </div>
                <div className="t-btn">text-btn · Use </div>

                <div className="t-label">text-label · Small Label</div>
                <div className="t-meta">text-meta · byline metadata</div>
                <div className="t-numeral">text-numeral · 12345</div>
                <div className="t-source">
                    text-source · # this is some text
                </div>
            </div>

            {/* Fonts — confirm both families actually loaded */}
            <div style={{display: 'grid', gap: 4}}>
                <div style={{font: '400 15px var(--font-sans)'}}>
                    System Sans 400 — the quick brown fox
                </div>
                <div style={{font: '500 15px var(--font-sans)'}}>
                    System Sans 500 — the quick brown fox
                </div>
                <div style={{font: '400 15px var(--font-mono)'}}>
                    {'UI Mono 400 — 0123 {}'}
                </div>
            </div>

            {/* Accent + the one action */}
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <span
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: 'var(--accent)',
                    }}
                />
                <span style={{color: 'var(--accent)'}}>accent link</span>
                <span className="badge" role="img" aria-label="Verified"></span>
                <button className="btn-use"></button>
            </div>
        </div>
    );
}
