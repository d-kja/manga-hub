import React from "react"
import {
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import Spinner from "../Layout/Spinner"

import { useCurrentAuth } from "../../Hooks/useCurrentAuth"

import { getAuth } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../firebase.config"

function AdminOnly() {
  const { isLoading: loadingAuth, isLogged } =
    useCurrentAuth()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const isMounted = useRef(true)
  const nav = useNavigate()

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth()

      const fetchUser = async () => {
        if (isLogged) {
          // Probably a bad idea to force uid here, but can't be helped
          const docRef = doc(
            db,
            "users",
            auth.currentUser?.uid!
          )
          const docSnap = await getDoc(docRef)

          if (docSnap.exists() && docSnap.data().admin) {
            setIsAdmin(true)
          }
          setLoading(false)
        }
      }

      fetchUser()
    }

    return () => {
      isMounted.current = false
    }
  }, [isLogged])

  if (loadingAuth || loading) return <Spinner />

  return isLogged && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  )
}

export default AdminOnly
