import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import logo from "../public/images/download (3).png"
import Image from 'next/image';

export default function Layout({ title, children }) {

    const { status, data: session } = useSession()

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    const logoutHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    };

    return (
        <>
            <Head>
                <title>{title ? title + "-Amazon" : "Amazon"}</title>
                <meta name="description" content="Ecommercr Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position="bottom-center" limit={1} />
            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='flex h-12 items-center px-4 justify-between shadow-md '>
                        <Link href="/">
                            {/* <a className='text-lg font-bold'>amazon</a> */}
                            {/* <img src={logo} alt="logo" /> */}
                            <Image
                                src={logo}
                                alt="logo"
                                width={120}
                                height={40}
                                style={{ cursor: "pointer" }}
                            // layout="responsive"
                            >
                            </Image>
                        </Link>
                        <div>
                            <Link href="/cart">
                                <a className='p-2'>Cart
                                    {cartItemsCount > 0 && (
                                        <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </a>
                            </Link>
                            {status === 'loading' ? (
                                'Loading'
                            ) : session?.user ? (
                                <Menu as="div" className="relative inline-block">
                                    <Menu.Button className="text-blue-600">
                                        {session.user.name}
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link flex p-2 hover:bg-grey-200" href="/profile">Profie</DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link flex p-2 hover:bg-grey-200" href="/order-history">Order History</DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a href="#" className='dropdown-link flex p-2 hover:bg-grey-200' onClick={logoutHandler}>
                                                Logout
                                            </a>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <Link href="/login">
                                    <a className="p-2">Login</a>
                                </Link>
                            )}
                            {/* <a className='p-2'>Login</a></Link> */}
                        </div>
                    </nav>
                </header >
                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>
                <footer className='flex justify-center items-center h-10 shadow-inner z-index-9999'>
                    <p>Copyright © 2022</p>
                </footer>
            </div >
        </>
    )
}
