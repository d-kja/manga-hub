import React from "react";
import NavBar from "./Base/NavBar";
import Carousel from "./Base/Carousel";

function Home() {
    return (
        <div className="container">
            <div className="pagePadding--upright overflow-off">
                <Carousel />
            </div>
        </div>
    );
}

export default Home;
