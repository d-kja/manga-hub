import React, { useEffect, useState } from "react";
import ReactSelect from "../Layout/ReactSelect";

import {
    serverTimestamp,
    doc,
    updateDoc,
    getDocs,
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useUploadImage } from "../../Hooks/useUploadImage";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Composer() {
    const [mangas, setMangas] = useState([]);
    const [currentManga, setCurrentManga] = useState(null);
    const [mangaChapter, setMangaChapter] = useState({
        strip: [],
        title: "",
    });
    const [formDataCreate, setFormDataCreate] = useState({
        name: "",
        banner: "",
        bannerSmall: "",
        chapters: [],
        others: {
            synopsis: "",
            tags: [],
        },
        rating: {
            totalRating: 0,
            totalUsers: 0,
        },
        clicks: [],
        status: 0,
        timestamp: null,
    });
    const [formDataUpdate, setFormDataUpdate] = useState({
        name: "",
        banner: "",
        bannerSmall: "",
        chapters: [],
        others: {
            synopsis: "",
            tags: [],
        },
        rating: {
            totalRating: 0,
            totalUsers: 0,
        },
        clicks: [],
        status: 0,
        timestamp: null,
        lastUpdate: null,
    });

    const { name, banner, bannerSmall, others, status } = formDataCreate;
    const {
        name: nameUpdate,
        banner: bannerUpdate,
        bannerSmall: bannerSmallUpdate,
        others: othersUpdate,
        status: statusUpdate,
    } = formDataUpdate;
    const { synopsis } = others;
    const { synopsis: synopsisUpdate } = othersUpdate;
    const { title } = mangaChapter;
    const { upload } = useUploadImage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const temp = [];
                const mangasSnap = await getDocs(collection(db, "mangas"));

                if (mangasSnap) {
                    mangasSnap.forEach((item) =>
                        temp.push({
                            id: item.id,
                            data: item.data(),
                        })
                    );
                }

                setMangas(temp);
            } catch (error) {
                toast.error(
                    "Couldn't fill up 'select manga' options with firebase data, for more info use console",
                    { theme: "dark" }
                );
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleFormCreate = async (e) => {
        e.preventDefault();

        const bannerUrl = await upload(banner, "mangas");
        const bannerSmallUrl = await upload(bannerSmall, "mangas");

        const formDataDupe = { ...formDataCreate };

        formDataDupe.banner = bannerUrl;
        formDataDupe.bannerSmall = bannerSmallUrl;
        formDataDupe.status = +formDataDupe.status;
        formDataDupe.timestamp = serverTimestamp();

        const docRef = collection(db, "mangas");
        await addDoc(docRef, formDataDupe);
        toast.success("Item added", { theme: "dark" });
    };

    const handleChangeDataCreate = (e) => {
        const { id, value, files } = e.target;

        if (files) {
            setFormDataCreate((prev) => ({
                ...prev,
                [id]: files[0],
            }));
        }

        if (!files) {
            setFormDataCreate((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };
    const handleChangeDataCreateNested = (e) => {
        const { id, value } = e.target;
        setFormDataCreate((prev) => ({
            ...prev,
            others: {
                ...prev.others,
                [id]: value,
            },
        }));
    };
    const handleMultipleInput = (items) => {
        const temp = [];
        items.map((item) => temp.push(item.value));
        setFormDataCreate((prev) => ({
            ...prev,
            others: {
                ...prev.others,
                tags: temp,
            },
        }));
    };

    const handleFormUpdate = async (e) => {
        e.preventDefault();

        try {
            const stripImages = await Promise.all(
                [...mangaChapter.strip].map((item) =>
                    upload(item, "mangaChapters")
                )
            ).catch((error) => console.error(error));

            const formDataDupe = { ...formDataUpdate };
            setMangaChapter((prev) => ({ ...prev, strip: stripImages }));

            formDataDupe.status = +formDataDupe.status;
            !formDataDupe.timestamp &&
                (formDataDupe.timestamp = serverTimestamp());
            formDataDupe.lastUpdate = serverTimestamp();
            formDataDupe.chapters = [
                ...formDataUpdate.chapters,
                { title: mangaChapter.title, strip: stripImages },
            ];
            console.log(formDataDupe);

            const docRef = doc(db, "mangas", currentManga);
            await updateDoc(docRef, formDataDupe);
            toast.success("Item updated", { theme: "dark" });
        } catch (error) {
            toast.error("Something went wrong", { theme: "dark" });
            console.error(error);
        }
    };

    const handleFecthManga = (e) => {
        const { value } = e.target;
        setFormDataUpdate(mangas[value].data);
        setCurrentManga(mangas[value].id);
    };

    const handleChangeDataUpdate = (e) => {
        const { id, value, files } = e.target;

        if (files) {
            setFormDataUpdate((prev) => ({
                ...prev,
                [id]: files,
            }));
        }

        if (!files) {
            setFormDataUpdate((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };
    const handleChangeDataUpdateNestedFiles = (e) => {
        const { id, value, files } = e.target;
        if (files) setMangaChapter((prev) => ({ ...prev, [id]: files }));
        if (!files) setMangaChapter((prev) => ({ ...prev, [id]: value }));
    };
    const handleChangeDataUpdateNested = (e) => {
        const { id, value } = e.target;
        setFormDataUpdate((prev) => ({
            ...prev,
            others: {
                ...prev.others,
                [id]: value,
            },
        }));
    };
    const handleMultipleInputUpdate = (items) => {
        if (items.length === 0 || !items) return;
        const temp = [];
        items.map((item) => temp.push(item.value));
        setFormDataUpdate((prev) => ({
            ...prev,
            others: {
                ...prev.others,
                tags: temp,
            },
        }));
    };

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
            className="lg:max-w-screen-2xl relative mx-auto"
        >
            <h1 className="mx-12 mt-16 text-3xl uppercase mb-12">
                Manga options
            </h1>
            <div className="divider">
                <div className="btn font-bold text-lg btn-ghost -mt-5 m-auto hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1">
                    CREATE / UPLOAD
                </div>
            </div>
            <div className="m-5 grid grid-cols-1 lg:grid-cols-2 mt-12 divide-zinc-700 place-items-center">
                <form
                    className="relative p-12 grid grid-cols-2 gap-12 mb-16"
                    onSubmit={handleFormCreate}
                >
                    <h2 className="absolute top-0 left-0">
                        Upload a new manga
                    </h2>
                    <div className="">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Name</span>
                            </label>
                            <input
                                required
                                type="text"
                                value={name}
                                id={"name"}
                                name={"name"}
                                onChange={handleChangeDataCreate}
                                placeholder="Manga name"
                                className="input input-lg input-bordered input-primary w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mt-2">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Synopsis
                                </span>
                            </label>
                            <textarea
                                required
                                className="textarea textarea-primary"
                                placeholder="Synopsis"
                                onChange={handleChangeDataCreateNested}
                                value={synopsis}
                                id="synopsis"
                                name="synopsis"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Status
                                </span>
                            </label>
                            <select
                                required
                                className="select select-bordered select-primary select-lg w-full max-w-xs"
                                name="status"
                                id="status"
                                value={status}
                                onChange={handleChangeDataCreate}
                            >
                                <option value={0}>Comming soon</option>
                                <option value={1}>Ongoing</option>
                                <option value={2}>Hiatus</option>
                                <option value={3}>Dropped</option>
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Tags</span>
                            </label>
                            <ReactSelect setItems={handleMultipleInput} />
                        </div>
                        <div className="form-control w-full max-w-xs mt-2">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Banner
                                </span>
                            </label>
                            <input
                                id="banner"
                                required
                                placeholder="Manga banner"
                                onChange={handleChangeDataCreate}
                                accept=".jpg,.png,.jpeg"
                                className="input input-lg w-full max-w-xs pt-3"
                                type="file"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Banner (Small version)
                                </span>
                            </label>
                            <input
                                type="file"
                                required
                                id="bannerSmall"
                                onChange={handleChangeDataCreate}
                                accept=".jpg,.png,.jpeg"
                                placeholder="Banner small"
                                className="input input-lg w-full max-w-xs pt-3"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="font-bold text-lg  m-auto hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1 btn btn-ghost absolute -bottom-7 right-0"
                    >
                        Upload
                    </button>
                </form>
                {/*  -----------------------------------------------  */}
                <form
                    className="relative p-12 lg:-ml-36 grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
                    onSubmit={handleFormUpdate}
                >
                    <div className="absolute top-0 left-0 flex min-w-full justify-between items-center">
                        <h2 className="">Update mangas</h2>
                        <div className=" form-control w-full max-w-xs">
                            <select
                                className="select select-ghost select-lg w-full max-w-xs"
                                name="mangaChoice"
                                id="mangaChoice"
                                aria-label="choose manga"
                                onChange={handleFecthManga}
                                defaultValue={"nullish"}
                                required
                            >
                                <option value={"nullish"} disabled>
                                    Select manga...
                                </option>
                                {mangas.map((item, idx) => (
                                    <option value={idx} key={item.id}>
                                        {item.data.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="relative top-8 ">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Name</span>
                            </label>
                            <input
                                type="text"
                                value={nameUpdate}
                                id={"name"}
                                name={"name"}
                                onChange={handleChangeDataUpdate}
                                placeholder="Manga name"
                                className="input input-lg input-bordered input-primary w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mt-2">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Synopsis
                                </span>
                            </label>
                            <textarea
                                className="textarea textarea-primary"
                                placeholder="Synopsis"
                                onChange={handleChangeDataUpdateNested}
                                value={synopsisUpdate}
                                id="synopsis"
                                name="synopsis"
                                required
                            />
                        </div>
                    </div>
                    <div className="relative top-8 w-[180px]">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">Tags</span>
                            </label>
                            <ReactSelect
                                className=""
                                setItems={handleMultipleInputUpdate}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Status
                                </span>
                            </label>
                            <select
                                className="select select-bordered select-primary select-lg w-full max-w-xs"
                                name="status"
                                id="status"
                                value={statusUpdate}
                                onChange={handleChangeDataUpdate}
                                required
                            >
                                <option value={0}>Comming soon</option>
                                <option value={1}>Ongoing</option>
                                <option value={2}>Hiatus</option>
                                <option value={3}>Dropped</option>
                            </select>
                        </div>
                        {/* <div className="form-control w-full max-w-xs mt-2">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Banner
                                </span>
                            </label>
                            <input
                                id="banner"
                                placeholder="Manga banner"
                                onChange={handleChangeDataUpdate}
                                accept=".jpg,.png,.jpeg"
                                className="input input-lg w-full max-w-xs pt-3"
                                type="file"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Banner (Small version)
                                </span>
                            </label>
                            <input
                                type="file"
                                id="bannerSmall"
                                onChange={handleChangeDataUpdate}
                                accept=".jpg,.png,.jpeg"
                                placeholder="Banner small"
                                className="input input-lg w-full max-w-xs pt-3"
                            />
                        </div> */}
                    </div>
                    <div className="collapse col-span-2">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Add Chapter
                        </div>
                        <div className="collapse-content">
                            <div className="flex">
                                <div className="form-control w-full max-w-xs mr-8">
                                    <label className="label">
                                        <span className="label-text text-lg">
                                            Title
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        id={"title"}
                                        name={"title"}
                                        onChange={
                                            handleChangeDataUpdateNestedFiles
                                        }
                                        placeholder="Manga title"
                                        className="input input-lg input-bordered input-primary w-full max-w-xs"
                                    />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-lg">
                                            Strip images
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        id="strip"
                                        onChange={
                                            handleChangeDataUpdateNestedFiles
                                        }
                                        multiple
                                        accept=".jpg,.png,.jpeg"
                                        placeholder="Strip"
                                        className="input input-lg w-full max-w-xs pt-3"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="font-bold text-lg  m-auto hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1 btn btn-ghost absolute -bottom-12 right-0"
                    >
                        Update
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

export default Composer;
