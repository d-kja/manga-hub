import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI Presets
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";

// Icons
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch, FaReact } from "react-icons/fa";

// PLACE HOLDER
function NavBar() {
    const [inputText, setInputText] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleInputText = (e) => {
        const { value } = e.target;
        setInputText(value);
    };

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <div className="nav-container">
            <div className="navbar mw--165">
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="navbar__search-bar">
                        <Box sx={{ position: "relative" }}>
                            <label
                                className="navbar__search-bar__label btn-click"
                                onClick={handleClick}
                                htmlFor="search-bar__input"
                            >
                                <FaSearch size={20} />
                            </label>
                            {open && (
                                <Box
                                    style={{
                                        display: "inline-block",
                                        position: "absolute",
                                        marginTop: "-2.40rem",
                                        marginLeft: 30,
                                    }}
                                >
                                    <input
                                        value={inputText}
                                        onChange={handleInputText}
                                        type="text"
                                        id="search-bar__input"
                                        className="navbar__search-bar__input"
                                    />
                                </Box>
                            )}
                        </Box>
                    </div>
                </ClickAwayListener>
                <Link to="/" className="navbar__brand btn-click">
                    <FaReact size={25} />
                </Link>

                <div className="dropdown-end">
                    <div className="dropdown">
                        <label
                            tabIndex="0"
                            className="btn btn-ghost btn-circle"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-15 w-15"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex="0"
                            className="menu dropdown-content mt-3 p-2 shadow bg-neutral-focus rounded-box w-60"
                        >
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/list">Bookmarks</Link>
                            </li>
                            <li>
                                <Link to="/about">List</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
