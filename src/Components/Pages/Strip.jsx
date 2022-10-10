import React, {
  useEffect,
  useContext,
  useState,
} from "react"
import {
  useParams,
  useNavigate,
  Navigate,
  Link,
} from "react-router-dom"
import Disqus from "disqus-react"

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { motion } from "framer-motion"

import mangaContext from "../Context/Mangas/MangaContext"
import { fetchManga } from "../Context/Mangas/MangaActions"
import { toast } from "react-toastify"
import Spinner from "../Layout/Spinner"
import { SelectChapter } from "../Layout/SelectChapter"

function Strip() {
  const par = useParams()
  const nav = useNavigate()
  const { loading, manga, dispatch } =
    useContext(mangaContext)
  const [idRef, setidRef] = useState()

  useEffect(() => {
    if (
      par.chapId > manga.chapters.length ||
      par.chapId === undefined
    ) {
      // Cus it loads before fetching it :D, i could use a loading state but kinda w/e
      nav(`/mangas/${par.id}`)
    } else {
      dispatch({ type: "SET_LOADING" })
      const fetchData = async (id) => {
        // eslint-disable-next-line
        const { id: idx, data: mangaRef } =
          await fetchManga(id)
        setidRef(idx)
        dispatch({
          type: "SET_MANGA",
          payload: mangaRef,
        })
      }

      fetchData(par.id)
    }

    // eslint-disable-next-line
  }, [])

  return loading ? (
    <Spinner />
  ) : manga.banner ? (
    <motion.div
      initial={{ y: 75, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        ease: "easeIn",
        delay: 1.3,
      }}
      className="lg:max-w-screen-lg md:max-w-full w-full mx-auto"
    >
      <div className="mt-12">
        <SelectChapter id={par.id} chapId={par.chapId} />
      </div>
      <Link
        to={`/mangas/${par.id}`}
        className="mx-5 md:mx-0"
      >
        <div className="mb-6 mt-4">
          <img
            src={manga.banner}
            className="rounded-3xl"
            style={{
              filter: `grayscale(${65}%)`,
            }}
            alt="manga banner"
          />
        </div>
      </Link>
      <Link
        to={`/mangas/${par.id}`}
        className="font-bold text-2xl flex justify-center"
      >
        {manga.name}
      </Link>
      <div className="divider mx-5 mt-12 font-light text-lg relative">
        <ArrowLeftIcon /> {manga.chapters[par.chapId].title}
        <ArrowRightIcon />
        <div className="text-sm breadcrumbs uppercase absolute left-0 bottom-2">
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/mangas/${par.id}`}>
                {manga.name}
              </Link>
            </li>
            <li>{manga.chapters[par.chapId].title}</li>
          </ul>
        </div>
      </div>
      <div className="mangapage--table mt-10">
        {manga.chapters[par.chapId].strip.map(
          (item, idkey) => (
            <img
              src={item}
              key={idkey}
              alt="manga strip"
              className="w-full rounded-md"
            />
          )
        )}
      </div>
      <div className="mt-12">
        <SelectChapter id={par.id} chapId={par.chapId} />
      </div>
      <Disqus.DiscussionEmbed
        className="mt-16 mx-5"
        shortname="ny-manga-hub"
        config={{
          url: `https://ny-manga-app.vercel.app/mangas/${idRef}/chapter/${par.chapId}`,
          identifier: `${manga.name}-${idRef}-${par.chapId}`,
          title: `${manga.name}, CH. ${par.chapId}`,
        }}
      />
      <div className="divider mt-3 mb-24"></div>
    </motion.div>
  ) : (
    <>
      {toast.info(
        "Couldn't complete action, hard reload isn't recommended",
        {
          theme: "dark",
        }
      )}
      <Navigate to={`/mangas/${par.id}`} />
    </>
  )
}

export default Strip
