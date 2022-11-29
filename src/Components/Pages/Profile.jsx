import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import {
  getAuth,
  updateEmail,
  updateProfile,
} from "firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase.config"
import { useUploadImage } from "../../Hooks/useUploadImage"

import { toast } from "react-toastify"
import { motion } from "framer-motion"

import Bookmarks from "./Bookmarks"

function Profile() {
  const auth = getAuth()
  const { upload } = useUploadImage()
  const [changeBtn, setChangeBtn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState({
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
  })

  const { email, name, photoURL } = user

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists() && docSnap.data().admin) {
        setIsAdmin(true)
      }
    }
    fetchUser()
    return () => {}
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!(email.length && name.length)) {
        toast.error(
          "Please enter a valid email and/or password",
          {
            theme: "dark",
          }
        )

        setChangeBtn(true)
        return
      }

      if (!changeBtn) {
        const docRef = doc(
          db,
          "users",
          auth.currentUser.uid
        )

        if (
          auth.currentUser.email !== email ||
          auth.currentUser.name !== name ||
          auth.currentUser.photoURL !== photoURL
        ) {
          let photo = auth.currentUser.photoURL
          console.log(photoURL, photo)
          if (photoURL && typeof photoURL !== "string") {
            toast.info(
              "Wait just a second, we are uploading your profile image",
              { theme: "dark", position: "bottom-center" }
            )

            const url = await upload(photoURL, "users")
            photo = url
          }

          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo ?? auth.currentUser?.photoURL,
          })
          await updateEmail(auth.currentUser, email)
          await updateDoc(docRef, {
            email,
            name,
          })
        }

        toast.success(
          "User updated, reload the page to see the alterations",
          { theme: "dark" }
        )
      }
    } catch (error) {
      toast.error("Couldn't update user information", {
        theme: "dark",
      })
    }
  }

  const handleChange = (e) => {
    const { value, id } = e.target
    setUser((prev) => ({
      ...prev,
      [id]: value,
    }))

    console.log(photoURL)
  }

  const handleImage = async (e) => {
    const { files, id } = e.target

    setUser((prev) => ({
      ...prev,
      [id]: files[0],
    }))
  }

  console.log("User info", user)

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
      className="lg:max-w-screen-lg md:max-w-full w-full mx-auto"
    >
      <div className="py-12 px-7 flex flex-col items-center gap-12 md:flex-row md:gap-6 relative">
        <div
          className="relative top-7 w-fit h-fit outline outline-primary hover:text-purple-700 hover:outline-purple-700 outline-offset-2 outline-2 rounded-full
                transition-all ease-in-out duration-700
            "
        >
          <label
            htmlFor="photoURL"
            className="relative grid place-items-center"
          >
            <input
              type="file"
              id="photoURL"
              onChange={handleImage}
              accept=".jpg,.png,.jpeg"
              placeholder="user photo"
              className="hidden"
              disabled={!changeBtn}
            />
            <div className="bg-neutral rounded-full hover:grayscale">
              <img
                className={`mask mask-circle opacity-100 w-40 h-40 object-cover ${
                  changeBtn && "opacity-25"
                }`}
                src={
                  photoURL ??
                  "https://i.imgur.com/7fTGOOK.jpeg"
                }
                width={125}
                height={125}
                loading="lazy"
                alt="user icon"
              />
            </div>
            <span
              className={`absolute font-semibold top-1/2 -translate-y-1/2 duration-700 transition-all z-50 pointer-events-none flex flex-col items-center justify-center leading-tight ${
                changeBtn ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-sm font-normal text-secondary uppercase">
                click to
              </span>
              <span className="text-2xl -mt-1">ALTER</span>
            </span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="ml-5">
          <button
            className="btn btn-ghost hover:outline hover:outline-primary hover:outline-offset-2 hover:outline-1 absolute right-10 top-10"
            onClick={() => setChangeBtn((prev) => !prev)}
            type="submit"
          >
            {!changeBtn ? "Change" : "Done"}
          </button>
          <div className="form-control w-full md:max-w-xs">
            <label className="label">
              <span className="label-text text-md">
                Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              id="name"
              required
              onChange={handleChange}
              className={`input input-bordered input-primary w-full ${
                !changeBtn &&
                "input-disabled force-bg-transparency"
              }`}
              disabled={!changeBtn}
            />
          </div>
          <div className="form-control w-full md:max-w-xs mt-5">
            <label className="label">
              <span className="label-text text-md">
                Email
              </span>
            </label>
            <input
              type="Email"
              placeholder="Email"
              name="email"
              value={email}
              required
              id="email"
              onChange={handleChange}
              disabled={!changeBtn}
              className={`input input-bordered input-primary w-full ${
                !changeBtn &&
                "input-disabled force-bg-transparency"
              }`}
            />
          </div>
        </form>
      </div>
      <div className="divider divide-x-8 mt-12 font-light relative max-w-screen-xl mx-auto">
        {isAdmin && (
          <Link
            to="/compose"
            className="btn btn-ghost m-auto hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1 absolute -top-16 right-10"
          >
            Compose
          </Link>
        )}
        <Link
          to="/list"
          className="btn btn-ghost -mt-3 my-auto px-12 hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1"
        >
          Mangas
        </Link>
      </div>
      <Bookmarks />
    </motion.div>
  )
}

export default Profile
