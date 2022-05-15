import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import MangaButton from "../Layout/Manga/MangaButton";
import { CircularProgress } from "@mui/material";

function Manga() {
    const [manga, setManga] = useState({
        id: "",
        data: {},
    });
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async (id) => {
            const mangaRef = doc(db, "mangas", id);
            const mangaSnap = await getDoc(mangaRef);

            if (mangaSnap.exists()) {
                setManga({
                    id: mangaSnap.id,
                    data: mangaSnap.data(),
                });
            } else {
                toast.error("Couldn't find item", {
                    theme: "dark",
                });
                nav("/notfound");
            }
            setLoading(false);
        };

        fetchData(params.id);
    }, [params.id, nav]);

    return loading ? (
        <div
            className="grid place-items-center"
            style={{
                minHeight: 300,
            }}
        >
            <CircularProgress color="inherit" />
        </div>
    ) : (
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
                <div className="block my-12">
                    <img
                        src={manga.data.banner}
                        alt="temp banner"
                        style={{
                            height: "100%",
                        }}
                    />
                </div>
            </div>
            <div className="">
                <p className="font-light text-4xl text-center">
                    {manga.data.name}
                </p>
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
