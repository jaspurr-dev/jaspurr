interface StepListProps {
    steps: string[];
    variant?: 'full' | 'preview';
}

export function StepList({steps, variant = 'full'}: StepListProps) {
    return (
        <ol
            className={
                variant === 'preview' ? 'steps steps--preview' : 'steps'
            }>
            {steps.map((step, i) => (
                <li key={i}>
                    <span className="steps__n">{i + 1}</span>
                    {step}
                </li>
            ))}
        </ol>
    );
}
