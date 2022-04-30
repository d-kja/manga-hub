import React from "react";
import Carousel from "../Base/Carousel";
import MangaList from "../Layout/MangaList";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function Home() {
    return (
        <div className="">
            <div className="pagePadding--upright overflow-off">
                <Carousel />
            </div>
            <div className="divider mx-20 mb-7 font-light text-2xl">
                UPDATES{" "}
                <LocalFireDepartmentIcon
                    className="-ml-2 hover:text-red-700"
                    sx={{ fontSize: 17 }}
                />
            </div>
            <MangaList />
        </div>
    );
}

export default Home;
