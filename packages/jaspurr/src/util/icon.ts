import type {IconName} from '@/components/icons/Icon';
import type {Category} from '@/core/template';

export function categoryToIconName(c: Category): IconName {
    switch (c) {
        case 'code':
            return 'code';
        case 'design':
            return 'brush';
        case 'strategy':
            return 'target';
    }
}
