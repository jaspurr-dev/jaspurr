import type {ReactNode} from 'react';
import {Link} from 'react-router';
import {useSetAtom} from 'jotai';
import {restartFlowAtom} from '@/state/flow';
import {opensNewContext} from '@/util/link';

interface StartBuildLinkProps {
    className?: string | undefined;
    children: ReactNode;
}

/* A call to action that ENTERS the flow, as opposed to a link that resumes it.
Taking one always starts a new template: the draft is dropped so /build opens on
the role picker. The atoms outlive the route, so without this a visitor who
finished a template and came back to the landing page would press "Build your
template" and land straight back on their old result. */
export function StartBuildLink({className, children}: StartBuildLinkProps) {
    const restart = useSetAtom(restartFlowAtom);
    return (
        <Link
            to="/build"
            className={className}
            onClick={(event) => {
                // A modified click opens /build in a new tab, which boots its
                // own store at the role picker; this tab keeps its draft.
                if (opensNewContext(event)) return;
                restart();
            }}>
            {children}
        </Link>
    );
}
