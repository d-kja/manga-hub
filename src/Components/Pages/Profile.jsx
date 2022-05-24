import React, { useState } from "react";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

import { toast } from "react-toastify";
import { motion } from "framer-motion";

import Bookmarks from "./Bookmarks";

function Profile() {
    const auth = getAuth();

    const [changeBtn, setChangeBtn] = useState(false);
    const [user, setUser] = useState({
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
    });

    const { email, name, photoURL } = user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!changeBtn) {
                const docRef = doc(db, "users", auth.currentUser.uid);

                if (
                    auth.currentUser.email !== email &&
                    auth.currentUser.name !== name
                ) {
                    await updateProfile(auth.currentUser, {
                        displayName: name,
                        // photoURL, {TODO}
                    });
                    await updateEmail(auth.currentUser, email);
                    await updateDoc(docRef, {
                        email,
                        name,
                    });
                }

                toast.success("User updated!", { theme: "dark" });
            }
        } catch (error) {
            toast.error("Couldn't update user information", { theme: "dark" });
        }
    };

    const handleChange = (e) => {
        const { value, id } = e.target;

        setUser((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <motion.div
            initial={{ y: 75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
            }}
            className="lg:max-w-screen-lg md:max-w-full w-full mx-auto"
        >
            <div className="py-12 px-7 flex flex-row gap-6 relative">
                <div
                    className="relative top-7 w-fit h-fit outline outline-primary hover:outline-purple-700 outline-offset-2 outline-2 rounded-full
                transition-all ease-in-out duration-700
            "
                >
                    <img
                        className="mask mask-circle hover:grayscale"
                        src={photoURL ?? "https://i.imgur.com/7fTGOOK.jpeg"}
                        width={125}
                        height={125}
                        loading="lazy"
                        alt="user icon"
                    />
                </div>

                <form onSubmit={handleSubmit} className="ml-5">
                    <button
                        className="btn btn-ghost hover:outline hover:outline-primary hover:outline-offset-2 hover:outline-1 absolute right-10 top-10 font-bold text-lg"
                        onClick={() => setChangeBtn((prev) => !prev)}
                        type="submit"
                    >
                        {!changeBtn ? "Change" : "Done"}
                    </button>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-lg">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            id="name"
                            onChange={handleChange}
                            className="input input-bordered input-lg input-ghost w-full max-w-xs"
                            disabled={!changeBtn}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs mt-5">
                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input
                            type="Email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            id="email"
                            onChange={handleChange}
                            disabled={!changeBtn}
                            className="input input-bordered input-lg input-ghost w-full max-w-xs"
                        />
                    </div>
                </form>
            </div>
            <div className="divider mt-12 font-light text-2xl">
                <div
                    to="/list"
                    className="btn font-bold text-lg btn-ghost -mt-3 m-auto btn-wide hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1"
                >
                    Mangas
                </div>
            </div>
            <Bookmarks />
        </motion.div>
    );
}

export default Profile;
