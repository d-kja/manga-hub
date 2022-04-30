import React from "react";
import { useParams } from "react-router-dom";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Manga() {
    const params = useParams();
    return (
        <>
            <div className="manga--banner"></div>
            <div className="divider mx-20 mb-7 font-light text-2xl">
                <ArrowLeftIcon /> {params.id} <ArrowRightIcon />
            </div>
            <div className="manga--strip"></div>
        </>
    );
}

export default Manga;
