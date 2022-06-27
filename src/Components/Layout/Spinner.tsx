import React from "react"

import { CircularProgress } from "@mui/material"

const Spinner = ({ heigth = 300, others = "" }) => {
    return (
        <div
            className={`grid place-items-center text-white ${others}`}
            style={{
                minHeight: heigth,
            }}
        >
            <CircularProgress color="inherit" />
        </div>
    )
}

export default Spinner
