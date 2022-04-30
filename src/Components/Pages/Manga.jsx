import React from "react";
import { useParams } from "react-router-dom";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MangaButton from "../Layout/MangaButton";

function Manga() {
    const params = useParams();
    return (
        <>
            <div className="mangapage--banner">
                <div className="block my-12"></div>
            </div>
            <div className="">
                <p className="font-light text-4xl text-center">{params.id}</p>
                <div>
                    <div className="mx-72 mt-20 font-light text-2xl">
                        <span className="font-bold">Synopsis: </span> Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Earum
                        deserunt tenetur rerum nesciunt doloremque sequi natus
                        debitis consectetur commodi sunt, pariatur autem vel
                        consequatur nostrum architecto labore eaque! Libero,
                        aliquam.
                    </div>
                    <div className="mx-72 mt-7 font-light text-2xl">
                        <span className="font-bold">Tags: </span> adventure,
                        reincarnation, rpg, isekai...
                    </div>
                </div>
            </div>

            <div className="divider mx-64 mt-20 font-light text-2xl">
                <ArrowLeftIcon /> Chapters <ArrowRightIcon />
            </div>
            <div className="mangapage--table mx-64 mt-12 grid grid-cols-2 gap-x-12 gap-y-7">
                <MangaButton />
                <MangaButton />
                <MangaButton />
                <MangaButton />
                <MangaButton />
                <MangaButton />
            </div>
        </>
    );
}

export default Manga;
