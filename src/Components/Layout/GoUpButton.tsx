import { useScroll } from "../../Hooks/useScroll"
import { useEffect, useState } from "react"
import React from "react"
import { CaretUp } from "phosphor-react"

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
        className="btn btn-sm btn-primary btn-outline rounded-full p-0 w-10 h-10 flex items-center justify-center"
        onClick={() =>
          windowRef.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <CaretUp size={20} weight="bold" />
      </button>
    </div>
  )
}

export default GoUpButton
