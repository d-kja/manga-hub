import React, { Component } from "react";

import Slider from "react-slick";

export default class CenterMode extends Component {
    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
        };
        return (
            <div
                style={{
                    textAlign: "center",
                }}
            >
                <Slider {...settings}>
                    <div className="block">
                        <h3>1</h3>
                    </div>
                    <div className="block">
                        <h3>2</h3>
                    </div>
                    <div className="block">
                        <h3>3</h3>
                    </div>
                    <div className="block">
                        <h3>4</h3>
                    </div>
                    <div className="block">
                        <h3>5</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}

// Package: https://www.npmjs.com/package/react-slick
