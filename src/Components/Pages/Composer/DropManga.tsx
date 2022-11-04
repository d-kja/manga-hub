import React, { useEffect, useState } from "react"
import * as AlertDialog from "@radix-ui/react-alert-dialog"

import {
  deleteDoc,
  getDocs,
  collection,
  doc,
} from "firebase/firestore"
import { db } from "../../../firebase.config"

import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

// Styling
import { toast } from "react-toastify"
import { TrashSimple } from "phosphor-react"

interface DropMangaProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  handleChange: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
  errors: FieldErrorsImpl<{
    [x: string]: any
  }>
}

export default function DropManga({
  handleSubmit,
  handleChange,
  register,
  errors,
}: DropMangaProps) {
  const [mangas, setMangas] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp: any[] = []
        const mangasSnap = await getDocs(
          collection(db, "mangas")
        )

        if (mangasSnap) {
          mangasSnap.forEach((item) =>
            temp.push({
              id: item.id,
              data: item.data(),
            })
          )
        }

        setMangas(temp)
        console.log(temp)
      } catch (error) {
        toast.error(
          "Couldn't fill up 'select manga' options with firebase data, for more info use console",
          { theme: "dark" }
        )
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const handleFormDrop = async (data: any) => {
    console.log("updated values", data)

    try {
      await deleteDoc(doc(db, "mangas", data))
      toast.success("Item deleted!", { theme: "dark" })
      setMangas((prev) =>
        prev.filter((item) => item.id !== data)
      )
    } catch (error) {
      toast.error("Something went wrong", { theme: "dark" })
      console.error(error)
    }
  }

  return (
    <div
      // onSubmit={handleSubmit(handleFormDrop)}
      className="my-6 flex flex-col gap-6"
    >
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-base-300/75 rounded-t ">
            <tr className="w-full">
              {/* <th scope="col" className="py-3 px-6">
                #
              </th> */}
              <th scope="col" className="py-3 px-6 mr-auto">
                Manga name
              </th>
              <th scope="col" className="py-3 text-center">
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {mangas.map((item, idx) => (
              <tr
                className="border-b dark:border-base-300"
                key={item.id}
              >
                <td className="py-4 px-6 mr-auto">
                  {item.data.name}
                </td>
                <td className="py-4 text-center">
                  <AlertDialog.Root>
                    <AlertDialog.Trigger
                      type="button"
                      className="btn btn-square btn-primary"
                    >
                      <TrashSimple size={24} />
                    </AlertDialog.Trigger>

                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="fixed inset-0 bg-black/25" />
                      <AlertDialog.Content className="fixed max-w-lg w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-base-100 px-6 py-4 rounded-lg">
                        <AlertDialog.Title className="font-extrabold text-lg flex items-center">
                          Confirm action
                          <span className="font-extralight text-xs ml-auto">
                            ID - {item.id}
                          </span>
                        </AlertDialog.Title>
                        <div className="font-normal text-md my-2">
                          Are you sure you wanna delete{" "}
                          <span className="text-primary italic">
                            {item.data.name}
                          </span>
                          ?
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                          <AlertDialog.Cancel className="btn btn-ghost flex-1">
                            Cancel
                          </AlertDialog.Cancel>
                          <AlertDialog.Action
                            onClick={() => {
                              handleFormDrop(item.id)
                            }}
                            className="btn btn-primary flex-1"
                          >
                            Confirm
                          </AlertDialog.Action>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
