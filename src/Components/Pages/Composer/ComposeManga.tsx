import React, { useState } from "react"

import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

// Components
import { MultiSelect } from "@mantine/core"

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

// Styling
import { toast } from "react-toastify"
import { Spinner } from "phosphor-react"

// Types
interface ComposeMangaProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  handleChange: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
  errors: FieldErrorsImpl<{
    [x: string]: any
  }>
}

type TForm = {
  banner: FileList
  bannerSmall: FileList
}

export default function ComposeManga({
  errors,
  handleSubmit,
  handleChange,
  register,
}: ComposeMangaProps) {
  const { upload } = useUploadImage()
  const [tags, setTags] = useState<any[]>([])
  const [btnLoading, setBtnLoading] =
    useState<boolean>(false)

  const handleFormCreate = async (data: any) => {
    const { banner, bannerSmall } = data as TForm
    console.log(data, tags)

    try {
      setBtnLoading(true)

      const bannerUrl = (await upload(
        banner[0],
        "mangas"
      )) as string
      const bannerSmallUrl = (await upload(
        bannerSmall[0],
        "mangas"
      )) as string

      const formDataDupe: any = {
        name: data.name,
        status: +data.status,
        chapters: [],
        clicks: [],
        rating: {
          totalRating: 0,
          totalUsers: 0,
        },
        others: {
          tags,
          synopsis: data.synopsis,
        },
      }

      formDataDupe.banner = bannerUrl
      formDataDupe.bannerSmall = bannerSmallUrl
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
    setBtnLoading(false)
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
            <span className="label-text">Synopsis</span>{" "}
            <button
              className="btn btn-xs btn-ghost"
              type="button"
              onClick={() => {
                handleChange(
                  "synopsis",
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim quaerat rerum veritatis minus repudiandae reiciendis esse, iusto obcaecati exercitationem culpa maiores suscipit quia dolores molestiae a nesciunt aliquid illum recusandae."
                )
              }}
            >
              Generate lorem
            </button>
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

        <div className="form-control">
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <MultiSelect
            className="select select-primary bg-transparent appearance-none placeholder:opacity-50 text-normal font-normal form-control p-1 transition ease-in-out m-0"
            data={[
              {
                label: "Adventure",
                value: "adventure",
              },
              {
                label: "Slice of life",
                value: "slife of life",
              },
              {
                label: "Isekai",
                value: "isekai",
              },
              {
                label: "Fantasy",
                value: "fantasy",
              },
              {
                label: "Action",
                value: "action",
              },
            ]}
            value={tags}
            onChange={setTags}
            placeholder="Select da tags mah brotha"
            clearable
            required
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Banner</span>
        </label>
        <input
          type="file"
          className="placeholder:opacity-50 text-normal font-normal form-control px-4 py-2 input input-primary transition ease-in-out m-0"
          placeholder="A bit of a hint, it's title... you dumb f."
          accept=".jpg,.png,.jpeg"
          {...register("banner", {
            required: "Required field",
          })}
        />
        {errors.banner && (
          <label className="label">
            <span className="label-text-alt text-warning">
              {typeof errors?.banner?.message === "string"
                ? errors?.banner?.message
                : "Required field"}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">
            Banner (Small version)
          </span>
        </label>
        <input
          type="file"
          className="placeholder:opacity-50 text-normal font-normal form-control px-4 py-2 input input-primary transition ease-in-out m-0"
          placeholder="A bit of a hint, it's title... you dumb f."
          accept=".jpg,.png,.jpeg"
          {...register("bannerSmall", {
            required: "Required field",
          })}
        />
        {errors.bannerSmall && (
          <label className="label">
            <span className="label-text-alt text-warning">
              {typeof errors?.bannerSmall?.message ===
              "string"
                ? errors?.bannerSmall?.message
                : "Required field"}
            </span>
          </label>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary font-bold mt-2"
        disabled={btnLoading}
      >
        {btnLoading ? (
          <Spinner
            size={24}
            weight="bold"
            className="animate-spin"
          />
        ) : (
          "Create"
        )}
      </button>
    </form>
  )
}
