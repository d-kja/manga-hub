import React from "react";
import { Link } from "react-router-dom";

function MangaContainer({ img, name, id }) {
    return (
        <div className="manga-list__item">
            <div className="hover:text-red-700">
                <div className="relative">
                    <Link to={`/mangas/${id}`}>
                        <img
                            className="manga-list__item__image"
                            src={img}
                            alt=""
                        />
                    </Link>
                    <Link
                        to={`/mangas/${id}`}
                        className="rounded-lg btn absolute left-5 bottom-0 text-2xl font-light"
                    >
                        {/* 
                        'TODO
                            Last Chap per item'
                        */}
                        CH. 0
                    </Link>
                </div>
                <p className="mt-5 manga-list__item__title">{name}</p>
            </div>
        </div>
    );
}

export default MangaContainer;
