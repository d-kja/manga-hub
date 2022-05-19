import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchContext from "../../Context/Search/SearchContext";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SearchBtn from "./SearchBtn/SearchBtn";
import UserIcon from "./UserIcon";

function NavBar() {
    const { dispatch, queryResult, loading } = useContext(SearchContext);
    const [data, setData] = useState([]);

    const nav = useNavigate();

    const handleSearchBarSubmit = async (e, searchInput) => {
        e.preventDefault();
        nav(`/search/${searchInput}`);
    };

    const handleSearchBarChange = async (e, searchInput) => {
        // dispatch({ type: "SET_LOADING" });
        // const searchBarQueryResults = await queryManga(searchInput);
        // await dispatch({
        //     type: "QUERY_MANGA",
        //     payload: searchBarQueryResults,
        // });
        setData(searchInput);
    };

    return (
        <>
            <div className="navbar bg-neutral">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            style={{
                                zIndex: 100,
                            }}
                        >
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li tabIndex={0}>
                                <span className="justify-between">
                                    Mangas
                                    <svg
                                        className="fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                    </svg>
                                </span>
                                <ul className="p-2 bg-base-100">
                                    <li>
                                        <Link to="/bookmarks">Bookmarks</Link>
                                    </li>
                                    <li>
                                        <Link to="/search">Search</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/list">List</Link>
                            </li>
                        </ul>
                    </div>
                    <Link
                        to="/"
                        className="btn btn-ghost normal-case text-xl hover:text-primary transition-colors"
                    >
                        <LocalFireDepartmentIcon />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul
                        className="menu menu-horizontal p-0"
                        style={{
                            zIndex: 100,
                        }}
                    >
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li tabIndex={0}>
                            <span>
                                Mangas
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                </svg>
                            </span>
                            <ul className="p-2 bg-base-100">
                                <li>
                                    <Link to="/bookmarks">Bookmarks</Link>
                                </li>
                                <li>
                                    <Link to="/search">Search</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/list">List</Link>
                        </li>
                    </ul>
                </div>
                <div
                    className="navbar-end flex flex-row gap-2"
                    style={{
                        zIndex: 100,
                    }}
                >
                    <SearchBtn
                        handleSearchBarSubmit={handleSearchBarSubmit}
                        handleSearchBarChange={handleSearchBarChange}
                    />
                    <UserIcon />
                </div>
            </div>
            {/* 
            <ul
                className="menu bg-base-100 absolute top-28 rounded-lg"
                style={{
                    zIndex: 100,
                    left: "50%",
                    transform: `translateX(${-50}%)`,
                }}
            >
                {/* {loading ? (
                    <div
                        className="grid px-12 place-items-center"
                        style={{
                            minHeight: 100,
                        }}
                    >
                        <CircularProgress color="inherit" />
                    </div>
                ) : (
                    queryResult && (
                        <>
                            {queryResult.map((item, idx) => (
                                <SearchBox options={item} key={idx} />
                            ))}
                        </>
                    )
                )} 
                {data.length > 0 && (
                    <>
                        {console.log(data)}
                        {data.map((item, idx) => (
                            <SearchBox options={item} key={idx} />
                        ))}
                    </>
                )}
            </ul> 
            */}
        </>
    );
}

export default NavBar;
