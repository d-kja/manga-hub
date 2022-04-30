import React, { Component } from "react";

import Slider from "react-slick";
import CarouselItem from "./CarouselItem";

export default class CenterMode extends Component {
    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 1,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 6000,
            pauseOnHover: true,
            lazyLoad: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        initialSlide: 1,
                    },
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 1,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1,
                    },
                },
            ],
        };
        return (
            <div
                style={{
                    textAlign: "center",
                    marginBottom: 50,
                }}
                className="carousel"
            >
                <Slider
                    {...settings}
                    style={{
                        // Temp fix for override issue w tailwind
                        width: "100%",
                    }}
                >
                    {/* MAKE IT RESPOSIVE + COMPONENT! */}
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                </Slider>
            </div>
        );
    }
}

// Package: https://www.npmjs.com/package/react-slick
