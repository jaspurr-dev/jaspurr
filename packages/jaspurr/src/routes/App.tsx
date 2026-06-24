import '@styles/App.css';

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
        <section className="hierarchy-pane" aria-label="Template hierarchy">
            <label className="label-caps" htmlFor="tmpl">
                Template
            </label>
            <select id="tmpl">
                <option value="tech-pm-a">Tech PM</option>
            </select>
        </section>
    );
}

function PreviewPane() {
    return (
        <main className="preview-pane" aria-label="Live preview">
            <header className="preview-bar">
                <h2 className="label-caps">Live preview</h2>
                <button
                    type="button"
                    className="copy-btn"
                    aria-label="Copy to clipboard"
                    onClick={copy}>
                    Copy
                </button>
            </header>
            <pre className="preview-text">Preview Text</pre>
        </main>
    );
}

function DetailFields() {
    return (
        <fieldset>
            <legend className="label-caps">output</legend>
            <label htmlFor="output">Output</label>
            <select id="output">
                <option value="task-list">Prioritized task list</option>
            </select>
        </fieldset>
    );
}

function DetailsPane() {
    return (
        <form
            className="details-pane"
            aria-label="Details"
            onSubmit={(e) => {
                e.preventDefault();
            }}>
            <DetailFields></DetailFields>
        </form>
    );
}
