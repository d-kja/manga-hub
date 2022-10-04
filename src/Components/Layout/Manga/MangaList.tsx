import React, { useEffect, useContext } from "react"

import { motion } from "framer-motion"
import Spinner from "../Spinner"

import MangaContainer from "./MangaContainer"

import MangaContext from "../../Context/Mangas/MangaContext"
import { fetchMangas } from "../../Context/Mangas/MangaActions"
import useStorage, {
  checkExpiredStorageItem,
  getFromStorage,
  setExpirationDate,
} from "../../../Hooks/useStorage"
import { Masonry } from "masonic"

function MangaList({ query, fromHome }: any) {
  const { dispatch, loading, mangas } =
    useContext(MangaContext)
  const { updateStorageItem } = useStorage({
    key: "mangas",
    data: {
      items: mangas,
      expire: setExpirationDate(new Date().getTime()),
    },
  })

  useEffect(() => {
    const getMangas = async () => {
      dispatch({ type: "SET_LOADING" })
      let data
      const fetchStorage = getFromStorage("mangas")

      if (
        getFromStorage("mangas") &&
        !checkExpiredStorageItem("mangas")
      ) {
        const { items } = fetchStorage.data
          ? fetchStorage.data
          : fetchStorage

        data = items
      } else {
        const q = !fromHome ? {} : { type: "limit", q: 10 }
        data = await fetchMangas(q)
        updateStorageItem({
          key: "mangas",
          data: {
            items: data,
            expire: setExpirationDate(new Date().getTime()),
          },
        })
      }

      dispatch({
        type: "SET_MANGAS",
        payload: data,
      })
    }

    getMangas()

    //eslint-disable-next-line
  }, [dispatch])

  return (
    <motion.ul
      className="px-4 py-6 flex gap-4 flex-wrap justify-center max-w-screen-xl mx-auto"
      initial={{ y: 75, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        // @ts-ignore
        type: "spring",
        // @ts-ignore
        stiffness: 100,
        // @ts-ignore
        ease: "easeIn",
        delay: 0.3,
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {query ? (
            mangas.map(({ id, data }: any) => {
              const rgx = new RegExp(query.toLowerCase())
              return (
                data.name.toLowerCase().match(rgx) && (
                  <MangaContainer
                    key={id}
                    id={id}
                    name={data.name}
                    rating={data.rating}
                    img={data.bannerSmall}
                    chap={data.chapters}
                  />
                )
              )
            })
          ) : (
            <MangaVirtualized mangas={mangas} />
          )}
        </>
      )}
    </motion.ul>
  )
}

const MangaVirtualized = ({ mangas }: any) => (
  <Masonry
    items={mangas}
    columnGutter={4}
    overscanBy={1}
    render={MangaCard}
  />
)

const MangaVirtualizedWithFilter = ({ mangas }: any) => (
  <Masonry
    items={mangas}
    columnGutter={4}
    overscanBy={1}
    render={MangaCardWithFilter}
  />
)

const MangaCard = ({ data }: any) => {
  const { id, data: dataManga } = data

  return (
    <MangaContainer
      key={id}
      id={id}
      name={dataManga.name}
      rating={dataManga.rating}
      img={dataManga.bannerSmall}
      chap={dataManga.chapters}
    />
  )
}

const MangaCardWithFilter = ({ data }: any) => {
  const { id, data: dataManga } = data

  return (
    <MangaContainer
      key={id}
      id={id}
      name={dataManga.name}
      rating={dataManga.rating}
      img={dataManga.bannerSmall}
      chap={dataManga.chapters}
    />
  )
}

export default MangaList
