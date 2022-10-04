import React from "react"

import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form"

// Utils
import {
  serverTimestamp,
  updateDoc,
  getDocs,
  addDoc,
  collection,
  query,
  where,
  writeBatch,
  doc,
} from "firebase/firestore"
import { db } from "../../../firebase.config"
import { useUploadImage } from "../../../Hooks/useUploadImage"
import { toast } from "react-toastify"

// Types
interface ComposeMangaProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  register: UseFormRegister<FieldValues>
  errors: FieldErrorsImpl<{
    [x: string]: any
  }>
}

type TForm = {
  banner: File
  bannerSmall: File
}

export default function ComposeManga({
  errors,
  handleSubmit,
  register,
}: ComposeMangaProps) {
  const { upload } = useUploadImage()

  const handleFormCreate = async (data: any) => {
    const { banner, bannerSmall } = data as TForm

    console.log(data)
    return null

    // eslint-disable-next-line no-unreachable
    try {
      const bannerUrl = (await upload(
        banner,
        "mangas"
      )) as string
      const bannerSmallUrl = (await upload(
        bannerSmall,
        "mangas"
      )) as string

      const formDataDupe: any = { ...data }

      formDataDupe.banner = bannerUrl
      formDataDupe.bannerSmall = bannerSmallUrl
      formDataDupe.status = +formDataDupe.status
      formDataDupe.timestamp = serverTimestamp()

      const docRef = collection(db, "mangas")
      await addDoc(docRef, formDataDupe)

      toast.success("Item added", { theme: "dark" })
    } catch (error) {
      console.error(error)
      toast.error("Error while uploading the files", {
        theme: "dark",
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormCreate)}
      className="flex flex-col gap-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="placeholder:opacity-50 text-normal font-normal form-control px-4 py-2 input input-primary transition ease-in-out m-0"
            placeholder="A bit of a hint, it's title... you dumb f."
            {...register("name", {
              required: "Required field",
            })}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-warning">
                {typeof errors?.name?.message === "string"
                  ? errors?.name?.message
                  : "Required field"}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            className="select select-primary placeholder:opacity-50 text-normal font-normal form-control px-4 py-2 transition ease-in-out m-0"
            placeholder="Is it active???"
            {...register("status", {
              required: "Required field",
            })}
            defaultValue={0}
          >
            <option value={0}>Comming soon</option>
            <option value={1}>Ongoing</option>
            <option value={2}>Hiatus</option>
            <option value={3}>Dropped</option>
          </select>
          {errors.status && (
            <label className="label">
              <span className="label-text-alt text-warning">
                {typeof errors?.status?.message === "string"
                  ? errors?.status?.message
                  : "Required field"}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Synopsis</span>
          </label>
          <textarea
            className="placeholder:opacity-50 text-normal font-normal form-control px-4 py-2 input input-primary transition ease-in-out m-0"
            placeholder="Tell me a bit about it ;)"
            {...register("synopsis", {
              required: "Required field",
            })}
          />
          {errors.synopsis && (
            <label className="label">
              <span className="label-text-alt text-warning">
                {typeof errors?.synopsis?.message ===
                "string"
                  ? errors?.synopsis?.message
                  : "Required field"}
              </span>
            </label>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary font-bold"
      >
        Create
      </button>
    </form>
  )
}
