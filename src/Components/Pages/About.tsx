import React from "react"
import { motion } from "framer-motion"

import Tilt from "react-parallax-tilt"

function About() {
  return (
    <motion.div
      initial={{ y: 75, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        {
          type: "spring",
          stiffness: 100,
          ease: "easeIn",
          delay: 1.5,
        } as any
      }
      style={{
        minHeight: "calc(100vh - (  60px + 149px))",
      }}
      className="flex flex-col max-w-screen-md mx-auto"
    >
      <div className="h-full flex flex-col items-center gap-4 mt-12 mx-2 w-full">
        <div className="m-5 ">
          <h3 className="font-bold text-lg uppercase">
            Basic information
          </h3>

          <div className="flex flex-col gap-8 mt-6 font-medium">
            <div>
              <h4 className="opacity-60 uppercase text-sm mb-2">
                Description
              </h4>
              <p className="w-fit leading-relaxed">
                <span className="text-md">
                  A web app meant to provide translated
                  mangas, though the current implementation
                  just shows a simple template.
                </span>
              </p>
            </div>

            <div>
              <h1 className="opacity-60 uppercase text-sm">
                Contact
              </h1>
              <p className="flex items-center gap-2 w-fit leading-relaxed">
                <a
                  href="https://github.com/Nyyu"
                  className="text-md link link-hover"
                >
                  Github
                </a>
              </p>
            </div>
          </div>
        </div>
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
