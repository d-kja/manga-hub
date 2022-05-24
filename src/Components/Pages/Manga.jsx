import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MangaContext from "../Context/Mangas/MangaContext";
import { fetchManga } from "../Context/Mangas/MangaActions";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { CircularProgress, Rating } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

import MangaButton from "../Layout/Manga/MangaButton";
import useStorage, {
    checkExpiredStorageItem,
    getFromStorage,
    setExpirationDate,
} from "../../Hooks/useStorage";

function Manga() {
    const { storageItem: strBookmarks, updateStorageItem: updateStrBookmarks } =
        useStorage({
            key: "bookmarks",
            data: [],
        });
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

    const [bookmark, setBookmark] = useState(checkStorageObj(manga.myId));
    const [rating, setRating] = useState(5);

    const handleBookmarkClick = () => {
        setBookmark((prev) => !prev);
        const ifStored = checkStorageObj(manga.myId);
        if (manga && !ifStored && bookmark !== true) {
            updateStrBookmarks((prev) => {
                if (strBookmarks instanceof Array) {
                    return {
                        key: "bookmarks",
                        data: [...prev, manga],
                    };
                } else {
                    return {
                        key: "bookmarks",
                        data: [...prev.data, manga],
                    };
                }
            });
        } else {
            try {
                let temp;
                let result = [];
                if (strBookmarks instanceof Array) {
                    temp = [...strBookmarks];
                    temp.forEach((element, idx) => {
                        if (element.myId !== params.id) result.push(element);
                    });
                } else {
                    const { data: itemData } = strBookmarks;
                    temp = [...itemData];
                    temp.forEach((element, idx) => {
                        if (element.myId !== params.id) result.push(element);
                    });
                }
                updateStrBookmarks((prev) => ({
                    key: "bookmarks",
                    data: result,
                }));
            } catch (error) {
                console.error(error);
            }
        }
    };
    // strBookmarks.map((element) => (element.myId !== params.id && element));
    function checkStorageObj(key, id) {
        // Checking twice cus if it isn't there it always returns both key and data
        try {
            let temp = false;
            if (strBookmarks instanceof Array) {
                strBookmarks.forEach((element) => {
                    if (element.myId === params.id) temp = true;
                });
            } else {
                const { data: itemData } = strBookmarks;
                itemData.forEach((element) => {
                    if (element.myId === params.id) temp = true;
                });
            }

            return temp;
        } catch (error) {
            console.error(error);
        }
    }

    const handleRatingClick = ({ value }) => {
        setRating(value);
    };

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

            setRating(
                mangaRef.rating.totalRating / mangaRef.rating.totalUsers / 2
            );

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
            <div className="flex md:flex-row flex-col lg:max-w-[1100px] mx-auto">
                <div className="mangapage--banner flex-shrink-0 md:mt-12 md:mb-5 md:mx-7 transition-all grayscale-0 hover:grayscale">
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
                        <div className="flex mt-5">
                            <Rating
                                defaultValue={+rating}
                                name="simple-controlled"
                                value={+rating}
                                className="m-auto"
                                onChange={(e) => {
                                    handleRatingClick(e.target);
                                }}
                                size="large"
                            />
                        </div>
                        <div className="flex justify-end mr-24">
                            <div
                                className="btn btn-ghost hover:text-primary"
                                onClick={handleBookmarkClick}
                            >
                                {bookmark ? (
                                    <BookmarkAddedIcon
                                        sx={{ fontSize: 25 }}
                                        className="text-primary-focus"
                                    />
                                ) : (
                                    <BookmarkAddIcon sx={{ fontSize: 25 }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divider mx-5 lg:mx-72 md:mx-72 font-light text-2xl">
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
