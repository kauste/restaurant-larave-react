import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, children }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
        >
            {children}
        </Link>
    );
}
