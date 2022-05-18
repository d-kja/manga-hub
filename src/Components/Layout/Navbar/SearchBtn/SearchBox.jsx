import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SearchBox({ options }) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(options);
        console.log(items, options);
        //eslint-disable-next-line
    }, [options]);

    return (
        <ul
            className="menu bg-base-100 absolute top-28 rounded-lg"
            style={{
                zIndex: 100,
                left: "50%",
                transform: `translateX(${-50}%)`,
            }}
        >
            {options.map((item) => (
                <li key={item.id}>
                    <div className="card card-side bg-base-100 shadow-xl">
                        <img
                            src={item.data.bannerSmall}
                            className="max-h-40 mt-3 ml-3 rounded-lg"
                            alt="card banner"
                        />
                        <div className="card-body my-auto">
                            <h2 className="card-title">{item.data.name}</h2>
                            <p className="w-72 whitespace-nowrap overflow-hidden text-ellipsis">
                                {item.data.others.synopsis}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default SearchBox;
