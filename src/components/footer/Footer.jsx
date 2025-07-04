import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'


function Footer() {
    return (
        <section className="relative overflow-hidden py-8 bg-gray-200 border border-black">
                <div className="relative z-10 mx-auto max-w-7xl px-2">
                    <div className="-m-6 flex flex-wrap">
                        <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                            <div className="flex h-full flex-col justify-between">
                                <div className="mb-4 inline-flex items-center">
                                    <Logo width='80px' />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        &copy; Copyright 2023. All Rights Reserved by DevUI.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
                                    Company
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base text-sm  text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Pricing
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base text-sm  text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Affiliate Program
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=" text-base text-sm  text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Press Kit
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-6  text-xs font-semibold uppercase text-gray-500">
                                    Support
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base text-sm  text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Account
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base text-sm  text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Help
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base text-sm  text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full p-4 md:w-1/2 lg:w-3/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-6  text-xs font-semibold uppercase text-gray-500">
                                    Legals
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base text-sm  text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Terms &amp; Conditions
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base text-sm  text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      )
}

export default Footer