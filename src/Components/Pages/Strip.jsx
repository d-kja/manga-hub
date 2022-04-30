import React from "react";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Strip() {
    return (
        <>
            <div className="mangapage--banner">
                <div className="block my-12"></div>
            </div>
            <p className="font-light text-4xl text-center">Place holder</p>

            <div className="divider mx-64 mt-20 font-light text-2xl">
                <ArrowLeftIcon /> Chapters <ArrowRightIcon />
            </div>
            <div className="mangapage--table mx-64 mt-12">
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
            </div>
            <div className="block mt-20">Comment Session</div>
        </>
    );
}

export default Strip;
