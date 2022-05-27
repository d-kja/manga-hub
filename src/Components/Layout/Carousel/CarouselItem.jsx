import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { useCheckStatus } from "../../../Hooks/useCheckStatus";

function CarouselItem({ id, name, img, rating, status }) {
    const { checkStatus, myStatus } = useCheckStatus(status);

    return (
        <div className="block">
            <div className="carousel__item">
                <div>
                    <img
                        className="carousel__item__img"
                        src={img}
                        alt="Manga cover"
                        style={{
                            objectFit: "cover",
                            margin: "0 auto",
                            //  Hard coded cus annoyin'
                            height: 450,
                            width: 2200,
                        }}
                    />
                    <div className="carousel__item__img--after">
                        <div className="carousel__item__text ml-10">
                            <div>
                                <Link to={`/mangas/${id}`}>
                                    <h1 className="text-xl md:text-2xl lg:text-4xl px-10 pl-20 mb-2">
                                        {name}
                                    </h1>
                                    <p className="text-lg md:text-xl lg:text-2xl font-normal">
                                        <span className="badge badge-ghost rounded-lg ml-2 text-lg">
                                            {rating}{" "}
                                            <StarIcon className="ml-1 text-amber-400" />
                                        </span>
                                        <span
                                            className={`badge badge-${checkStatus(
                                                status
                                            )} badge-outline rounded-lg ml-2`}
                                        >
                                            {myStatus.current}
                                        </span>
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarouselItem;
