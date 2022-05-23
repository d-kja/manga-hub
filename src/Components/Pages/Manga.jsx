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
import useStorage, {
    checkExpiredStorageItem,
    getFromStorage,
    setExpirationDate,
} from "../../Hooks/useStorage";

function Manga() {
    const params = useParams();
    const nav = useNavigate();

    const { manga, loading, dispatch } = useContext(MangaContext);
    const { updateStorageItem } = useStorage({
        key: "manga",
        data: {
            items: manga,
            expire: setExpirationDate(new Date().getTime()),
        },
    });

    useEffect(() => {
        const fetchData = async (id) => {
            dispatch({ type: "SET_LOADING" });
            let mangaRef;
            const fetchStorage = getFromStorage("manga");

            if (
                fetchStorage &&
                !checkExpiredStorageItem("manga") &&
                fetchStorage.myId === params.id
            ) {
                const { items } = fetchStorage;
                mangaRef = items;
            } else {
                const { id: mangaId, data: mangaData } = await fetchManga(id);
                mangaData.myId = mangaId;
                mangaRef = mangaData;
                updateStorageItem({
                    key: "manga",
                    data: {
                        items: mangaData,
                        expire: setExpirationDate(new Date().getTime()),
                    },
                });
            }
            dispatch({
                type: "SET_MANGA",
                payload: mangaRef,
            });

            if (mangaRef === null) {
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
            <div className="flex md:flex-row flex-col">
                <div className="mangapage--banner flex-shrink-0 md:my-12 md:mx-7 transition-all grayscale hover:grayscale-0">
                    <div className="flex items-center justify-center m-5 ">
                        <img
                            src={manga.bannerSmall}
                            alt="temp banner"
                            style={{
                                height: "100%",
                                filter: `grayscale(${65}%)`,
                            }}
                            className="rounded-3xl md:max-w-sm max-w-lg"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="font-light text-4xl text-center">
                        {manga.name}
                    </p>
                    <div>
                        <div className="mx-12 md:mx-5 md:mt-12 mt-20 font-light text-2xl">
                            <span className="font-bold">Synopsis: </span>
                            {manga.others.synopsis}
                        </div>
                        <div className="mx-12 md:mx-5 mt-7 font-light text-2xl">
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
