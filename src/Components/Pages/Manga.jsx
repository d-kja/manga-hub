import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MangaContext from "../Context/Mangas/MangaContext";
import { fetchManga } from "../Context/Mangas/MangaActions";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { CircularProgress } from "@mui/material";

import MangaButton from "../Layout/Manga/MangaButton";

function Manga() {
    const params = useParams();
    const nav = useNavigate();

    const { manga, loading, dispatch } = useContext(MangaContext);

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const fetchData = async (id) => {
            // eslint-disable-next-line
            const { id: mangaId, data: mangaData } = await fetchManga(id);
            dispatch({
                type: "SET_MANGA",
                payload: mangaData,
            });

            if (mangaData === null) {
                toast.error("Couldn't find item", {
                    theme: "dark",
                });
                nav("/notfound");
            }
        };
        fetchData(params.id);
        // eslint-disable-next-line
    }, []);

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
            className="lg:max-w-screen-2xl relative mx-auto"
        >
            <div className="mangapage--banner">
                <div className="flex my-12 mx-16">
                    <img
                        src={manga.banner}
                        alt="temp banner"
                        style={{
                            height: "100%",
                            filter: `grayscale(${65}%)`,
                        }}
                        className="rounded-3xl"
                    />
                </div>
            </div>
            <div className="">
                <p className="font-light text-4xl text-center">{manga.name}</p>
                <div>
                    <div className="mx-5 lg:mx-72 md:mx-72 mt-20 font-light text-2xl">
                        <span className="font-bold">Synopsis: </span>
                        {manga.others.synopsis}
                    </div>
                    <div className="mx-5 lg:mx-72 md:mx-72 mt-7 font-light text-2xl">
                        <span className="font-bold">Tags: </span>
                        {manga.others.tags.map((item, idx) => {
                            return (
                                <div
                                    className="badge badge-neutral ml-3 text-xl"
                                    key={idx}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="divider mx-5 lg:mx-72 md:mx-72 mt-20 font-light text-2xl">
                <ArrowLeftIcon /> Chapters <ArrowRightIcon />
            </div>
            <div className="mangapage--table mx-5 lg:mx-72 md:mx-72 mt-12 grid grid-cols-2 gap-x-12 gap-y-7">
                {manga.chapters.map((item, idx) => (
                    <MangaButton
                        id={params.id}
                        key={idx}
                        chapId={idx}
                        title={item.title}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default Manga;
