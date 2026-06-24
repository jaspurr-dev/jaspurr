import '@styles/App.css';
import {compositionAtom, outputSelectAtom, previewAtom} from '@/state/atoms';
import {useAtomValue, useSetAtom} from 'jotai';
import {Dropdown} from '@/components/Dropdown';
import type {Output} from '@/core/template';
import {OUTPUT_LABEL} from '@/core/content';

export function App() {
    return (
        <div className="app">
            <HierarchyPane />
            <PreviewPane />
            <DetailsPane />
        </div>
    );
}

function copy() {
    alert('copy to clipboard not implemented!');
}

function HierarchyPane() {
    return (
        <section className="hierarchy pane" aria-label="Template hierarchy">
            <div className="hierarchy__inner">
                <label className="label-caps" htmlFor="tmpl">
                    <h2 className="label-caps">Template</h2>
                </label>
                <select id="tmpl dropdown" className="dropdown">
                    <option value="tech-pm-a">Tech PM</option>
                </select>
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
                <button
                    type="button"
                    className="copy-btn"
                    aria-label="Copy to clipboard"
                    onClick={copy}>
                    Copy
                </button>
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

            <label className="label-normal" htmlFor="persona">
                Persona:
            </label>
            <select id="persona" className="dropdown">
                <option value="task-list">Technical PM</option>
            </select>

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
