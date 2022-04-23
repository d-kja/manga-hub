import React, { Component } from "react";

import Slider from "react-slick";

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
            dots: true,
        };
        return (
            <div
                style={{
                    textAlign: "center",
                    marginBottom: 50,
                }}
                className="carousel"
            >
                <Slider {...settings}>
                    <div className="block">
                        <div className="carousel__item" style={{}}>
                            <div className="carousel__item__text">
                                <div>
                                    <h1>1</h1>
                                    <p>
                                        Rating <span>Status</span>
                                    </p>
                                </div>
                            </div>
                            <img
                                className="carousel__item__img"
                                src="https://flamescans.org/wp-content/uploads/2021/01/sxthx_crap-1.png"
                                alt="Manga cover"
                            />
                        </div>
                    </div>
                    <div className="block">
                        <div className="carousel__item" style={{}}>
                            <div className="carousel__item__text">
                                <div>
                                    <h1>2</h1>
                                    <p>
                                        Rating <span>Status</span>
                                    </p>
                                </div>
                            </div>
                            <img
                                className="carousel__item__img"
                                src="https://flamescans.org/wp-content/uploads/2021/01/sxthx_crap-1.png"
                                alt="Manga cover"
                            />
                        </div>
                    </div>
                    <div className="block">
                        <div className="carousel__item" style={{}}>
                            <div className="carousel__item__text">
                                <div>
                                    <h1>3</h1>
                                    <p>
                                        Rating <span>Status</span>
                                    </p>
                                </div>
                            </div>
                            <img
                                className="carousel__item__img"
                                src="https://flamescans.org/wp-content/uploads/2021/01/sxthx_crap-1.png"
                                alt="Manga cover"
                            />
                        </div>
                    </div>
                    <div className="block">
                        <div className="carousel__item" style={{}}>
                            <div className="carousel__item__text">
                                <div>
                                    <h1>4</h1>
                                    <p>
                                        Rating <span>Status</span>
                                    </p>
                                </div>
                            </div>
                            <img
                                className="carousel__item__img"
                                src="https://flamescans.org/wp-content/uploads/2021/01/sxthx_crap-1.png"
                                alt="Manga cover"
                            />
                        </div>
                    </div>
                    <div className="block">
                        <div className="carousel__item" style={{}}>
                            <div className="carousel__item__text">
                                <div>
                                    <h1>5</h1>
                                    <p>
                                        Rating <span>Status</span>
                                    </p>
                                </div>
                            </div>
                            <img
                                className="carousel__item__img"
                                src="https://flamescans.org/wp-content/uploads/2021/01/sxthx_crap-1.png"
                                alt="Manga cover"
                            />
                        </div>
                    </div>
                    {/* <div className="block">
                        <h3>3</h3>
                    </div>
                    <div className="block">
                        <h3>4</h3>
                    </div>
                    <div className="block">
                        <h3>5</h3>
                    </div> */}
                </Slider>
            </div>
        );
    }
}

// Package: https://www.npmjs.com/package/react-slick
