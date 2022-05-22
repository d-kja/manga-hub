import React from "react";

import Carousel from "../Layout/Carousel/Carousel";
import MangaList from "../Layout/Manga/MangaList";

import { motion } from "framer-motion";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Link } from "react-router-dom";

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
            <div className="divider mx-20 mb-12 font-light text-2xl">
                UPDATES{" "}
                <LocalFireDepartmentIcon
                    className="-ml-2 hover:text-red-700"
                    sx={{ fontSize: 17 }}
                />
            </div>
            <MangaList />
            <div className="divider mt-24 font-light text-2xl">
                <Link
                    to="/list"
                    className="btn font-bold text-2xl btn-ghost -mt-5 btn-lg m-auto btn-wide hover:outline hover:outline-primary-focus hover:outline-offset-4"
                >
                    More
                </Link>
            </div>
        </motion.div>
    );
}

export default Home;
