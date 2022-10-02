import React, { useContext, useEffect } from "react"

// Styling
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Components
import Spinner from "../Spinner"
import Slider from "react-slick"
import CarouselItem from "./CarouselItem"

// Context
import BannerContext from "../../Context/Banners/BannerContext"

// Utils
import { fetchBanner } from "../../Context/Banners/BannerActions"
import useStorage, {
  checkExpiredStorageItem,
  setExpirationDate,
  getFromStorage,
} from "../../../Hooks/useStorage"

// Types
type manga = {
  id: number | string
  data: {
    name: string
    banner: string
    rating: {
      totalUsers: number | string
      totalRating: number | string
    }
    status: number | string
  }
}

function CenterMode() {
  const { banners, loading, dispatch } =
    useContext(BannerContext)
  const { updateStorageItem } = useStorage({
    key: "banners",
    data: {
      items: banners,
      expire: setExpirationDate(new Date().getTime()),
    },
  })

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
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
    arrows: false,
  }

  useEffect(() => {
    const fetchBanners = async () => {
      dispatch({ type: "SET_LOADING" })
      let bannersData
      const fetchStorage = getFromStorage("banners")

      if (
        getFromStorage("banners") &&
        !checkExpiredStorageItem("banners")
      ) {
        const { items } = fetchStorage.data
          ? fetchStorage.data
          : fetchStorage

        bannersData = items
      } else {
        bannersData = await fetchBanner()
        updateStorageItem({
          key: "banners",
          data: {
            items: bannersData,
            expire: setExpirationDate(new Date().getTime()),
          },
        })
      }
      dispatch({
        type: "FETCH_BANNERS",
        payload: bannersData,
      })
    }

    fetchBanners()
    //eslint-disable-next-line
  }, [dispatch])

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="carousel">
          <Slider
            {...settings}
            // @ts-ignore
            className="center w-full overflow-x-hidden after:hidden before:hidden"
          >
            {banners.map(({ id, data }: manga) => (
              <CarouselItem
                key={id}
                id={id}
                name={data.name}
                img={data.banner}
                rating={(
                  Number(data.rating.totalRating) /
                  Number(data.rating.totalUsers)
                ).toFixed(1)}
                status={Number(data.status)}
              />
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default CenterMode
