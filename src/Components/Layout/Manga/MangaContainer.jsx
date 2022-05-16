import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MangaContainer({ img, name, id, rating, chap }) {
    return (
        <motion.li
            className="manga-list__item overflow-hidden"
            variants={{
                hidden: { opacity: 0, y: 75 },
                show: { opacity: 1, y: 0 },
            }}
            whileHover={{
                scale: 1.025,
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
                            alt="manga banner"
                        />
                    </Link>
                    <Link
                        to={`/mangas/${id}/chapter/0`}
                        className="rounded-lg btn absolute left-5 bottom-0 text-2xl font-light"
                    >
                        {/* 
                        'TODO
                            Last Chap per item'
                        */}
                        {chap[0].title}
                    </Link>
                </div>
                <p className="mt-5 manga-list__item__title">{name}</p>
            </div>
        </motion.li>
    );
}

export default MangaContainer;
