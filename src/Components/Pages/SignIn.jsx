import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { GoogleOAuth } from "../Layout/OAuth"

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  const nav = useNavigate()

  const handleFormChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredentials =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
      if (userCredentials.user) {
        toast.success("Done, you are logged in!", {
          theme: "dark",
        })
        nav("/")
      }
    } catch (error) {
      toast.error("Error, invalid credentials", {
        theme: "dark",
      })
    }
  }

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
      exit={{ opacity: 0 }}
      className="lg:max-w-screen-2xl relative mx-auto text-zinc-800"
    >
      <div className="grid items-center mt-6 ">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="grid items-center">
              <LocalFireDepartmentIcon
                className="text-white"
                sx={{
                  height: 50,
                  width: 50,
                  margin: "auto",
                  marginBottom: 2,
                }}
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Sign in to your account
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="remember"
                value="true"
              />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label
                    htmlFor="email"
                    className="sr-only"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={email}
                    type="email"
                    onChange={handleFormChange}
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative inline-block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 font-semibold text-zinc-800 sm:text-md rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="sr-only"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    value={password}
                    type="password"
                    onChange={handleFormChange}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative inline-block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 font-semibold text-zinc-800 sm:text-md rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link
                    to="/forgotPassword"
                    className="font-medium text-lg text-primary hover:text-primary"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-white btn-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-primary group-hover:text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-sm">
                  <Link
                    to="/signUp"
                    className="font-medium text-lg text-primary hover:text-primary"
                  >
                    Sign-Up instead
                  </Link>
                </div>
              </div>
            </form>
            <div className="flex items-center justify-center">
              <GoogleOAuth />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SignIn
