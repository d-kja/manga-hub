// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import React from "react"

interface SearchBoxProps {
    // @Temporary
    options: any
}

function SearchBox({ options }: SearchBoxProps) {
    // const [items, setItems] = useState([]);
    // useEffect(() => {
    //     setItems(options);
    //     console.log(items, options);
    //     //eslint-disable-next-line
    // }, [options]);

    return (
        <li key={options.id}>
            <div className="card card-side bg-base-100 shadow-xl">
                <img
                    src={options.data?.bannerSmall}
                    className="max-h-40 mt-3 ml-3 rounded-lg"
                    alt="card banner"
                />
                <div className="card-body my-auto">
                    <h2 className="card-title">{options.data?.name}</h2>
                    <p className="w-72 whitespace-nowrap overflow-hidden text-ellipsis">
                        {options.data?.others.synopsis}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default SearchBox
