function CarouselItem() {
    return (
        <div className="block">
            <div className="carousel__item" style={{}}>
                <div>
                    <img
                        className="carousel__item__img"
                        src="https://flamescans.org/wp-content/uploads/2021/01/sxthx_crap-1.png"
                        alt="Manga cover"
                        style={{
                            objectFit: "cover",
                            margin: "0 auto",
                            height: 450,
                        }}
                    />
                    <div className="carousel__item__img--after">
                        <div className="carousel__item__text ml-10">
                            <div>
                                <h1 className="text-lg md:text-2xl lg:text-3xl px-7">
                                    Omniscient Reader's View Point
                                </h1>
                                <p className="text-lg md:text-xl lg:text-2xl font-normal">
                                    Rating: 10{" "}
                                    <span className="badge badge-info rounded-lg ml-2">
                                        active
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarouselItem;
