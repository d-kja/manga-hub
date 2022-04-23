import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaReact } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";

// PLACE HOLDER
function NavBar() {
    const [inputText, setInputText] = useState("");
    const [open, setOpen] = React.useState(false);
    const [menu, setMenu] = useState(false);

    const handleInputText = (e) => {
        const { value } = e.target;
        setInputText(value);
    };

    const handleMenu = () => {
        setMenu((prev) => !prev);
    };
    const handleMenuAway = () => {
        setMenu(false);
    };

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="navbar">
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="navbar__search-bar">
                        <Box sx={{ position: "relative" }}>
                            <label
                                className="navbar__search-bar__label"
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
                                        marginTop: "-.3rem",
                                        marginLeft: 10,
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
                <Link to="/" className="navbar__brand">
                    <FaReact size={25} />
                </Link>

                <ClickAwayListener onClickAway={handleMenuAway}>
                    <Box>
                        <i className="navbar__menu" onClick={handleMenu}>
                            {menu ? (
                                <IoCloseSharp size={25} />
                            ) : (
                                <FiMenu size={25} />
                            )}
                        </i>

                        {menu && (
                            <Box>
                                <div
                                    className="navbar__menu--container"
                                    style={{
                                        display: menu ? "block" : "none",
                                    }}
                                >
                                    <ul>
                                        <li>
                                            <Link to={() => {}}>Home</Link>
                                        </li>
                                        <li>
                                            <Link to={() => {}}>List</Link>
                                        </li>
                                        <li>
                                            <Link to={() => {}}>About</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Box>
                        )}
                    </Box>
                </ClickAwayListener>
            </div>
        </>
    );
}

export default NavBar;
