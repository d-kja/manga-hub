import React, { useContext } from "react"
import { Link } from "react-router-dom"

import Spinner from "./Spinner"

import MangaContext from "../Context/Mangas/MangaContext"

interface SelectChapterProps {
  id: string
  chapId: string
}

type manga = {
  name: string
  chapters: []
  banner: string
  bannerSmall: string
  others: {
    synopsis: string
    tags: []
  }
  rating: {
    totalRating: number | string
    totalUsers: number | string
  }
  status: number | string | boolean
}

export const SelectChapter = ({
  id,
  chapId,
}: SelectChapterProps) => {
  const { loading, manga } = useContext(MangaContext)

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex justify-between mx-10 border-b border-zinc-700 border-opacity-75">
      <div className="dropdown dropdown-hover">
        <label
          tabIndex={0}
          className="btn 
                    btn-ghost m-1"
        >
          Select Chapter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 list-none"
        >
          {manga.chapters.map(
            (item: manga, idx: number) => {
              return (
                <li key={idx}>
                  <Link
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                      })
                    }
                    to={`/mangas/${id}/chapter/${idx}`}
                  >
                    Chapter {+idx + 1}
                  </Link>
                </li>
              )
            }
          )}
        </ul>
      </div>
      {manga.chapters.length && (
        <div className="">
          <Link
            onClick={() =>
              window.scrollTo({
                top: 0,
              })
            }
            to={`/mangas/${id}/chapter/${+chapId - 1}`}
            className={
              chapId === "0"
                ? "mr-4 text-zinc-600 bg-transparent btn-disabled"
                : "btn border-zinc-700 btn-primary btn-outline mr-4"
            }
          >
            Prev
          </Link>
          <Link
            onClick={() =>
              window.scrollTo({
                top: 0,
              })
            }
            to={`/mangas/${id}/chapter/${+chapId + 1}`}
            className={
              manga.chapters.length > 1 &&
              chapId !==
                (manga.chapters.length - 1).toString()
                ? "btn border-zinc-700 btn-primary btn-outline mr-4"
                : "mr-4 text-zinc-600 bg-transparent btn-disabled"
            }
          >
            Next
          </Link>
        </div>
      )}
    </div>
  )
}
