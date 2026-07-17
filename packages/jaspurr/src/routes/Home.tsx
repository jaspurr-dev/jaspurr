import {BeforeAfter} from '@/components/landing/BeforeAfter';
import {Hero} from '@components/landing/Hero';

/* The landing page. The role
grid and how-it-works sections land in later PRs. */
export function RouteHome() {
    return (
        <>
            <Hero />
            <BeforeAfter></BeforeAfter>
        </>
    );
}
