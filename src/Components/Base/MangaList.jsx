import React, { useEffect, useContext } from "react";

import MangaContainer from "./MangaContainer";

import MangaContext from "../Context/Images/Manga/HomeList/MangaContext";
import { fetchMangas } from "../Context/Images/Manga/HomeList/MangaActions";

function MangaList() {
    const { dispatch, loading, mangas } = useContext(MangaContext);

    useEffect(() => {
        const getMangas = async () => {
            dispatch({ type: "SET_LOADING" });
            const data = await fetchMangas();

            dispatch({
                type: "SET_MANGAS",
                payload: data,
            });
        };

        getMangas();
    }, [dispatch]);
    return (
        <div className="manga-list pagePadding--sideways mw--165 w-full">
            {/* Todo
                    Each has:
                        ID
                        NAME
                        IMG
                        KEY
            */}
            {mangas.map((element) => (
                <MangaContainer
                    key={element.id}
                    id={element.id}
                    name={element.name}
                    rating={element.rating}
                    img={element.img}
                />
            ))}
        </div>
    );
}

export default MangaList;
