import React from "react"
import { Link } from "react-router-dom"

import { useCheckStatus } from "../../../Hooks/useCheckStatus"
import { Star } from "phosphor-react"

interface CarouselItemProps {
  id: string | number
  name: string
  img: string
  rating: string | number
  status: number
}

function CarouselItem({
  id,
  name,
  img,
  rating,
  status,
}: CarouselItemProps) {
  const { checkStatus, myStatus } = useCheckStatus()

  return (
    <div className="custom-block mx-4">
      <div className="mx-[2.5px] my-[15px] overflow-hidden flex items-center h-full relative rounded-lg">
        <div className="shadow-xl drop-shadow-2xl">
          <img
            className="object-cover mx-auto my-0 h-[400px] w-[2200px] rounded-lg relative grayscale-[75%]"
            src={img}
            alt="Manga cover"
          />
          <div className="after:h-full after:custom-block after:absolute after:w-[75%] after:right-0 after:top-0 after:bg-carousel-after after:clip-carousel-bg after:grid after:place-items-center">
            <div className="absolute z-50 top-1/2 right-1/3 -translate-y-1/2">
              <div>
                <Link
                  to={`/mangas/${id}`}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-xl md:text-2xl lg:text-4xl mx-auto mb-2 drop-shadow-lg">
                    {name}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl font-normal">
                    <span className="badge badge-ghost rounded-lg ml-2 text-lg">
                      <div className="text-sm">
                        {rating}
                      </div>{" "}
                      <Star
                        size={16}
                        weight="fill"
                        className="ml-1 text-amber-400"
                      />
                    </span>
                    <span
                      className={`badge badge-${checkStatus(
                        status
                      )} badge-outline rounded-lg ml-2`}
                    >
                      <div className="font-bold">
                        {myStatus.current}
                      </div>
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem
