import {useSetAtom} from 'jotai';
import {copyAtom} from '@/state/atoms';

export function CopyButton() {
    const copy = useSetAtom(copyAtom);

    const onCopy = async () => {
        try {
            const text = await copy();
            alert(text);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    void onCopy();
                }}>
                <i aria-hidden="true"></i>Copy
            </button>
        </>
    );
}
