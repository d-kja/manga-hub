import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStorage from "../../Hooks/useStorage";
import MangaContainer from "../Layout/Manga/MangaContainer";
import { toast } from "react-toastify";

function Bookmarks() {
    const [items, setItems] = useState([]);
    const { storageItem } = useStorage({
        key: "bookmarks",
        data: [],
    });

    useEffect(() => {
        if (storageItem instanceof Array) {
            setItems([...storageItem]);
        } else {
            const { key, data } = storageItem;
            setItems([...data]);
        }
    }, [storageItem]);

    return (
        <motion.ul
            initial={{ y: 75, opacity: 0 }}
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
