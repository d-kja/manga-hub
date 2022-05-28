import { useContext } from "react";

import BannerContext from "../../Context/Banners/BannerContext";
import Spinner from "../Spinner";
import { MangaWideContainer } from "./MangaWideContainer";

export const PopularList = () => {
    const { banners, loading } = useContext(BannerContext);
    return (
        <div className="lg:col-span-1 col-span-3 drop-shadow-lg md:border-t-0 rounded-lg lg:max-w-lg max-w-full border-t bg-neutral bg-opacity-25 border-zinc-700 border-opacity-40 m-16 lg:p-10 py-10 flex justify-center flex-col items-center">
            <div className="btn font-bold text-2xl btn-ghost -mt-5 btn-lg m-auto btn-wide hover:outline hover:outline-primary-focus hover:outline-offset-2 hover:outline-1 mx-auto">
                Popular
            </div>
            <ul className="list-none flex flex-wrap lg:flex-col lg:gap-0 gap-x-16 justify-evenly">
                {loading ? (
                    <Spinner />
                ) : (
                    banners.map(
                        ({ id, data }, idx) =>
                            idx < 5 && (
                                <MangaWideContainer
                                    key={id}
                                    id={id}
                                    name={data.name}
                                    rating={data.rating}
                                    img={data.bannerSmall}
                                    chap={data.chapters}
                                    status={data.status}
                                    clicks={data.clicks}
                                />
                            )
                    )
                )}
            </ul>
        </div>
    );
};
