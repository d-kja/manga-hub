import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaReact } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

// PLACE HOLDER
function NavBar() {
    const [menu, setMenu] = useState(true);
    const handleMenu = () => {
        setMenu((prev) => !prev);
    };

    return (
        <>
            <div className="navbar">
                <i className="navbar__search-bar">
                    <FaSearch size={20} />
                </i>
                <i className="navbar__brand">
                    <FaReact size={25} />
                </i>
                <i className="navbar__menu" onClick={handleMenu}>
                    <FiMenu size={25} />
                </i>
            </div>
            <div
                className="navbar__items"
                style={{
                    display: menu ? "none" : "block",
                }}
            >
                <Link to={() => {}}>Home</Link>
                <Link to={() => {}}>List</Link>
                <Link to={() => {}}>About</Link>
            </div>
        </>
    );
}

export default NavBar;
