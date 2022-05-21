import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";

export default function UserIcon({ isLogged }) {
    const auth = getAuth();
    return (
        <div className="top-16 text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-2xl font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 btn btn-ghost">
                        {/* <Avatar alt="User icon" src="" /> */}
                        <MoreVertIcon sx={{ fontSize: 20 }} />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-800 rounded-md bg-neutral shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {isLogged && auth.currentUser != null ? (
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/options"
                                            className={`${
                                                active
                                                    ? "bg-primary text-white"
                                                    : "text-gray-200"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-2xl`}
                                        >
                                            <SettingsIcon
                                                className="mr-2 h-7 w-7"
                                                aria-hidden="true"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10 4H16V10"
                                                    stroke="#DA0037"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M16 4L8 12"
                                                    stroke="#DA0037"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M8 6H4V16H14V12"
                                                    stroke="#DA0037"
                                                    strokeWidth="2"
                                                />
                                            </SettingsIcon>
                                            Options
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/logOut"
                                            className={`${
                                                active
                                                    ? "bg-primary text-white"
                                                    : "text-gray-200"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-2xl`}
                                        >
                                            <LogoutIcon
                                                className="mr-2 h-7 w-7"
                                                aria-hidden="true"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10 4H16V10"
                                                    stroke="#DA0037"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M16 4L8 12"
                                                    stroke="#DA0037"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M8 6H4V16H14V12"
                                                    stroke="#DA0037"
                                                    strokeWidth="2"
                                                />
                                            </LogoutIcon>
                                            LogOut
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                        ) : (
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/signIn"
                                            className={`${
                                                active
                                                    ? "bg-primary text-white"
                                                    : "text-gray-200"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-2xl`}
                                        >
                                            <PersonIcon
                                                className="mr-2 h-7 w-7"
                                                aria-hidden="true"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4 13V16H7L16 7L13 4L4 13Z"
                                                    fill="#DA0037"
                                                    stroke="#C4B5FD"
                                                    strokeWidth="2"
                                                />
                                            </PersonIcon>
                                            Login
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
