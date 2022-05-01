import React from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

function MangaContainer({ img, name, id, chapId }) {
    return (
        <motion.li
            className="manga-list__item"
            variants={{
                hidden: { opacity: 0, x: 75 },
                show: { opacity: 1, x: 0 },
            }}
            whileHover={{
                scale: 1.05,
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
            }}
        >
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
                        to={`/mangas/${id}/chapter/${chapId}`}
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
        </motion.li>
    );
}

export default MangaContainer;
