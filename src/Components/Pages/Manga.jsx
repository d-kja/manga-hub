import React, {
  useEffect,
  useContext,
  useState,
} from "react"
import { useParams, useNavigate } from "react-router-dom"
import MangaContext from "../Context/Mangas/MangaContext"
import { fetchManga } from "../Context/Mangas/MangaActions"

import { motion } from "framer-motion"
import { toast } from "react-toastify"

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Rating } from "@mui/material"
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd"
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded"

import MangaButton from "../Layout/Manga/MangaButton"
import useStorage, {
  checkExpiredStorageItem,
  getFromStorage,
  setExpirationDate,
} from "../../Hooks/useStorage"
import { useCheckStatus } from "../../Hooks/useCheckStatus"

import { getAuth } from "firebase/auth"
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../../firebase.config"

import Spinner from "../Layout/Spinner"

function Manga() {
  const { checkStatus, myStatus } = useCheckStatus()
  const {
    storageItem: strBookmarks,
    updateStorageItem: updateStrBookmarks,
  } = useStorage({
    key: "bookmarks",
    data: [],
  })
  const params = useParams()
  const nav = useNavigate()
  const auth = getAuth()

  const { manga, loading, dispatch } =
    useContext(MangaContext)
  const { updateStorageItem } = useStorage({
    key: "manga",
    data: {
      items: manga,
      expire: setExpirationDate(new Date().getTime()),
    },
  })

  console.log(manga)

  const [bookmark, setBookmark] = useState(
    checkStorageObj(manga.myId)
  )
  const [rating, setRating] = useState(5)
  const [alreadySet, setAlreadySet] = useState(false)

  const handleBookmarkClick = async () => {
    setBookmark((prev) => !prev)
    const ifStored = checkStorageObj(manga.myId)
    if (manga && !ifStored && bookmark !== true) {
      updateStrBookmarks((prev) => {
        if (strBookmarks instanceof Array) {
          return {
            key: "bookmarks",
            data: [...prev, manga],
          }
        } else {
          return {
            key: "bookmarks",
            data: [...prev.data, manga],
          }
        }
      })
      if (auth.currentUser) {
        // Search for the current bookmark's user id
        const itemRef = collection(db, "bookmarks")
        const q = query(
          itemRef,
          where("userRef", "==", auth.currentUser.uid)
        )

        const docSnap = await getDocs(q)
        const temp = []
        docSnap.forEach((item) =>
          temp.push({
            id: item.id,
            data: item.data(),
          })
        )

        if (
          temp[0] &&
          !temp[0].data.bookmarks.includes(params.id)
        ) {
          // Update bookmarks doc
          const bookmarkRef = doc(
            db,
            "bookmarks",
            temp[0].id
          )
          await updateDoc(bookmarkRef, {
            bookmarks: arrayUnion(params.id),
          })
        } else if (!temp[0]) {
          const bookmarkRef = collection(db, "bookmarks")
          await addDoc(bookmarkRef, {
            userRef: auth.currentUser.uid,
            bookmarks: [params.id],
          })
        }
      } else {
        toast.info(
          "Bookmarks updated, currently you aren't logged in so it's only updated locally",
          { theme: "dark" }
        )
      }
    } else {
      try {
        let temp
        let result = []
        if (strBookmarks instanceof Array) {
          temp = [...strBookmarks]
          temp.forEach((element, idx) => {
            if (element.myId !== params.id)
              result.push(element)
          })
        } else {
          const { data: itemData } = strBookmarks
          temp = [...itemData]
          temp.forEach((element, idx) => {
            if (element.myId !== params.id)
              result.push(element)
          })
        }
        updateStrBookmarks((prev) => ({
          key: "bookmarks",
          data: result,
        }))

        const itemRef = collection(db, "bookmarks")
        const q = query(
          itemRef,
          where("userRef", "==", auth.currentUser.uid)
        )

        const docSnap = await getDocs(q)
        const temporary = []
        docSnap.forEach((item) =>
          temporary.push({
            id: item.id,
            data: item.data(),
          })
        )

        if (
          temporary[0] &&
          temporary[0].data.bookmarks.includes(params.id)
        ) {
          const filteredArray =
            temporary[0].data.bookmarks.filter(
              (item) => item !== params.id
            )
          // Update bookmarks doc
          const bookmarkRef = doc(
            db,
            "bookmarks",
            temporary[0].id
          )
          await updateDoc(bookmarkRef, {
            bookmarks: filteredArray,
          })
        }
      } catch (error) {
        toast.info(
          "Bookmarks updated, currently you aren't logged in so it's only updated locally",
          { theme: "dark" }
        )
      }
    }
  }

  function checkStorageObj(key, id) {
    // Checking twice cus if it isn't there it always returns both key and data
    try {
      let temp = false
      if (strBookmarks instanceof Array) {
        strBookmarks.forEach((element) => {
          if (element.myId === params.id) temp = true
        })
      } else {
        const { data: itemData } = strBookmarks
        itemData.forEach((element) => {
          if (element.myId === params.id) temp = true
        })
      }

      return temp
    } catch (error) {
      console.error(error)
    }
  }

  const handleRatingClick = async ({ value }) => {
    setRating(value)
    const updatedRating = +value * 2
    const totalRating =
      +manga.rating.totalRating + updatedRating
    const totalUsers = +manga.rating.totalUsers + 1
    if (alreadySet) {
      toast.info(
        "It's one vote per user, refrain from repeating this action",
        { theme: "dark" }
      )
      return
    }

    try {
      const docRef = doc(db, "mangas", manga.myId)
      await updateDoc(docRef, {
        rating: {
          totalRating,
          totalUsers,
        },
      })

      setAlreadySet(true)
    } catch (error) {
      if (getAuth().currentUser) {
        toast.error(
          "Something went wrong, try again later",
          {
            theme: "dark",
          }
        )
      } else {
        toast.error(
          "To complete this action, login is required",
          {
            theme: "dark",
          }
        )
      }
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async (id) => {
      dispatch({ type: "SET_LOADING" })
      let mangaRef
      const fetchStorage = getFromStorage("manga")

      try {
        if (
          fetchStorage &&
          !checkExpiredStorageItem("manga") &&
          fetchStorage.myId === params.id
        ) {
          const { items } = fetchStorage
          mangaRef = items
        } else {
          const { id: mangaId, data: mangaData } =
            await fetchManga(id)
          mangaData.myId = mangaId
          mangaRef = mangaData
          updateStorageItem({
            key: "manga",
            data: {
              items: mangaData,
              expire: setExpirationDate(
                new Date().getTime()
              ),
            },
          })
        }
        dispatch({
          type: "SET_MANGA",
          payload: mangaRef,
        })

        const ratingValue =
          (mangaRef?.rating?.totalRating ?? 0) /
          (mangaRef?.rating?.totalUsers ?? 0) /
          2
        const ratingUpdated = ratingValue ? ratingValue : 0

        setRating(ratingUpdated)
        if (auth.currentUser) {
          const userId = auth.currentUser.uid
          if (!mangaRef?.clicks.includes(userId)) {
            const docRef = doc(db, "mangas", mangaRef.myId)
            await updateDoc(docRef, {
              clicks: [...mangaRef.clicks, userId],
            })
          }
        }

        if (mangaRef === null) {
          toast.error("Couldn't find item", {
            theme: "dark",
          })
          nav("/notfound")
        }
      } catch (error) {
        // fallback if this guy got deleted or sth
        console.error("Something went wrong", error)
        toast.error("Something went wrong", {
          theme: "dark",
        })
        dispatch({ type: "RESET_LOADING" })
        nav("/notfound")
      }
    }

    fetchData(params.id)
    manga.myId !== "" && checkStatus(manga.status)
    // eslint-disable-next-line
  }, [params.id])

  return loading ? (
    <Spinner />
  ) : (
    <motion.div
      initial={{ y: 75, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        ease: "easeIn",
        delay: 1.3,
      }}
      className="lg:max-w-screen-2xl relative mx-auto py-8"
    >
      <div className="flex md:flex-row md:justify-center flex-col lg:max-w-[1100px] mx-auto">
        <div className="flex-shrink-0 md:mx-7 ">
          <div className="flex items-center justify-center m-5">
            <div className="outline outline-transparent hover:outline-primary outline-offset-4 rounded-lg transition-all ease-in-out duration-200">
              <img
                src={manga.bannerSmall}
                alt="temp banner"
                style={{
                  height: "100%",
                  filter: `grayscale(${65}%)`,
                }}
                className="rounded-lg w-52"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <span className="font-bold uppercase text-2xl text-center flex items-center gap-2">
            {manga.name}
            {(manga.status !== null ||
              manga.status !== undefined) && (
              <span
                className={`badge badge-outline badge-${checkStatus(
                  manga.status
                )}`}
              >
                {myStatus.current}
              </span>
            )}
          </span>
          <div>
            <div className="mx-12 md:mx-5 font-light text-md overflow-auto">
              <span className="font-bold">Synopsis: </span>
              {manga.others.synopsis}
            </div>
            <div className="flex items-center justify-between mx-4 md:mx-0 lg:ml-8">
              <div className="mx-12 md:mx-5  font-normal text-sm">
                <span className="font-bold">Tags: </span>
                {manga.others.tags.map((item, idx) => {
                  return (
                    <div
                      className="badge badge-neutral badge-sm ml-3 p-1 text-sm"
                      key={idx}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center lg:mr-20 gap-2">
                <div className="flex font-normal badge badge-neutral badge-sm">
                  <Rating
                    defaultValue={+rating}
                    name="simple-controlled"
                    value={+rating}
                    className="mr-2"
                    onChange={(e) => {
                      handleRatingClick(e.target)
                    }}
                    size="small"
                  />
                  {(rating * 2).toFixed(1) + "/10"}
                </div>
                <div className="flex justify-end">
                  <div
                    className="btn btn-ghost hover:text-primary"
                    onClick={handleBookmarkClick}
                  >
                    {bookmark ? (
                      <BookmarkAddedIcon
                        sx={{ fontSize: 25 }}
                        className="text-primary-focus"
                      />
                    ) : (
                      <BookmarkAddIcon
                        sx={{ fontSize: 25 }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider md:max-w-[75%] mx-4 md:mx-auto font-light text-lg">
        <ArrowLeftIcon /> Chapters <ArrowRightIcon />
      </div>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-x-6 gap-y-4 auto-cols-fr mx-6 md:max-w-[70%] md:mx-auto">
        {manga.chapters.map((item, idx) => (
          <MangaButton
            id={params.id}
            key={idx}
            chapId={idx}
            title={item.title}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default Manga
