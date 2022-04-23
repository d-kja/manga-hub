import React from "react";
import { Link } from "react-router-dom";

function MangaContainer() {
    return (
        <div className="manga-list__item">
            <img className="manga-list__item__image" src="#" alt="" />
            <Link className="manga-list__item__btn btn btn--primary" to="/">
                BTN PLACEHOLDER
            </Link>
            <p className="manga-list__item__title">placeholder</p>
        </div>
    );
}

export default MangaContainer;
