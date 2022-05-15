import React from "react";

import { motion } from "framer-motion";
import MangaList from "../Layout/Manga/MangaList";

function SearchManga() {
    return (
        <motion.div
            initial={{ y: 75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
            }}
        >
            <div>
                <div className="flex gap-5 justify-center my-12">
                    <div className="form-control">
                        <div className="input-group input-group-lg">
                            <input
                                type="text"
                                placeholder="Search title…"
                                className="input input-lg input-bordered"
                            />
                            <button className="btn btn-square btn-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <select className="select select-bordered select-lg w-full max-w-xs">
                        <option defaultValue value={null}>
                            Select Theme
                        </option>
                        <option>THEME 1</option>
                        <option>THEME 2</option>
                        <option>THEME 3</option>
                    </select>
                </div>
                <div className="divider"></div>
                <div className="my-16">
                    <MangaList />
                </div>
            </div>
        </motion.div>
    );
}

export default SearchManga;
