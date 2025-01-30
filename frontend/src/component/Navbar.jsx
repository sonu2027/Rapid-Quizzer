import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoutUser from "../databaseCall/logoutUser.js"

function Navbar({ calling }) {

    const navigate = useNavigate()

    const [item, setItem] = useState("upcoming-contest")

    const handleLogout = async (e) => {
        e.preventDefault()
        logoutUser()
            .then((res) => {
                if (!res.status) {
                    navigate("/")
                }
            })
            .catch((error) => {

            })
    }

    return (

        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://sonumondal.vercel.app/pp.jpg"
                                className="h-8 w-auto rounded-full"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <button onClick={() => { navigate("/home") }} className={`${calling === "upcomingcontest" ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}`}>Upcoming Contest</button>

                                <button onClick={() => { navigate("/pastcontest") }} className={`${calling === "pastcontest" ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}`}>Past Contest</button>

                                <button onClick={() => { navigate("/leaderboard") }} className={`${calling === "dashboard" ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}`}>Leaderboard</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://sonumondal.vercel.app/pp.jpg"
                                        className="size-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <button
                                        className="w-full text-start block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                    >
                                        Your Profile
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        className="w-full text-start block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                    >
                                        Settings
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        onClick={handleLogout}
                                        className=" block px-4 text-left w-full py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                    >
                                        Sign out
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <button onClick={() => { navigate("/home") }} className={`${calling === "upcomingcontest" ? "bg-gray-900 text-white rounded-md px-3 py-2 block  text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 block text-base font-medium"}`}>upcoming Contest</button>

                    <button onClick={() => { navigate("/pastcontest") }} className={`${calling === "pastcontest" ? "bg-gray-900 text-white rounded-md px-3 py-2 block  text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 block text-base font-medium"}`}>Past Contest</button>

                    <button onClick={() => { navigate("/leaderboard") }} className={`${calling === "dashboard" ? "bg-gray-900 text-white rounded-md px-3 py-2 block  text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 block text-base font-medium"}`}>Leaderboard</button>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}

export default Navbar