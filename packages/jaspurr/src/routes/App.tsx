import '@styles/App.css';

export function App() {
    return ThreePaneLayout();
}

function ThreePaneLayout() {
    return (
        <>
            <main className="composition-desktop">
                <h1>Foo!</h1>
            </main>
        </>
    );
}
