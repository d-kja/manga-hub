import React, { useContext } from "react"
import { LoadingContext } from "../../Context/LoadingContext"
import MangaContext from "../../Context/Mangas/MangaContext"
import Spinner from "./Spinner"

export default function LoadingLayout() {
  const { loading } = useContext(MangaContext)
  const { loading: urlChangeLoading } =
    useContext(LoadingContext)

  return (
    <div
      className={`transition-all ${
        loading || urlChangeLoading
          ? "opacity-100 flex-none"
          : "opacity-0 invisible"
      } fixed inset-0 bg-base-300 flex justify-center items-center`}
      style={{
        zIndex: "999",
      }}
    >
      <Spinner />
    </div>
  )
}
