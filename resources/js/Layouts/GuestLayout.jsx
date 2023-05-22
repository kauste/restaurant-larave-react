import React, { useState } from 'react';
import ApplicationLogo from '@/components/inertiaComponents/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import NavLink from '@/components/inertiaComponents/NavLink';
import ResponsiveNavLink from '@/components/inertiaComponents/ResponsiveNavLink';
import FooterGuest from '@/components/Guest/FooterGuest';

export default function GuestLayout({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="guest-layout">
            <nav>
                <div className="nav-box">
                    <div className="flex items-center">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block nav-logo text-gray-500" />
                            </Link>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex nav-main-name">
                            <NavLink href={route('user-restaurants')} active={route().current('user-restaurants')}>
                                Food lovers
                            </NavLink>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ml-6 nav-right-block">
                        {/* PRADZIA */}
                        <div className="nav-cart-link-box">
                            <Link href={route('user-restaurants')} className="nav-cart-link h-24">Restaurants</Link>
                        </div>
                        <div className="nav-cart-link-box">
                            <div className="h-24">
                                <Link href={route('user-dishes')} className="nav-cart-link h-24">Dishes</Link>
                            </div>
                        </div>
                        <div className="nav-cart-link-box">
                            <div className="h-24">
                                <Link href={route('login')} className="nav-cart-link h-24">Login</Link>
                            </div>
                        </div>
                        {/* PABAIGA */}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                </div>
                {/* <Message message={message} navDOM={navDOM}></Message> */}
            </nav>
            <div className="min-screen-height flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 main-for-children">
                {children}
            </div>
            <FooterGuest/>
        </div>
    );
}
