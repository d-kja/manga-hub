import React, { useState } from "react";
import ReactSelect from "../Layout/ReactSelect";

function Composer() {
    const [selectedTags, setSelectedTags] = useState([]);
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

    const handleFormCreate = () => {};
    const handleChangeDataCreate = (e) => {
        const { id, value } = e.target;
        setFormDataCreate((prev) => ({
            ...prev,
        }));
    };

    return (
        <>
            <h1 className="mx-12 mt-16 text-3xl uppercase">
                Upload or update mangas
            </h1>
            <div className="divider">
                <div className="btn btn-ghost text-lg">Options</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-x mt-12 divide-zinc-700 place-items-center">
                <form className="relative p-12 flex gap-12 mb-16">
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
                                className="input input-lg input-bordered input-ghost w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mt-2">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Synopsis
                                </span>
                            </label>
                            <textarea
                                className="textarea textarea-ghost"
                                placeholder="Synopsis"
                                onChange={handleChangeDataCreate}
                                value={synopsis}
                                id="synopsis"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">
                                    Status
                                </span>
                            </label>
                            <select
                                className="select select-bordered select-ghost select-lg w-full max-w-xs"
                                name="status"
                                id="status"
                                value={status}
                                onChange={handleChangeDataCreate}
                            >
                                <option disabled>Select</option>
                                <option value={0}>Dropped</option>
                                <option value={1}>Comming soon</option>
                                <option value={2}>Ongoing</option>
                                <option value={3}>Hiatus</option>
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <div className="form-control w-full max-w-xs">
                            <ReactSelect setItems={setSelectedTags} />
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
                    <div className="btn btn-ghost absolute -bottom-7 left-0">
                        Upload
                    </div>
                </form>
                <div>02</div>
            </div>
        </>
    );
}

export default Composer;
