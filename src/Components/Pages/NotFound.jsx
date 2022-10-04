import React from "react"
import { Link } from "react-router-dom"

import { FaHome } from "react-icons/fa"
import { motion } from "framer-motion"

function NotFound() {
  return (
    <motion.div
      initial={{ y: 75, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        ease: "easeIn",
      }}
      className="hero"
      style={{
        minHeight: 670,
      }}
    >
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <p className="text-4xl mb-8">
            404 - Page Not Found
          </p>
          <Link className="btn btn-ghost btn-lg" to="/">
            <span className="flex items-center gap-2">
              <FaHome /> BACK TO HOME
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFound
