import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiClock } from "react-icons/fi";

function MangaContainer() {
    const [chap, setChap] = useState(0);
    const [postDate, setPostDate] = useState(`MM/DD/YYYY`);
    return (
        <div className="manga-list__item">
            <img
                className="manga-list__item__image"
                // TEMPORARY AS A PLACEHOLDER!!
                src="https://image.mostraveller.com/uploads/images/comics/57915/thumbnail.png"
                alt=""
            />
            <Link className="manga-list__item__btn btn" to="/">
                CH. {chap}
            </Link>
            <span className="manga-list__item__date">
                {postDate} <FiClock />
            </span>
            <p className="manga-list__item__title">placeholder</p>
        </div>
    );
}

export default MangaContainer;
