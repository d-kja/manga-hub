import React from "react"

const Spinner = ({ heigth = 300, others = "" }) => {
  return (
    <div
      className={`grid place-items-center text-white ${others}`}
    ></div>
  )
}

export default Spinner
