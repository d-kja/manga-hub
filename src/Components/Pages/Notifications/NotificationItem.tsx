import { ArrowSquareOut, CaretRight } from "phosphor-react"
import React from "react"
import { Link } from "react-router-dom"

interface NotificationItemProps {
  img: string
  name: string
  msg: string
  link: string
}

export const NotificationItem = ({
  img,
  name,
  msg,
  link,
}: NotificationItemProps) => {
  return (
    <Link
      to={link}
      className="link link-hover font-normal flex flex-col md:flex-row hover:bg-base-300 transition-colors duration-300 relative px-6 py-2 gap-6 items-center border-b border-base-200"
    >
      <ArrowSquareOut
        size={16}
        weight="bold"
        className="absolute right-2 top-2"
      />
      <div className="flex flex-col items-center gap-2">
        <img
          src={img}
          alt="manga cover"
          className="mt-1 w-20 md:w-28 ring-1 ring-offset-2 ring-offset-base-100 border border-primary/25 ring-primary rounded"
        />
        <span className="font-semibold capitalize">
          {name.toLocaleLowerCase()}
        </span>
      </div>
      <span className="">{msg}</span>
    </Link>
  )
}
