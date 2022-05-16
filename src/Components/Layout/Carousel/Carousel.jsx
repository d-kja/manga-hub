import React, { useContext, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Slider from "react-slick";

import CarouselItem from "./CarouselItem";

import BannerContext from "../../Context/Banners/BannerContext";
import { fetchBanner } from "../../Context/Banners/BannerActions";

function CenterMode() {
    const { banners, loading, dispatch } = useContext(BannerContext);

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
                breakpoint: 3000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const fetchBanners = async () => {
            const bannersData = await fetchBanner();
            dispatch({
                type: "FETCH_BANNERS",
                payload: bannersData,
            });
        };

        fetchBanners();
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <div
                    className="grid place-items-center"
                    style={{
                        minHeight: 300,
                    }}
                >
                    <CircularProgress color="inherit" />
                </div>
            ) : (
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
                        {banners.map(({ id, data }) => (
                            <CarouselItem
                                key={id}
                                name={data.name}
                                img={data.banner}
                                rating={(
                                    data.rating.totalRating /
                                    data.rating.totalUsers
                                ).toFixed(1)}
                                status={data.status}
                            />
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
}

export default CenterMode;
