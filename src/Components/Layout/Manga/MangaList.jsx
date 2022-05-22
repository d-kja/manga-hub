import React, { useEffect, useContext } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

import MangaContainer from "./MangaContainer";

import MangaContext from "../../Context/Mangas/MangaContext";
import { fetchMangas } from "../../Context/Mangas/MangaActions";
import useStorage, {
    getFromStorage,
    setExpirationDate,
} from "../../../Hooks/useStorage";

function MangaList({ query }) {
    const { dispatch, loading, mangas } = useContext(MangaContext);
    const { updateStorageItem } = useStorage({
        key: "mangas",
        data: {
            items: mangas,
            expire: setExpirationDate(new Date().getTime()),
        },
    });

    useEffect(() => {
        const getMangas = async () => {
            dispatch({ type: "SET_LOADING" });
            let data;
            const fetchStorage = getFromStorage("mangas");

            if (getFromStorage("mangas")) {
                const { items } = fetchStorage.data
                    ? fetchStorage.data
                    : fetchStorage;

                data = items;
                console.log("using storage! {mangas}");
            } else {
                data = await fetchMangas();
                updateStorageItem({
                    key: "mangas",
                    data: {
                        items: data,
                        expire: setExpirationDate(new Date().getTime()),
                    },
                });
                console.log("not using storage! {mangas}");
            }

            dispatch({
                type: "SET_MANGAS",
                payload: data,
            });
        };

        getMangas();

        //eslint-disable-next-line
    }, [dispatch]);

    return (
        <motion.ul
            className="manga-list pagePadding--sideways mw--165 w-full"
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        delay: 0.2,
                    },
                },
            }}
            initial="hidden"
            animate="show"
        >
            {loading ? (
                <div
                    className="grid place-items-center"
                    style={{
                        minHeight: 300,
                    }}
                >
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                <>
                    {query
                        ? mangas.map(({ id, data }) => {
                              const rgx = new RegExp(query.toLowerCase());
                              return (
                                  data.name.toLowerCase().match(rgx) && (
                                      <MangaContainer
                                          key={id}
                                          id={id}
                                          name={data.name}
                                          rating={data.rating}
                                          img={data.bannerSmall}
                                          chap={data.chapters}
                                      />
                                  )
                              );
                          })
                        : mangas.map(({ id, data }) => (
                              <MangaContainer
                                  key={id}
                                  id={id}
                                  name={data.name}
                                  rating={data.rating}
                                  img={data.bannerSmall}
                                  chap={data.chapters}
                              />
                          ))}
                </>
            )}
        </motion.ul>
    );
}

export default MangaList;
