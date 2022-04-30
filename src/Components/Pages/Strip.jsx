import React from "react";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Strip() {
    return (
        <>
            <div className="mangapage--banner mx-5 lg:mx-64">
                <div className="block my-12"></div>
            </div>
            <p className="font-light text-4xl text-center">Place holder</p>

            <div className="divider mx-5 lg:mx-64 md:mx-64 mt-20 font-light text-2xl">
                <ArrowLeftIcon /> Chapters <ArrowRightIcon />
            </div>
            <div className="mangapage--table lg:mx-64 md:mx-64 mt-12">
                <div className="block lg:mx-64"></div>
                <div className="block lg:mx-64"></div>
                <div className="block lg:mx-64"></div>
                <div className="block lg:mx-64"></div>
                <div className="block lg:mx-64"></div>
                <div className="block lg:mx-64"></div>
            </div>
            <div className="block mt-20">Comment Session</div>
        </>
    );
}

export default Strip;
