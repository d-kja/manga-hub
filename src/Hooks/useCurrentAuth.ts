import { useState, useEffect, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const useCurrentAuth = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const isMounted = useRef(true)
  const nav = useNavigate()

  useEffect(() => {
    const handleUser = async () => {
      if (isMounted) {
        const auth = getAuth()
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLogged(true)
          }
          setIsLoading(false)
        })
      }
    }

    handleUser()

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { isLogged, isLoading }
}
