import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import useStorage from "../../Hooks/useStorage";
import MangaContainer from "../Layout/Manga/MangaContainer";

import { db } from "../../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fetchMangas } from "../Context/Mangas/MangaActions";

function Bookmarks() {
    const [items, setItems] = useState([]);
    const { storageItem } = useStorage({
        key: "bookmarks",
        data: [],
    });
    const auth = getAuth();

    useEffect(() => {
        const fetchBookmarks = async () => {
            const bookmarkRef = collection(db, "bookmarks");
            const q = query(
                bookmarkRef,
                where("userRef", "==", auth.currentUser.uid)
            );
            const bookmarkSnap = await getDocs(q);
            let temp = {};

            if (bookmarkSnap) {
                bookmarkSnap.forEach(
                    (item) =>
                        (temp = {
                            ...item.data(),
                            itemId: item.id,
                        })
                );
                // setItems(temp);
                const mangas = await fetchMangas({});
                const filteredItems = mangas.filter((item) =>
                    temp?.bookmarks.includes(item.id)
                );
                const mangasArray = [];
                filteredItems.forEach((item) => {
                    mangasArray.push({ ...item.data, myId: item.id });
                });
                mangasArray.length !== 0 && setItems(mangasArray);
            }
        };

        auth.currentUser && fetchBookmarks();
        if (!(items.length > 0) && !auth.currentUser) {
            if (storageItem instanceof Array) {
                setItems([...storageItem]);
            } else {
                const { data } = storageItem;
                setItems([...data]);
            }
        }
        // eslint-disable-next-line
    }, [storageItem]);

    return (
        <motion.ul
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
                delay: 0.3,
            }}
            className="lg:max-w-screen-2xl relative mx-auto list-none"
        >
            <div className="my-12 mx-5 flex flex-wrap items-center justify-center gap-2">
                {items.length > 0
                    ? items.map((item) => {
                          return (
                              <MangaContainer
                                  key={item.myId}
                                  id={item.myId}
                                  name={item.name}
                                  rating={item.rating}
                                  img={item.bannerSmall}
                                  chap={item.chapters}
                              />
                          );
                      })
                    : "No bookmarks found"}
            </div>
        </motion.ul>
    );
}

export default Bookmarks;
