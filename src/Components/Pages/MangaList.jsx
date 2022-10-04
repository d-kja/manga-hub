import React from "react"

import Manga from "../Layout/Manga/MangaList"

// Home is supposed to have a limit (todo), this one just shows everything.
function MangaList() {
  return (
    <div className="my-6">
      <Manga />
    </div>
  )
}

export default MangaList
