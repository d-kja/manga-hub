import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";

import { motion } from "framer-motion";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { toast } from "react-toastify";
import { GoogleOAuth } from "../Layout/OAuth";

function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = formData;
    const auth = getAuth();
    const nav = useNavigate();

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userRef = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userRef.user;
            updateProfile(auth.currentUser, { displayName: name });

            const copyFormData = { ...formData };
            delete copyFormData.password;
            copyFormData.timestamp = serverTimestamp();

            await setDoc(doc(db, "users", user.uid), copyFormData);

            toast.success(
                "Nice, all done! Now you can enjoy your reading smoothly",
                {
                    theme: "dark",
                }
            );
            nav("/");
        } catch (error) {
            toast.error("Unable to complete action", {
                theme: "dark",
            });
        }
    };

    return (
        <motion.div
            initial={{ y: 75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
                delay: 0.3,
            }}
            className="lg:max-w-screen-2xl relative mx-auto"
        >
            <div className="grid items-center mt-6 text-white">
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="grid items-center">
                            <LocalFireDepartmentIcon
                                sx={{
                                    height: 50,
                                    width: 50,
                                    margin: "auto",
                                    marginBottom: 2,
                                }}
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                                Sign up right NOW, MADGE
                            </h2>
                        </div>
                        <form
                            className="mt-8 space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label
                                        htmlFor="user-name"
                                        className="sr-only"
                                    >
                                        User name
                                    </label>
                                    <input
                                        id="name"
                                        value={name}
                                        name="username"
                                        type="text"
                                        autoComplete="off"
                                        required
                                        onChange={handleFormChange}
                                        className="appearance-none rounded-none relative inline-block w-full px-3 border border-gray-300 placeholder-gray-500 py-3 font-semibold text-zinc-800 sm:text-md rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 "
                                        placeholder="User name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email-address"
                                        className="sr-only"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        autoComplete="email"
                                        required
                                        onChange={handleFormChange}
                                        className="appearance-none rounded-none relative inline-block w-full px-3 border border-gray-300 placeholder-gray-500 py-3 font-semibold text-zinc-800 sm:text-md rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 "
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
                                        type="password"
                                        value={password}
                                        onChange={handleFormChange}
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative inline-block w-full px-3  border border-gray-300 placeholder-gray-500 py-3 font-semibold text-zinc-800 sm:text-md rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 "
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
                                        to="/signIn"
                                        className="font-medium text-lg text-primary hover:text-primary"
                                    >
                                        Sign-In instead
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
    );
}

export default SignUp;
