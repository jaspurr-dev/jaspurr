import {Text} from '@/primitives';
import {Card} from '@/components/card/Card';

export function Privacy() {
    return (
        <div>
            <Card>
                <Text>
                    We strongly believe in a privacy-first design that respects
                    the user.
                </Text>
                <Text>
                    We favor a local-first design where you don't need an
                    account to use the tool, we don't store cookies, and your
                    data only lives locally in browser storage.
                </Text>
                <Text>
                    We use anonymous, cookieless-based analytics. We use these
                    analytics to understand generalized usage of the tool and
                    only track page visits and anonymized events.
                </Text>
            </Card>
        </div>
    );
}
