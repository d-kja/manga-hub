import React from "react";
import { Link } from "react-router-dom";

import Carousel from "../Layout/Carousel/Carousel";
import MangaList from "../Layout/Manga/MangaList";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { motion } from "framer-motion";
import { PopularList } from "../Layout/Manga/PopularList";
import { CommingSoonList } from "../Layout/Manga/CommingSoonList";

function Home() {
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
            <div className="pagePadding--upright overflow-off">
                <Carousel />
            </div>
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 md:grid-cols-3 mx-auto">
                    <div className="lg:col-span-2 col-span-3">
                        <div className="divider mx-20 mb-12 font-light text-2xl">
                            UPDATES{" "}
                            <LocalFireDepartmentIcon
                                className="-ml-2 hover:text-red-700"
                                sx={{ fontSize: 17 }}
                            />
                        </div>
                        <MangaList fromHome={true} />
                    </div>
                    <PopularList />
                </div>
                <div className="divider mt-24 font-light text-2xl">
                    <Link
                        to="/list"
                        className="btn font-bold text-2xl btn-ghost -mt-5 btn-lg m-auto btn-wide hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1"
                    >
                        More
                    </Link>
                </div>
                <div className="flex flex-col p-14 pt-0 mt-16  rounded-xl min-w-full">
                    <div className="bg-neutral bg-opacity-25 rounded-lg p-5 flex flex-col items-center">
                        <div className="m-auto font-light text-2xl">
                            <div
                                to="/list"
                                className="btn font-bold text-2xl btn-ghost btn-lg m-auto hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1"
                            >
                                Comming Soon
                            </div>
                        </div>
                        <div className="my-7 border-zinc-700 border-opacity-40"></div>
                        <CommingSoonList />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Home;
