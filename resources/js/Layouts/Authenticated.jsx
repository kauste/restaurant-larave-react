import React, {  useState } from 'react';
import ApplicationLogo from '@/components/inertiaComponents/ApplicationLogo';
import Dropdown from '@/components/inertiaComponents/Dropdown';
import Message from '@/components/Message';
import NavLink from '@/components/inertiaComponents/NavLink';
import ResponsiveNavLink from '@/components/inertiaComponents/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import AreYouSureModal from "@/components/AreYouSureModal";
import ConfirmCartModal from '@/components/frontOffice/cart/ConfirmCartModal';
import EditContactInfoModal from '@/components/frontOffice/order/EditContactInfoModal';

export default function Authenticated({ auth, header, message, children, modalInfo, setModalInfo, comfirmModalInfo, setComfirmModalInfo, changeContactOrder, setChangeContactOrder, cart, thisRestaurant, setNewCart, setContactInfo}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100 authentificated-layout">
                        <EditContactInfoModal  changeContactOrder={changeContactOrder} setChangeContactOrder={setChangeContactOrder} setContactInfo={setContactInfo}></EditContactInfoModal>
                        <AreYouSureModal modalInfo={modalInfo} setModalInfo={setModalInfo}></AreYouSureModal>
                        <ConfirmCartModal comfirmModalInfo={comfirmModalInfo} setComfirmModalInfo={setComfirmModalInfo} cart={cart} setNewCart={setNewCart}></ConfirmCartModal>
            <nav>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-24 items-center">
                        <div className="flex items-center">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block nav-logo text-gray-500" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('user-restaurants')} active={route().current('user-restaurants')}>
                                    Food lovers
                                </NavLink>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                        {/* PRADZIA */}
                            <div className="relative nav-dropdown">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="h-24 flex items-center transition ease-in-out duration-150">
                                                Services
                                                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('user-restaurants')} method="get" as="button">
                                            Restaurants
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('user-dishes')} method="get" as="button">
                                            Dishes
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <div className="nav-cart-link-box">
                                <div className="h-24">
                                    <Link href={route('show-cart')} className="nav-cart-link">Show cart</Link>
                                </div>
                            </div>
                            <div className="nav-cart-link-box">
                                <div className="h-24">
                                    <Link href={route('show-orders')} className="nav-cart-link">Show orders</Link>
                                </div>
                            </div>
                            {/* PABAIGA */}
                            <div className="relative nav-dropdown ">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button"className="h-24 flex items-center transition ease-in-out duration-150">
                                                {auth.user.name}
                                                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
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
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
                <Message message={message}></Message>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>
                {children}
            </main>
        </div>
    );
}
