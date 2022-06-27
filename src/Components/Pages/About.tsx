import React from "react"
import { motion } from "framer-motion"

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
            <div className="max-w-md">
                This page was built with the idea of distributing translated
                (CC) mangas for the community
            </div>
            <div className="btn btn-ghost btn-lg mt-7">Click me</div>
        </motion.div>
    )
}

export default About
