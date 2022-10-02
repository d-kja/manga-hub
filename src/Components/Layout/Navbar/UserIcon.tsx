import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
// import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Link } from "react-router-dom"

import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { getAuth } from "firebase/auth"
import { SignIn, User, UserPlus } from "phosphor-react"

interface UserIconProps {
  isLogged: boolean
}

type TMenuProps = {
  active: any
}

export default function UserIcon({
  isLogged,
}: UserIconProps) {
  const auth = getAuth()
  return (
    <div className="top-16 text-right">
      <Menu
        as="div"
        className="relative inline-block text-left"
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-base font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 btn btn-ghost">
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-800 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {isLogged && auth.currentUser != null ? (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }: TMenuProps) => (
                    <Link
                      to="/options"
                      className={`${
                        active
                          ? "bg-primary text-white"
                          : "text-gray-200"
                      } group flex items-center gap-1 btn btn-ghost`}
                    >
                      <User weight="fill" size={20} />
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: TMenuProps) => (
                    <Link
                      to="/logOut"
                      className={`${
                        active
                          ? "bg-primary text-white"
                          : "text-gray-200"
                      } group flex items-center gap-1 btn btn-ghost`}
                    >
                      <LogoutIcon
                        className="h-5 w-5"
                        aria-hidden="true"
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
                  {({ active }: TMenuProps) => (
                    <Link
                      to="/signIn"
                      className={`${
                        active
                          ? "bg-primary text-white"
                          : "text-gray-200"
                      } group flex items-center gap-1 btn btn-ghost`}
                    >
                      <SignIn weight="fill" size={20} />
                      Login
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: TMenuProps) => (
                    <Link
                      to="/signUp"
                      className={`${
                        active
                          ? "bg-primary text-white"
                          : "text-gray-200"
                      } group flex items-center gap-1 btn btn-ghost`}
                    >
                      <UserPlus weight="fill" size={20} />
                      Sign up
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
