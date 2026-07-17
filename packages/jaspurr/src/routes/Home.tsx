import {BeforeAfter} from '@/components/landing/BeforeAfter';
import {HowItWorks} from '@/components/landing/HowItWorks';
import {RolesSection} from '@/components/landing/RolesSection';
import {Hero} from '@components/landing/Hero';

/* The landing page. The role
grid and how-it-works sections land in later PRs. */
export function RouteHome() {
    return (
        <>
            <Hero />
            <BeforeAfter />
            <RolesSection />
            <HowItWorks />
        </>
    );
}
