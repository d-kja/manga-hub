import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import StarIcon from "@mui/icons-material/Star";
import { useCheckStatus } from "../../../Hooks/useCheckStatus";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export const MangaWideContainer = ({
    img,
    name,
    id,
    rating = 0,
    chap,
    status,
    clicks = 0,
    customStyle,
}) => {
    const { myStatus, checkStatus } = useCheckStatus(status);
    return (
        <motion.li
            className="overflow-hidden"
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
            <div
                className={`hover:text-red-700 border-b border-zinc-700 border-opacity-60 pr-16 sm:flex ${customStyle}`}
            >
                <div className="relative flex flex-row justify-evenly md:grow-0 grow">
                    <Link to={`/mangas/${id}`}>
                        <img
                            className="object-cover h-48 m-5 w-36 rounded-lg grayscale-[75%]"
                            src={img}
                            alt="manga banner"
                        />
                    </Link>

                    <div className="my-8 flex flex-col relative md:grow-0 grow">
                        <h1 className="mt-4 text-xl">{name}</h1>
                        <div className="flex mt-1">
                            <span
                                className={`badge badge-${checkStatus(
                                    status
                                )} badge-outline rounded-lg mr-2`}
                            >
                                {myStatus.current}
                            </span>
                            <div className="badge badge-neutral">
                                <StarIcon
                                    sx={{ color: "yellow", fontSize: 12 }}
                                />
                                {rating.totalRating === 0
                                    ? 0
                                    : (
                                          rating.totalRating / rating.totalUsers
                                      ).toFixed(0)}
                            </div>
                        </div>
                        <div className="absolute badge badge-ghost bottom-0 -right-12">
                            <VisibilityOutlinedIcon className="mr-2" />{" "}
                            {clicks.length ?? 0}
                        </div>
                    </div>
                </div>
            </div>
        </motion.li>
    );
};
