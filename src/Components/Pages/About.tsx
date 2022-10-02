import React from "react"
import { motion } from "framer-motion"

import Tilt from "react-parallax-tilt"

function About() {
  return (
    <motion.div
      initial={{ y: 75, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        stiffness: 100,
        ease: "easeIn",
      }}
      style={{
        minHeight: "calc(100vh - (  60px + 149px))",
      }}
      className="flex justify-center items-center flex-col"
    >
      <div className="max-w-md h-full flex flex-col gap-4 mt-12">
        <span className="font-light text-sm mx-auto">
          Card to play with
        </span>
        <Tilt
          className="track-on-window"
          perspective={500}
          glareEnable={true}
          glareMaxOpacity={0.75}
          glarePosition="all"
          scale={1.02}
        >
          <div className="inner-element rounded-lg w-96">
            <img
              src="ny.png"
              alt="tilting card"
              className="rounded-lg"
            />
          </div>
        </Tilt>
      </div>
    </motion.div>
  )
}

export default About
