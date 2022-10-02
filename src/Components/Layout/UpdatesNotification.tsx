import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react"

import Spinner from "./Spinner"
import { Popover, Transition } from "@headlessui/react"
import { FaBell } from "react-icons/fa"

import { getAuth } from "firebase/auth"
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "../../firebase.config"

import { useCurrentAuth } from "../../Hooks/useCurrentAuth"

interface DataType {
  name: string
  img: string
  id: string
}

export default function UpdatesNotification() {
  // eslint-disable-next-line
  const [data, setData] = useState<DataType[]>([])
  const isMounted = useRef(true)

  const { isLoading, isLogged } = useCurrentAuth()
  const auth = getAuth()

  useEffect(() => {
    if (isMounted.current && !isLoading) {
      fetchUpdates()
    }

    async function fetchUpdates() {
      try {
        if (!auth.currentUser)
          throw new Error("User not found")
        const collectionRef = collection(db, "bookmarks")
        const q = query(
          collectionRef,
          where("userRef", "==", auth.currentUser?.uid)
        )
        const docSnap = await getDocs(q)
        console.log(docSnap)

        const temp: DataType[] = []

        if (docSnap) {
          docSnap.forEach((item) => {
            console.log(item.id)
            const { updates } = item.data()
            updates.forEach(
              (manga: {
                id: string
                name: string
                imgUrl: string
              }) =>
                temp.push({
                  id: manga.id,
                  name: manga.name,
                  img: manga.imgUrl,
                })
            )
          })
          setData(temp)
        }
      } catch (error) {
        console.log(error)
      }
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted, auth.currentUser, isLoading])

  console.log(data)

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="fixed top-28 left-5 w-28 max-w-lg px-4">
      <Popover className="relative">
        {({ open }: { open: boolean }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-full btn-primary btn-outline border p-4 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>
                {" "}
                <FaBell size={14} />{" "}
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl`}
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-[75vh]">
                  <div className="relative grid gap-8 bg-base-100 p-7 lg:grid-cols-2">
                    {data.length > 0
                      ? data.map((item) => (
                          <a
                            key={item.name}
                            href={item.id}
                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-50 group"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                              <img
                                src={item.img}
                                alt="manga banner"
                                className="max-w-[34px]"
                              />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-white">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500 ">
                                Has a new update!
                              </p>
                            </div>
                          </a>
                        ))
                      : "No updates"}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
