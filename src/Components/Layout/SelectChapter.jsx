import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MangaContext from "../Context/Mangas/MangaContext";
import Spinner from "./Spinner";

export const SelectChapter = ({ id, chapId }) => {
    const { loading, manga } = useContext(MangaContext);
    return loading ? (
        <Spinner />
    ) : (
        <div className="flex justify-between mx-10 border-b border-zinc-700 border-opacity-75">
            <div className="dropdown dropdown-hover">
                <label
                    tabIndex="0"
                    className="btn 
                    btn-ghost btn-lg m-1"
                >
                    Select Chapter
                </label>
                <ul
                    tabIndex="0"
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 list-none"
                >
                    {manga.chapters.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <Link
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                        })
                                    }
                                    to={`/mangas/${id}/chapter/${idx}`}
                                >
                                    Chapter {+idx + 1}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {manga.chapters.length && (
                <div className="">
                    <Link
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                            })
                        }
                        to={`/mangas/${id}/chapter/${+chapId - 1}`}
                        className={
                            chapId == 0
                                ? "btn btn-ghost btn-lg mr-4 btn-disabled"
                                : "btn btn-ghost btn-lg mr-4"
                        }
                    >
                        Prev
                    </Link>
                    <Link
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                            })
                        }
                        to={`/mangas/${id}/chapter/${+chapId + 1}`}
                        className={
                            manga.chapters.length > 1 &&
                            chapId != manga.chapters.length - 1
                                ? "btn btn-ghost btn-lg mr-4"
                                : "btn btn-ghost btn-lg mr-4 btn-disabled"
                        }
                    >
                        Next
                    </Link>
                </div>
            )}
        </div>
    );
};
