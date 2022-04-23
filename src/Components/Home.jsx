import React from "react";
import Carousel from "./Base/Carousel";
import MangaList from "./Base/MangaList";

function Home() {
    return (
        <div className="container">
            <div className="pagePadding--upright overflow-off">
                <Carousel />
            </div>

            <MangaList />
        </div>
    );
}

export default Home;
