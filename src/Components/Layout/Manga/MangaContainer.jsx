import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function MangaContainer({ img, name, id, rating, chap }) {
  return (
    <motion.li
      className="uppercase relative h-72 w-48 rounded-lg transition-shadow shadow-lg drop-shadow-lg hover:shadow-md hover:drop-shadow-md bg-base-300 hover:text-red-700"
      variants={{
        hidden: { opacity: 0, y: 75 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        ease: "easeIn",
      }}
    >
      <div className="relative p-2">
        <Link to={`/mangas/${id}`} className="">
          <img
            className="w-[98%] h-60 object-cover object-center mx-auto relative rounded-lg grayscale-[70%]"
            src={img}
            alt="manga banner"
          />
        </Link>

        {chap.length > 0 && (
          <>
            <Link
              to={`/mangas/${id}/chapter/${
                chap.length - 1
              }`}
              className={`rounded-lg btn btn-sm bg-base-300 absolute left-4 ${
                chap.length > 1 ? "bottom-14" : "bottom-4"
              } font-light`}
            >
              {chap[chap.length - 1].title}
            </Link>
            {chap.length > 1 && (
              <Link
                to={`/mangas/${id}/chapter/${
                  chap.length - 2
                }`}
                className={
                  "rounded-lg btn btn-sm bg-base-300 absolute left-4 bottom-4 font-light"
                }
              >
                {chap[chap.length - 2].title}
              </Link>
            )}
          </>
        )}
      </div>
      <p className="text-center mb-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {name}
      </p>
    </motion.li>
  )
}

export default MangaContainer
