import React, { useEffect, useState } from "react"
import { createContext, ReactNode } from "react"
import { useLocation } from "react-router-dom"

interface LoadingContext {
  loading: boolean
}

export const LoadingContext = createContext(
  {} as LoadingContext
)

export function LoadingProvider({
  children,
}: {
  children: ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }, [location])

  return (
    <LoadingContext.Provider
      value={{
        loading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}
