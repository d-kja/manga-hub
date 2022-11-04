import React, { useEffect, useState } from "react"

import { v4 as uuid } from "uuid"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import Spinner from "./Spinner"

import { getAuth } from "firebase/auth"
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "../../firebase.config"

import { useCurrentAuth } from "../../Hooks/useCurrentAuth"
import { Wind } from "phosphor-react"

interface DataType {
  name: string
  img: string
  id: string
}

export default function UpdatesNotification() {
  const [data, setData] = useState<DataType[]>([])

  const { isLoading, isLogged } = useCurrentAuth()
  const auth = getAuth()

  useEffect(() => {
    if (!isLoading && isLogged) fetchUpdates()

    async function fetchUpdates() {
      try {
        if (!auth.currentUser)
          throw new Error("User not found")

        const bookmarkRef = collection(db, "bookmarks")
        const q = query(
          bookmarkRef,
          where("userRef", "==", auth.currentUser.uid)
        )
        const docSnap = await getDocs(q)
        const temp: DataType[] = []

        if (docSnap) {
          docSnap.forEach((item) => {
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
          setData(temp.reverse().slice(0, 3))
        }
      } catch (error) {
        console.log(error)
      }
    }

    // eslint-disable-next-line
  }, [isLoading, isLogged])

  return isLoading ? (
    <Spinner />
  ) : (
    <DropdownMenu.Item className="flex flex-col gap-2 outline-none">
      {data.length > 0 ? (
        // Give it a limit
        data.map((item) => (
          <a
            key={uuid()}
            href={`/mangas/${item.id}`}
            className="flex flex-row gap-4 hover:bg-base-300 p-4 rounded-lg transition-colors w-full"
          >
            <img
              src={item.img}
              alt="manga banner"
              className="w-16 h-20 rounded ring-primary ring-1 ring-offset-2 ring-offset-base-300 object-cover"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold text-base-content/75">
                {item.name}
              </p>
              <span className="text-sm font-semibold uppercase">
                Has a new update!
              </span>
            </div>
          </a>
        ))
      ) : (
        <DropdownMenu.Item className="p-4 rounded-lg text-base-content font-medium flex gap-2 items-center justify-center opacity-25">
          Empty <Wind size={24} weight="regular" />
        </DropdownMenu.Item>
      )}
    </DropdownMenu.Item>
  )
}
