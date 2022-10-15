import React, {
  ChangeEvent,
  useEffect,
  useState,
} from "react"

import {
  serverTimestamp,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  writeBatch,
  doc,
} from "firebase/firestore"
import { db } from "../../../firebase.config"
import { useUploadImage } from "../../../Hooks/useUploadImage"

import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

// Styling
import { toast } from "react-toastify"
import { MultiSelect } from "@mantine/core"
import { CircleNotch, Spinner } from "phosphor-react"

interface UpdateMangaProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  handleChange: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
  errors: FieldErrorsImpl<{
    [x: string]: any
  }>
}

export default function UpdateManga({
  handleSubmit,
  handleChange,
  register,
  errors,
}: UpdateMangaProps) {
  const { upload } = useUploadImage()

  const [mangas, setMangas] = useState<any[]>([])
  const [manga, setManga] = useState<any>({})
  const [tags, setTags] = useState<any[]>([])
  const [btnLoading, setBtnLoading] =
    useState<boolean>(false)
  const [addChapter, setAddChapter] =
    useState<boolean>(false)
  const [formDataUpdate, setFormDataUpdate] = useState({
    name: "",
    banner: "",
    bannerSmall: "",
    chapters: [],
    others: {
      synopsis: "",
      tags: [],
    },
    rating: {
      totalRating: 0,
      totalUsers: 0,
    },
    clicks: [],
    status: 0,
    timestamp: null,
    lastUpdate: null,
  })

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

  useEffect(() => {
    console.log(addChapter)
  }, [addChapter])

  const handleFecthManga = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target
    const {
      name,
      others: { synopsis, tags },
      status,
    } = mangas[+value].data

    handleChange("name", name)
    handleChange("synopsis", synopsis)
    handleChange("status", status)
    setTags(tags)
    setManga(mangas[+value])
  }

  const handleFormUpdate = async (data: any) => {
    const { name, status, synopsis, title, strips } = data

    console.log("selected", manga)
    console.log("updated values", {
      data,
      tags,
      addChapter,
    })

    try {
      setBtnLoading(true)
      if (addChapter) {
        if (strips.length < 0) {
          toast.error("No images selected", {
            theme: "dark",
          })
          return
        }

        const stripImages = await Promise.all(
          [...strips].map((item) =>
            upload(item, "mangaChapters")
          )
        ).catch((error) => console.error(error))
        const formDataDupe = {
          // Setting the old values
          ...manga.data,

          // Updating the old values
          status: +status,
          name,
          others: {
            synopsis,
            tags,
          },
          lastUpdate: serverTimestamp(),
          chapters: [
            ...manga.data.chapters,
            { title, strip: stripImages },
          ],
        }
        setFormDataUpdate(formDataDupe)
        const docRef = doc(db, "mangas", manga.id)
        await updateDoc(docRef, formDataDupe)
        toast.success("Item updated", { theme: "dark" })
        notifyUpdateToUsers(manga.id)
      } else {
        const formDataDupe = {
          // Setting the old values
          ...manga.data,

          // Updating the old values
          status: +status,
          name,
          others: {
            synopsis,
            tags,
          },

          lastUpdate: serverTimestamp(),
        }
        setFormDataUpdate(formDataDupe)
        const docRef = doc(db, "mangas", manga.id)
        await updateDoc(docRef, formDataDupe)
        toast.success("Item updated", { theme: "dark" })
      }
    } catch (error) {
      toast.error("Something went wrong", { theme: "dark" })
      console.error(error)
    }
    setBtnLoading(false)
  }

  const notifyUpdateToUsers = async (mangaId: any) => {
    try {
      // Create batch to perform multiple operations
      const batch = writeBatch(db)

      // Sets collection and queries for the manga id
      const docRef = collection(db, "bookmarks")
      const q = query(
        docRef,
        where("bookmarks", "array-contains", mangaId)
      )

      const docSnap = await getDocs(q)

      // if found, creates an updates list for each id and commit the batch
      if (docSnap) {
        docSnap.forEach((item) => {
          const ref = doc(db, "bookmarks", item?.id)
          const data = item.data()?.updates
            ? [
                ...item.data().updates,
                {
                  id: mangaId,
                  name: formDataUpdate.name,
                  imgUrl: formDataUpdate.bannerSmall,
                },
              ]
            : [
                {
                  id: mangaId,
                  name: formDataUpdate.name,
                  imgUrl: formDataUpdate.bannerSmall,
                },
              ]

          batch.update(ref, {
            updates: data,
          })
        })

        await batch.commit()
      }
    } catch (error) {
      toast.error(
        "Unable to notify users, error occurred",
        {
          theme: "dark",
        }
      )
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormUpdate)}
      className="my-6 flex flex-col gap-6"
    >
      {/* Select manga */}
      <select
        className="select select-ghost w-full"
        name="mangaChoice"
        id="mangaChoice"
        aria-label="choose manga"
        onChange={handleFecthManga}
        defaultValue={"nullish"}
        required
      >
        <option value={"nullish"} disabled>
          Select manga...
        </option>
        {mangas.map((item, idx) => (
          <option value={idx} key={item.id}>
            {item.data.name}
          </option>
        ))}
      </select>

      {/* Now update it's values */}
      {/* ---------------------- */}

      {/* Manga name */}
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
        {/* Manga synopsis */}
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

        {/* Manga tags */}
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

        {/* Manga status */}
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
      </div>

      {/* Add a new chapter */}
      {/* ----------------- */}
      <div className="form-control flex-row items-center gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          id="add-chapter"
          onChange={() => setAddChapter((prev) => !prev)}
          checked={addChapter}
        />
        <label
          className="label hover:cursor-pointer"
          htmlFor="add-chapter"
        >
          <span className="label-text">
            Add a new chapter?
          </span>
        </label>
      </div>

      {/* Chapter title */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className="placeholder:opacity-50 text-normal font-normal form-control px-4 py-2 input input-primary transition ease-in-out m-0"
          placeholder="Chapter's name"
          disabled={!addChapter}
          {...register("title", {
            required: "Required field",
            disabled: !addChapter,
          })}
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-warning">
              {typeof errors?.title?.message === "string"
                ? errors?.title?.message
                : "Required field"}
            </span>
          </label>
        )}
      </div>
      {/* Chapter strips */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Strips</span>
        </label>
        <input
          type="file"
          id="strip"
          multiple
          accept=".jpg,.png,.jpeg"
          placeholder="Strip is basically a bunch of images"
          className="placeholder:opacity-50 text-normal font-normal form-control px-4 py-2 input input-primary transition ease-in-out m-0"
          disabled={!addChapter}
          {...register("strips", {
            required: "Required field",
            disabled: !addChapter,
          })}
        />
        {errors.strips && (
          <label className="label">
            <span className="label-text-alt text-warning">
              {typeof errors?.strips?.message === "string"
                ? errors?.strips?.message
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
          "Update"
        )}
      </button>
    </form>
  )
}
