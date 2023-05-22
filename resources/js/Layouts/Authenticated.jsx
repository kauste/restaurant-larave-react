import React, {  useContext, useEffect, useRef, useState } from 'react';
import ApplicationLogo from '@/components/inertiaComponents/ApplicationLogo';
import Dropdown from '@/components/inertiaComponents/Dropdown';
import Message from '@/components/Message';
import NavLink from '@/components/inertiaComponents/NavLink';
import ResponsiveNavLink from '@/components/inertiaComponents/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import AreYouSureModal from "@/components/AreYouSureModal";
import ConfirmCartModal from '@/components/frontOffice/cart/ConfirmCartModal';
import EditContactInfoModal from '@/components/frontOffice/order/EditContactInfoModal';
import Footer from '@/components/Footer';
import Contexts from '@/components/Contexts';

export default function Authenticated({ auth, header, children, modalInfo, setModalInfo, fromCart, fromRestaurantDishes, forOrders}) {
    
    const {message, setMessage} = useContext(Contexts.FrontContext);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [navLinkStyle, setNavLinkStyle] = useState('');
    const [navDOM, setNavDOM] = useState(null);
    const navRef = useRef();
    
    useEffect(() => {
        setNavDOM(navRef.current)
        setNavLinkStyle(fromCart || fromRestaurantDishes ? 'darker' : '')
    }, [])
    

    useEffect(() => {
        if(message !== null){
           const messageSet =  setTimeout(()=> {
                setMessage(null)
                }, 20000)
            return () => {
                clearTimeout(messageSet);
            }
        }
    }, [message])

    return (
            <div className="authentificated-layout" >
                            <EditContactInfoModal></EditContactInfoModal>
                            <AreYouSureModal modalInfo={modalInfo} setModalInfo={setModalInfo}></AreYouSureModal>
                            <ConfirmCartModal></ConfirmCartModal>
                <nav ref={navRef}>
                    <div className='nav-box'>
                            <div className="flex items-center">
                                <div className="shrink-0 flex items-center">
                                    <Link className="logo-box" href="/" style={{background: fromCart || fromRestaurantDishes ? '#2E2E2E' : '' }}>
                                        <ApplicationLogo className="block nav-logo text-gray-500"  />
                                    </Link>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex nav-main-name">
                                    <NavLink href={route('user-restaurants')} active={route().current('user-restaurants')}>
                                        Food lovers
                                    </NavLink>
                                </div>
                            </div>
                            <div className="hidden lg:flex lg:items-center lg:ml-6 nav-right-block">
                            {/* PRADZIA */}
                                <div className={'relative nav-dropdown ' + navLinkStyle}>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button type="button" className=" flex items-center transition ease-in-out duration-150">
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
                                <div className={'nav-cart-link-box ' + navLinkStyle}>
                                        <Link href={route('show-cart')} className="nav-cart-link ">Show cart</Link>
                                </div>
                                <div className={'nav-cart-link-box ' + navLinkStyle}>
                                    <div className="">
                                        <Link href={route('show-orders')} className="nav-cart-link ">Show orders</Link>
                                    </div>
                                </div>
                                {/* PABAIGA */}
                                <div className={'relative nav-dropdown ' + navLinkStyle}>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button type="button"className=" flex items-center transition ease-in-out duration-150">
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

                            <div className="-mr-2 flex items-center lg:hidden">
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
                    <Message message={message} navDOM={navDOM}></Message>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main className={ forOrders ? 'main-for-children flex justify-center orders-main' : 'main-for-children flex justify-center' } style={{background: fromCart || fromRestaurantDishes ? ' radial-gradient(#2E2E2E 2px, #fff 2px) 0 0 / 50px 50px' : '' }}>
                    {children}
                </main>
                <Footer></Footer>
            </div>
    );
}
