import { useEffect, useState } from "react"

export const useScroll = () => {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset)
        // clean up code
        window.removeEventListener("scroll", onScroll)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return offset
}
