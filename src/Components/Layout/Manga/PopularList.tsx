import { StarFour } from "phosphor-react"
import React, { useContext } from "react"

import BannerContext from "../../Context/Banners/BannerContext"
import Spinner from "../Spinner"
import { MangaWideContainer } from "./MangaWideContainer"

export interface DataType {
  name: string
  banner: string
  bannerSmall: string
  chapters: []
  rating: {
    totalRating: number
    totalUsers: number
  }
  clicks: string[]
  others: object
  status: number
}

export interface BannerType {
  id: number | string
  data: DataType
}

export const PopularList = () => {
  const { banners, loading } = useContext(BannerContext)
  return (
    <div className="col-span-4 md:col-span-1 py-4 flex flex-col gap-4">
      <div className="divider after:bg-transparent before:bg-transparent px-8 flex items-center">
        <StarFour size={48} weight="fill" />
        Popular
      </div>

      <div className="px-4 flex flex-col gap-1">
        {loading ? (
          <Spinner />
        ) : (
          banners.map(
            ({ id, data }: BannerType, idx: number) =>
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
      </div>
    </div>
  )
}
