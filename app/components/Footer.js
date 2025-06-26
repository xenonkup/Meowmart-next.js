import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLine, FaTwitter } from "react-icons/fa";

export default function Footer() {

    const activateLink = (isActivete) => {
        return isActivete
            ? "text-orange-500 "
            : "hover:text-orange-500 cursor-pointer";
    }

    return (
        <>
            <footer className='bg-[#F5F5F5] py-8'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                    {/* Main Footer Content */}
                    <div className='gird gird-cols-1 grid md:grid-cols-4 gap-8'>
                        {/* Logo Section */}
                        <div className='flex flex-col items-center md:items-start'>
                            <Link href="/">
                                <Image
                                    src="/assets/logo/LogoMeowMart.png"
                                    alt="MeowMart Logo"
                                    width={80}
                                    height={80}
                                    className='object-contain'
                                    style={{ width: "auto", height: "auto" }}
                                />
                            </Link>
                            <p className='text-gray-600 text-sm mt-2'>
                                Your trusted pet supplies store
                            </p>
                        </div>

                        {/* Menu Section */}
                        <div className='flex flex-col items-center md:items-start'>
                            <h3 className='font-semibold text-lg mb-4 text-[#027373]'>Menu</h3>
                            <ul className='font-medium text-center md:text-start'>
                                <li className='mb-2'>
                                    <Link href="#" className={activateLink()}>Home</Link>
                                </li>
                                <li className='mb-2'>
                                    <Link href="#" className={activateLink()}>Products</Link>
                                </li>
                                <li className='mb-2'>
                                    <Link href="#" className={activateLink()}>Cart Products</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Blog Section */}
                        <div className='flex flex-col items-center md:items-start'>
                            <h3 className='font-semibold text-lg mb-4 text-[#027373]'>Blog</h3>
                            <ul className='font-medium text-center md:text-start'>
                                <li>
                                    <Link href="#" className={activateLink()}>Blog Post</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Social */}
                        <div className='flex flex-col items-center md:items-start'>
                            <h3 className='font-semibold text-lg mb-4 text-[#027373]'>Contact</h3>
                            <ul className='flex flex-row md:justify-center space-x-6 text-2xl text-[#027373]'>
                                <li>
                                    <Link href="#" className='hover:text-[#025959] transition-colors duration-200'>
                                        <FaFacebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className='hover:text-[#025959] transition-colors duration-200'>
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className='hover:text-[#025959] transition-colors duration-200'>
                                        <FaLine />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className='hover:text-[#025959] transition-colors duration-200'>
                                        <FaTwitter />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section Bottom */}
                    <div className='text-center mt-8 text-gray-600 border-t'>
                        <p className='mt-8'>
                            &#169; {`${new Date().getFullYear()} - MeowMart. All rights reserved`}
                        </p>
                    </div>

                </div>
            </footer>
        </>
    )
}
