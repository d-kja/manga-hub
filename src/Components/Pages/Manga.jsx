import React from "react";

import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import MangaButton from "../Layout/Manga/MangaButton";

function Manga() {
    const params = useParams();
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
            className="lg:max-w-screen-2xl relative "
        >
            <div className="mangapage--banner">
                <div className="block my-12"></div>
            </div>
            <div className="">
                <p className="font-light text-4xl text-center">{params.id}</p>
                <div>
                    <div className="mx-5 lg:mx-72 md:mx-72 mt-20 font-light text-2xl">
                        <span className="font-bold">Synopsis: </span> Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Earum
                        deserunt tenetur rerum nesciunt doloremque sequi natus
                        debitis consectetur commodi sunt, pariatur autem vel
                        consequatur nostrum architecto labore eaque! Libero,
                        aliquam.
                    </div>
                    <div className="mx-5 lg:mx-72 md:mx-72 mt-7 font-light text-2xl">
                        <span className="font-bold">Tags: </span> adventure,
                        reincarnation, rpg, isekai...
                    </div>
                </div>
            </div>

            <div className="divider mx-5 lg:mx-72 md:mx-72 mt-20 font-light text-2xl">
                <ArrowLeftIcon /> Chapters <ArrowRightIcon />
            </div>
            <div className="mangapage--table mx-5 lg:mx-72 md:mx-72 mt-12 grid grid-cols-2 gap-x-12 gap-y-7">
                <MangaButton />
                <MangaButton />
                <MangaButton />
                <MangaButton />
                <MangaButton />
                <MangaButton />
            </div>
        </motion.div>
    );
}

export default Manga;
