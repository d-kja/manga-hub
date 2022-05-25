import React, { useState } from "react";
import ReactSelect from "../Layout/ReactSelect";

import { motion } from "framer-motion";

function Composer() {
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
        status: 0,
        timestamp: null,
        clicks: 0,
    });

    const { name, banner, bannerSmall, others, status, timestamp } =
        formDataCreate;
    const { synopsis, tags } = others;

    const handleFormCreate = (e) => {
        e.preventDefault();
        console.log(formDataCreate);
    };

    const handleChangeDataCreate = (e) => {
        const { id, value } = e.target;
        setFormDataCreate((prev) => ({
            ...prev,
            [id]: value,
        }));
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
                Upload or update mangas
            </h1>
            <div className="divider">
                <div className="btn font-bold text-lg btn-ghost -mt-5 m-auto hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1">
                    Options
                </div>
            </div>
            <div className="m-5 grid grid-cols-1 lg:grid-cols-2 divide-x mt-12 divide-zinc-700 place-items-center">
                <form
                    className="relative p-12 grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
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
                                type="file"
                                value={banner}
                                id={"banner"}
                                name={"banner"}
                                placeholder="Manga banner"
                                onChange={handleChangeDataCreate}
                                className="input input-lg w-full max-w-xs"
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
                                value={bannerSmall}
                                id={"bannerSmall"}
                                name={"bannerSmall"}
                                onChange={handleChangeDataCreate}
                                placeholder="Banner small"
                                className="input input-lg w-full max-w-xs"
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
                <div>Second form</div>
            </div>
        </motion.div>
    );
}

export default Composer;
