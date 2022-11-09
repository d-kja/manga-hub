import React, { useEffect, useState } from "react"

// utils
import { v4 } from "uuid"

// componets
import { motion } from "framer-motion"

import { getAuth } from "firebase/auth"
import {
  collection,
  doc,
  deleteField,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../../../firebase.config"

import { useCurrentAuth } from "../../../Hooks/useCurrentAuth"
import { NotificationItem } from "./NotificationItem"
import { toast } from "react-toastify"

interface DataType {
  name: string
  img: string
  id: string
}

export const Notifications = () => {
  const [data, setData] = useState<DataType[]>([])
  const [id, setId] = useState<string>("")

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
            setId(item.id)
            const { updates } = item.data()
            if (updates)
              updates.forEach(
                (manga: {
                  id: string
                  name: string
                  imgUrl: string
                }) =>
                  temp.push({
                    id: manga?.id,
                    name: manga?.name,
                    img: manga?.imgUrl,
                  })
              )
          })

          if (temp && temp.length > 0)
            setData(temp.reverse())
        }
      } catch (error) {
        console.log(error)
      }
    }

    // eslint-disable-next-line
  }, [isLoading, isLogged])
  console.log(data)
  const handleDropNotifications = async (params: any) => {
    try {
      if (!auth.currentUser)
        throw new Error("User not found")

      if (id.length <= 0 || !(data && data.length > 0))
        throw new Error("Nothing to clear")

      const bookmarkRef = doc(db, "bookmarks", id)

      await updateDoc(bookmarkRef, {
        updates: deleteField(),
      })

      toast.success("Notifications cleared", {
        theme: "dark",
      })
      setData([])
    } catch (error: any) {
      const errorMessage =
        typeof error.message === "string"
          ? error.message
          : "Something went wrong"

      toast.error(errorMessage, { theme: "dark" })
      console.error(error)
    }
  }

  return isLoading ? (
    <></>
  ) : (
    <motion.div
      initial={{ y: 75, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        {
          type: "spring",
          stiffness: 100,
          ease: "easeIn",
          delay: 1.3,
        } as any
      }
      className="min-h-screen mb-12 mt-2"
    >
      <section className="w-full px-6 py-4 rounded-lg">
        <div className="bg-base-300 px-4 py-3 w-full flex items-center justify-center flex-row rounded-t-lg">
          <h2 className="font-bold text-xl uppercase">
            All notifications
          </h2>
          <button
            className="btn btn-xs md:btn-sm btn-primary ml-auto flex gap-2"
            onClick={handleDropNotifications}
          >
            Clear
            <span className="hidden md:inline-block">
              notifications
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-2 border-x-2 border-base-300 last:border-b-2 last:rounded-b-lg">
          {/**
           *  @todo add react virtualizer
           **/}
          {data.map((notification) => (
            <NotificationItem
              key={v4()}
              img={notification.img}
              name={notification.name}
              msg={`We've got a new ${notification.name.toLowerCase()} chapter for you, go check it out`}
              link={`/mangas/${notification.id}`}
            />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
