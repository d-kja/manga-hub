import React from "react"
import styles from "./styles/spinner.module.css"

export default function Spinner() {
  return (
    <div
      className={`${styles.loader} before:bg-base-100`}
    ></div>
  )
}
