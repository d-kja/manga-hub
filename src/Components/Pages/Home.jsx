import React from "react"
import { Link } from "react-router-dom"

import Carousel from "../Layout/Carousel/Carousel"
import MangaList from "../Layout/Manga/MangaList"

import { motion } from "framer-motion"
import { PopularList } from "../Layout/Manga/PopularList"
import { CommingSoonList } from "../Layout/Manga/CommingSoonList"
import { MdOutlineLocalFireDepartment } from "react-icons/md"

function Home() {
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
      className="min-h-screen mb-12 mt-2"
    >
      <div>
        <Carousel />
      </div>
      <div className="my-12">
        <div className="w-full max-w-screen-xl mx-auto my-8 grid grid-cols-3 md:grid-cols-4">
          <div className="col-span-3">
            <div className="divider px-8">
              <MdOutlineLocalFireDepartment className="w-12" />
              New releases
            </div>

            <MangaList fromHome={true} />
          </div>
          <PopularList />
        </div>

        <div className="divider max-w-screen-xl mx-auto my-12 mb-16">
          <Link
            to="/list"
            className="btn btn-ghost -mt-5 m-auto px-10 hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1"
          >
            More
          </Link>
        </div>

        <div className="col-span-2 md:col-span-1 w-full flex flex-col gap-2 justify-center items-center">
          <h4 className="text-lg font-bold mb-2 uppercase border-b border-base-300">
            Comming soon
          </h4>

          <div className="w-[100%]">
            <div className="flex px-4 gap-4 flex-col mx-auto max-w-screen-md">
              <CommingSoonList />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home
