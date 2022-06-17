import React, { useEffect, useContext } from "react";

import { motion } from "framer-motion";
import Spinner from "../Spinner";

import MangaContainer from "./MangaContainer";

import MangaContext from "../../Context/Mangas/MangaContext";
import { fetchMangas } from "../../Context/Mangas/MangaActions";
import useStorage, {
    checkExpiredStorageItem,
    getFromStorage,
    setExpirationDate,
} from "../../../Hooks/useStorage";

// https://tailwindui.com/preview#component-db11f83176d113e39bf2559da9344b1c

function MangaList({ query, fromHome }) {
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

            if (
                getFromStorage("mangas") &&
                !checkExpiredStorageItem("mangas")
            ) {
                const { items } = fetchStorage.data
                    ? fetchStorage.data
                    : fetchStorage;

                data = items;
            } else {
                const q = !fromHome ? {} : { type: "limit", q: 10 };
                data = await fetchMangas(q);
                updateStorageItem({
                    key: "mangas",
                    data: {
                        items: data,
                        expire: setExpirationDate(new Date().getTime()),
                    },
                });
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
            initial={{ y: 75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
                delay: 0.3,
            }}
        >
            {loading ? (
                <Spinner />
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
