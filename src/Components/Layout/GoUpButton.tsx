import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { useScroll } from "../../Hooks/useScroll"
import { useEffect, useState } from "react"
import React from "react"

interface GoUpButtonProps {
  windowRef: Window
}

function GoUpButton({ windowRef }: GoUpButtonProps) {
  const scrollOffSetCurrentValue = useScroll()
  const [oldValue, setOldValue] = useState(
    scrollOffSetCurrentValue
  )
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (
      oldValue > scrollOffSetCurrentValue &&
      scrollOffSetCurrentValue > 500
    ) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
    setOldValue(scrollOffSetCurrentValue)

    //eslint-disable-next-line
  }, [scrollOffSetCurrentValue])

  return (
    <div
      className={`fixed right-7 bottom-12 z-50 animate-bounce delay-150 duration-700 ease-in-out transition-all ${
        !isVisible ? "opacity-0 invisible" : "opacity-100"
      }`}
    >
      <button
        className="btn btn-secondary btn-circle btn-outline rounded-full h-12 w-12 p-0 m-auto"
        onClick={() =>
          windowRef.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <KeyboardArrowUpIcon className="m-0 p-0 w-[40px] h-[40px] font-bold" />
      </button>
    </div>
  )
}

export default GoUpButton
