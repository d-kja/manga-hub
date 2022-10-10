import React, {
  useState,
  useContext,
  useEffect,
} from "react"
import { useParams, useNavigate } from "react-router-dom"

import { motion } from "framer-motion"
import MangaList from "../Layout/Manga/MangaList"

import MangaContext from "../Context/Mangas/MangaContext"
import {
  queryManga,
  queryTag,
} from "../Context/Search/SearchActions"
import { fetchMangas } from "../Context/Mangas/MangaActions"

function SearchManga() {
  const { dispatch } = useContext(MangaContext)
  const [searchInput, setSearchInput] = useState("")
  const [selectInput, setSelectInput] = useState("")
  const params = useParams()
  const nav = useNavigate()

  // @USE On search input update, search current value
  useEffect(() => {
    const instaSearchManga = async () => {
      dispatch({ type: "SET_LOADING" })
      const mangaRef = await queryManga(searchInput)
      dispatch({ type: "SET_MANGAS", payload: mangaRef })
    }

    searchInput.trim().length > 0 && instaSearchManga()
  }, [searchInput, dispatch])

  // @USE On select input update, search tag
  useEffect(() => {
    const searchTag = async () => {
      dispatch({ type: "SET_LOADING" })
      const mangaRef = await queryTag(selectInput)
      dispatch({ type: "SET_MANGAS", payload: mangaRef })
    }

    selectInput.trim().length > 0 &&
      selectInput !== null &&
      searchTag()
  }, [selectInput, dispatch])

  // @USE Reset listing based on the lack of current queries
  useEffect(() => {
    const resetQuery = async () => {
      dispatch({ type: "SET_LOADING" })
      const mangaRef = await fetchMangas({})
      dispatch({ type: "SET_MANGAS", payload: mangaRef })
    }
    selectInput.trim().length === 0 &&
      searchInput.trim().length === 0 &&
      resetQuery()
  }, [selectInput, searchInput, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: "SET_LOADING" })
    const mangaRef = await queryManga(searchInput)
    dispatch({ type: "SET_MANGAS", payload: mangaRef })
    nav("/search") // Ensuring that the current location is set without post queries
  }

  const handleChange = async (e) => {
    const { value, id } = e.target
    id === "searchInput" && setSearchInput(value)
    id === "selectInput" && setSelectInput(value)
  }

  return (
    <motion.div
      initial={{ y: 75, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        ease: "easeIn",
        delay: 1.3,
      }}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-5 justify-center mb-4 mt-8"
        >
          <div className="form-control">
            <div className="input-group input-group-lg">
              <input
                type="text"
                value={searchInput}
                onChange={handleChange}
                id="searchInput"
                placeholder="Search title…"
                className="input input-bordered"
              />
              <button
                className="btn btn-square"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={handleChange}
            id="selectInput"
          >
            <option defaultValue value={""}>
              Select tag...
            </option>
            <option
              value={"adventure"}
              className="capitalize"
            >
              adventure
            </option>
            <option
              value={"fantasy"}
              className="capitalize"
            >
              fantasy
            </option>
            <option value={"action"} className="capitalize">
              action
            </option>
            <option value={"isekai"} className="capitalize">
              isekai
            </option>
          </select>
        </form>
        <div className="divider max-w-screen-lg mx-auto px-4"></div>
        <div className="">
          {params.query ? (
            <MangaList query={params.query} />
          ) : (
            <MangaList />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SearchManga
