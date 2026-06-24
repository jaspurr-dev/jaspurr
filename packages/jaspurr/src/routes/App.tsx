import '@styles/App.css';
import {compositionAtom, outputSelectAtom, previewAtom} from '@/state/atoms';
import {useAtomValue, useSetAtom} from 'jotai';
import {Dropdown} from '@/components/Dropdown';
import {Persona, type Output} from '@/core/template';
import {OUTPUT_LABEL, PERSONA_LABEL} from '@/core/content';
import {CopyButton} from '@/components/CopyButton';

export function App() {
    return (
        <div className="app">
            <HierarchyPane />
            <PreviewPane />
            <DetailsPane />
        </div>
    );
}

function HierarchyPane() {
    return (
        <section className="hierarchy pane" aria-label="Template hierarchy">
            <div className="hierarchy__inner">
                <Dropdown<Persona>
                    label="Template"
                    value={Persona.TechPm}
                    options={PERSONA_LABEL}
                    onChange={(template) => {
                        alert(`${template} not implemented!`);
                    }}
                    disabled={true}
                />
            </div>
        </section>
    );
}

function PreviewPane() {
    const preview = useAtomValue(previewAtom);
    return (
        <main className="preview pane" aria-label="Live preview">
            <header className="preview__bar">
                <h2 className="label-caps">Live Preview</h2>
                <CopyButton />
            </header>
            <pre className="preview__text">{preview}</pre>
        </main>
    );
}

function DetailFields() {
    const output = useAtomValue(outputSelectAtom);
    const dispatch = useSetAtom(compositionAtom);
    const steps = [
        'Analyze the requirements.',
        'Identify dependencies.',
        'Structure tasks weighted by priority.',
    ];
    return (
        <fieldset>
            <h2 className={'label-caps'}>Details</h2>

            <Dropdown<Persona>
                label="Persona"
                value={Persona.TechPm}
                options={PERSONA_LABEL}
                onChange={(persona) => {
                    alert(`${persona} not implemented!`);
                }}
                disabled={true}
            />

            <fieldset>
                <legend className="label-normal">Steps:</legend>
                <ol className="steps">
                    {steps.map((step, i) => (
                        <li key={i} className="step">
                            {step}
                        </li>
                    ))}
                </ol>
            </fieldset>

            <Dropdown<Output>
                label="Output"
                value={output}
                options={OUTPUT_LABEL}
                onChange={(format) => {
                    dispatch({type: 'setOutput', format});
                }}
            />
        </fieldset>
    );
}

function DetailsPane() {
    return (
        <form
            className="details pane"
            aria-label="Details"
            onSubmit={(e) => {
                e.preventDefault();
            }}>
            <DetailFields></DetailFields>
        </form>
    );
}
