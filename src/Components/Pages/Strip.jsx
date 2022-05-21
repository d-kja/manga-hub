import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Disqus from "disqus-react";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { CircularProgress as Spinner } from "@mui/material";
import { motion } from "framer-motion";

import mangaContext from "../Context/Mangas/MangaContext";
import { fetchManga } from "../Context/Mangas/MangaActions";

function Strip() {
    const par = useParams();
    const nav = useNavigate();

    const { loading, manga, dispatch } = useContext(mangaContext);

    useEffect(() => {
        if (par.chapId > manga.chapters.length || par.chapId === undefined) {
            nav("/notfound");
        } else {
            dispatch({ type: "SET_LOADING" });
            const fetchData = async (id) => {
                // eslint-disable-next-line
                const { id: idx, data: mangaRef } = await fetchManga(id);
                dispatch({
                    type: "SET_MANGA",
                    payload: mangaRef,
                });
            };

            fetchData(par.id);
        }
        console.log(manga);

        // eslint-disable-next-line
    }, []);

    return loading ? (
        <div
            className="grid place-items-center"
            style={{
                minHeight: 300,
            }}
        >
            <Spinner color="inherit" />
        </div>
    ) : (
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
            <div className="mangapage--banner mx-5">
                <div className="my-12">
                    <img
                        src={manga.banner}
                        className="rounded-3xl"
                        style={{
                            filter: `grayscale(${65}%)`,
                        }}
                        alt="manga banner"
                    />
                </div>
            </div>
            <p className="font-light text-4xl text-center">{manga.name}</p>

            <div className="divider mx-5 mt-20 font-light text-2xl">
                <ArrowLeftIcon /> {manga.chapters[par.chapId].title}
                <ArrowRightIcon />
            </div>
            <div className="mangapage--table mt-12">
                {manga.chapters[par.chapId].strip.map((item, idkey) => (
                    <img
                        src={item}
                        key={idkey}
                        alt="manga strip"
                        className="w-full rounded-md"
                    />
                ))}
            </div>

            <Disqus.DiscussionEmbed
                className="mt-24"
                shortname="ny-manga-hub"
                config={{
                    url: "https://ny-manga-app.vercel.app",
                    identifier: `${manga.name}-${par.chapId}`,
                    title: `${manga.name}, CH. ${par.chapId}`,
                }}
            />
        </motion.div>
    );
}

export default Strip;
