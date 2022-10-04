import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
// import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Link } from "react-router-dom"

import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { getAuth } from "firebase/auth"
import {
  SignIn,
  SignOut,
  User,
  UserCircle,
  UserPlus,
} from "phosphor-react"

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
          <Menu.Button className="inline-flex transition-colors w-full justify-center rounded-md px-4 py-2 text-base font-medium hover:bg-opacity-0 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 btn btn-ghost">
            <UserCircle weight="light" size={28} />
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
                          ? "bg-primary"
                          : "brightness-75"
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
                          ? "bg-primary"
                          : "brightness-75"
                      } group flex items-center gap-1 btn btn-ghost`}
                    >
                      <SignOut
                        className="h-5 w-5"
                        weight="fill"
                      />
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
                          ? "bg-primary"
                          : "brightness-75"
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
                          ? "bg-primary"
                          : "brightness-75"
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
