import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'nav-link transition duration-150 ease-in-out'
                    : 'nav-link transition duration-150 ease-in-out'
            }
        >
            {children}
        </Link>
    );
}
