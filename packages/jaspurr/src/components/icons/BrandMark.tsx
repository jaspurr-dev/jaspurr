// This is super placeholder and will likely be replaced with something else for branding.
export function BrandMark({width = 28, height = 28}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 28 28"
            role="img"
            aria-label="Templates">
            <rect width={width} height={height} rx="8" fill="var(--raised)" />
            <path
                d="M9 9l6 6-6 6"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x="7"
                y="22"
                width="12"
                height="2"
                rx="1"
                fill="var(--accent)"
            />
        </svg>
    );
}
