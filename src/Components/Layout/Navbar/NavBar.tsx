import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCurrentAuth } from "../../../Hooks/useCurrentAuth"

import { MdLocalFireDepartment } from "react-icons/md"
import { CircularProgress } from "@mui/material"

import UserIcon from "./UserIcon"
import SearchContext from "../../Context/Search/SearchContext"
import * as Dialog from "@radix-ui/react-dialog"
import { Gear, MagnifyingGlass, X } from "phosphor-react"
import DialogBody from "./DialogBody"
import { queryManga } from "../../Context/Search/SearchActions"
import { useForm } from "react-hook-form"
import { v4 as uuid } from "uuid"
import useStorage from "../../../Hooks/useStorage"

function NavBar() {
  const htmlTag = useRef(document.querySelector("html"))
  const { storageItem } = useStorage({
    key: "user-theme",
    data: "primary",
  })
  // dispatch, queryResult
  const { loading } = useContext(SearchContext)
  // data
  const [, setData] = useState([])
  const [searchedMangas, setSearchedMangas] = useState<
    any[]
  >([])
  const { isLoading, isLogged } = useCurrentAuth()
  const { register, handleSubmit } = useForm()

  const nav = useNavigate()

  useEffect(() => {
    if (storageItem) setTheme(storageItem.data)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setTheme = (theme: string) => {
    htmlTag.current?.setAttribute("data-theme", theme)
    localStorage.setItem(
      "user-theme",
      JSON.stringify({
        key: "user-theme",
        data: theme,
      })
    )
  }

  const handleSearchBarSubmit = async (
    e: Event,
    searchInput: any
  ) => {
    e.preventDefault()
    nav(`/search/${searchInput}`)
  }

  const handleSearchBarChange = async (
    e: Event,
    searchInput: any
  ) => {
    // dispatch({ type: "SET_LOADING" })
    // const searchBarQueryResults = await queryManga(searchInput)
    // await dispatch({
    //     type: "QUERY_MANGA",
    //     payload: searchBarQueryResults,
    // })
    setData(searchInput)
  }

  const searchItemOnSubmit = async ({ search }: any) => {
    await fetchMangasSearched(search)
  }

  const fetchMangasSearched = async (name: string = "") => {
    if (name.length > 0) {
      try {
        const response = await await queryManga(name)
        if (response) setSearchedMangas(response)
      } catch (error: any) {
        console.error(
          error.message ||
            error ||
            "Error thrown while searching for mangas"
        )
      }
    } else {
      setSearchedMangas([])
    }
  }

  const searchItemOnChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target
    await fetchMangasSearched(value)
  }

  if (isLoading || loading) {
    return (
      <div className="navbar bg-base-300 text-white">
        <CircularProgress color="inherit" size={12} />
      </div>
    )
  }

  return (
    <>
      <div className="navbar bg-w-full bg-base-300 gap-3">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content font-bold text-md mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              style={{
                zIndex: 100,
              }}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li tabIndex={0}>
                <span className="justify-between">
                  Mangas
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </span>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link to="/bookmarks">Bookmarks</Link>
                  </li>
                  <li>
                    <Link to="/search">Search</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/list">List</Link>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="btn hover:bg-opacity-0 btn-ghost normal-case text-md hover:text-primary transition-colors"
          >
            <MdLocalFireDepartment size={20} />
          </Link>
        </div>
        <div className="navbar-center hidden px-2 text-md font-bold lg:flex">
          <ul
            className="menu menu-horizontal"
            style={{
              zIndex: 100,
            }}
          >
            <li>
              <Link className="rounded-lg" to="/">
                Home
              </Link>
            </li>
            <li tabIndex={0}>
              <span className="rounded-lg">
                Mangas
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </span>
              <ul className="p-2 bg-base-100 rounded-lg">
                <li>
                  <Link
                    className="rounded-lg"
                    to="/bookmarks"
                  >
                    Bookmarks
                  </Link>
                </li>
                <li>
                  <Link className="rounded-lg" to="/search">
                    Search{" "}
                    <span className="text-primary italic font-light">
                      with filter
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="rounded-lg" to="/list">
                List
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="navbar-end flex flex-row gap-2"
          style={{
            zIndex: 100,
          }}
        >
          <Dialog.Root>
            <Dialog.Trigger>
              <span className="btn btn-ghost capitalize font-semibold text-base hover:bg-transparent flex items-center gap-2 hover:text-primary transition-colors">
                <MagnifyingGlass
                  className="w-4 h-4"
                  weight={"bold"}
                />
                <span className="hidden md:block">
                  Search
                </span>
              </span>
            </Dialog.Trigger>
            <DialogBody title="Search manga">
              <form
                className="py-4 text-base font-normal flex flex-col gap-4"
                onSubmit={handleSubmit(searchItemOnSubmit)}
              >
                <input
                  type="text"
                  placeholder="e.g. Overflow ;)"
                  className="input w-full"
                  {...register("search")}
                  onChange={searchItemOnChange}
                />
                <div className="flex flex-col gap-2 max-h-72 overflow-auto">
                  {searchedMangas.map(
                    ({
                      id,
                      data: manga,
                    }: {
                      id: string
                      data: any
                    }) => {
                      return (
                        <Dialog.Close
                          onClick={() => {
                            nav(`/mangas/${id}`)
                          }}
                          key={uuid()}
                        >
                          <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body px-6 py-4 flex flex-row gap-4">
                              <img
                                src={manga.bannerSmall}
                                alt="manga small banner"
                                className="w-16 object-cover object-center rounded"
                              />
                              <div className="flex flex-col gap-2">
                                <h2 className="card-title text-base font-semibold">
                                  {manga.name}
                                </h2>
                                <p className="text-sm font-normal opacity-75">
                                  {manga.others.synopsis.slice(
                                    0,
                                    50
                                  )}
                                  ...
                                </p>
                              </div>
                            </div>
                          </div>
                        </Dialog.Close>
                      )
                    }
                  )}
                </div>
              </form>
            </DialogBody>
          </Dialog.Root>

          <Dialog.Root>
            <Dialog.Trigger>
              <span className="btn btn-ghost px-0 capitalize font-semibold text-base hover:bg-transparent flex items-center gap-2 hover:text-primary transition-colors">
                <Gear className="w-5 h-5" weight={"bold"} />
              </span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
              <Dialog.Content className="fixed bg-base-300 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/40 min-w-[460px] max-h-[85%] overflow-auto">
                <Dialog.Title className="text-xl font-black border-b-2 border-primary text-primary">
                  Change theme
                </Dialog.Title>
                <div className="my-4 text-secondary font-normal grid grid-cols-1 md:grid-cols-2 gap-2">
                  <button
                    className="flex items-center gap-4 btn-ghost btn"
                    onClick={() => setTheme("primary")}
                  >
                    Primary{" "}
                    <span className="btn bg-red-700 btn-circle rounded-full btn-xs" />
                  </button>
                  <button
                    className="flex items-center gap-4 btn-ghost btn"
                    onClick={() => setTheme("halloween")}
                  >
                    Halloween{" "}
                    <span className="btn bg-yellow-400 btn-circle rounded-full btn-xs" />
                  </button>
                  <button
                    className="flex items-center gap-4 btn-ghost btn"
                    onClick={() => setTheme("light")}
                  >
                    Light{" "}
                    <span className="btn bg-zinc-100 btn-circle rounded-full btn-xs" />
                  </button>
                  <button
                    className="flex items-center gap-4 btn-ghost btn"
                    onClick={() => setTheme("dark")}
                  >
                    Dark{" "}
                    <span className="btn bg-zinc-700 btn-circle rounded-full btn-xs" />
                  </button>
                  <button
                    className="flex items-center gap-4 btn-ghost btn"
                    onClick={() => setTheme("cyberpunk")}
                  >
                    Cyberpunk{" "}
                    <span className="btn bg-yellow-600 btn-circle rounded-full btn-xs" />
                  </button>
                </div>

                <Dialog.Close className="btn btn-xs opacity-50 btn-square absolute top-5 right-5">
                  <X weight="bold" />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <UserIcon isLogged={isLogged} />
        </div>
      </div>
    </>
  )
}

export default NavBar
