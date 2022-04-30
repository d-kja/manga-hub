function CarouselItem() {
    return (
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
                    style={{
                        objectFit: "cover",
                        margin: "0 auto",
                        height: 450,
                    }}
                />
            </div>
        </div>
    );
}

export default CarouselItem;
