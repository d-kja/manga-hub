import React from "react";
import Carousel from "../Base/Carousel";
import MangaList from "../Layout/MangaList";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { motion } from "framer-motion";

function Home() {
    return (
        <motion.div
            initial={{ x: 75, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
            }}
        >
            <div className="pagePadding--upright overflow-off">
                <Carousel />
            </div>
            <div className="divider mx-20 mb-7 font-light text-2xl">
                UPDATES{" "}
                <LocalFireDepartmentIcon
                    className="-ml-2 hover:text-red-700"
                    sx={{ fontSize: 17 }}
                />
            </div>
            <MangaList />
        </motion.div>
    );
}

export default Home;
