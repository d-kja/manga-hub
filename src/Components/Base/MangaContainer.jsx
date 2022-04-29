import React, { useState } from "react";
import { Link } from "react-router-dom";

function MangaContainer({ img, name, id }) {
    return (
        <div className="manga-list__item">
            <Link to="/">
                <div className="relative">
                    <img className="manga-list__item__image" src={img} alt="" />
                    <Link
                        to={`/${name}/${id}`}
                        className="btn absolute left-5 bottom-0 text-2xl font-light"
                    >
                        CH. 0
                    </Link>
                </div>
                <p className="mt-7 manga-list__item__title">{name}</p>
            </Link>
        </div>
    );
}

export default MangaContainer;
