import type {InputHTMLAttributes} from 'react';
import {Icon} from '@components/icons/Icon';

type SearchFieldProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchField({
    placeholder = 'Search templates',
    ...rest
}: SearchFieldProps) {
    return (
        <div className="search">
            <Icon name="search" />
            <input type="search" placeholder={placeholder} {...rest} />
        </div>
    );
}
