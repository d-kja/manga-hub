import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { useCheckStatus } from "../../../Hooks/useCheckStatus"
import { Eye, Star } from "phosphor-react"

export const MangaWideContainer = ({
  img,
  name,
  id,
  rating,
  chap,
  status,
  clicks,
  customStyle,
}: {
  img: any
  name: any
  id: any
  rating: any
  chap: any
  status: any
  clicks: any
  customStyle?: any
}) => {
  const { myStatus, checkStatus } = useCheckStatus(status)
  return (
    <motion.li
      className="overflow-hidden w-full shadow-lg drop-shadow-lg hover:shadow-md hover:drop-shadow-md transition-shadow list-none"
      variants={{
        hidden: { opacity: 0, y: 75 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        // @ts-ignore
        type: "spring",
        // @ts-ignore
        stiffness: 100,
        // @ts-ignore
        ease: "easeIn",
      }}
    >
      <div
        className={`card w-full border border-base-300/70 bg-base-300/25`}
      >
        <Link
          to={`/mangas/${id}`}
          className="card-body px-6 py-4 flex flex-row gap-4 relative"
        >
          <img
            className="w-[4.5rem] object-cover object-center rounded grayscale-[70%]"
            src={img}
            alt="manga banner"
          />

          <div className="flex flex-col gap-1 my-auto flex-grow">
            <h1 className="card-title text-sm font-semibold w-full">
              {name}
            </h1>
            <span
              className={`badge badge-sm font-medium badge-${checkStatus(
                status
              )} badge-outline rounded-lg mr-2`}
            >
              {myStatus.current}
            </span>
            <span className="badge badge-ghost font-medium badge-sm px-2 m-0 ml-auto flex items-center gap-1">
              <Star
                className="fill-amber-300 m-0 p-0"
                weight="fill"
              />
              <span className="text-2xs">
                {rating.totalRating === 0
                  ? 0
                  : (
                      +rating?.totalRating! /
                      +rating?.totalUsers!
                    ).toFixed(0)}
              </span>
            </span>
            {clicks && (
              <div className="badge badge-ghost ml-auto mt-auto badge-sm font-medium flex items-center gap-1 text-sm">
                <Eye weight="fill" />
                <span className="text-2xs">
                  {clicks?.length ?? 0}
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </motion.li>
  )
}
