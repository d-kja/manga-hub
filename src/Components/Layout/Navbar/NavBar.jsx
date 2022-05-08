import React from "react";
import { Link } from "react-router-dom";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SearchBtn from "./SearchBtn/SearchBtn";

// PLACE HOLDER
// function NavBar() {
//     const [inputText, setInputText] = useState("");
//     const [open, setOpen] = React.useState(false);

//     const handleInputText = (e) => {
//         const { value } = e.target;
//         setInputText(value);
//     };

//     const handleClick = () => {
//         setOpen((prev) => !prev);
//     };

//     const handleClickAway = () => {
//         setOpen(false);
//     };

//     return (
//         <div className="nav-container">
//             <div className="navbar mw--165">
//                 <ClickAwayListener onClickAway={handleClickAway}>
//                     <div className="navbar__search-bar">
//                         <Box sx={{ position: "relative" }}>
//                             <label
//                                 className="navbar__search-bar__label btn-click"
//                                 onClick={handleClick}
//                                 htmlFor="search-bar__input"
//                             >
//                                 <FaSearch size={20} />
//                             </label>
//                             {open && (
//                                 <Box
//                                     style={{
//                                         display: "inline-block",
//                                         position: "absolute",
//                                         marginTop: "-2.40rem",
//                                         marginLeft: 30,
//                                     }}
//                                 >
//                                     <input
//                                         value={inputText}
//                                         onChange={handleInputText}
//                                         type="text"
//                                         id="search-bar__input"
//                                         className="navbar__search-bar__input"
//                                     />
//                                 </Box>
//                             )}
//                         </Box>
//                     </div>
//                 </ClickAwayListener>
//                 <Link to="/" className="navbar__brand btn-click">
//                     <FaReact size={25} />
//                 </Link>

//                 <div className="dropdown-end">
//                     <div className="dropdown">
//                         <label
//                             tabIndex="0"
//                             className="btn btn-ghost btn-circle"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-15 w-15"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16M4 18h7"
//                                 />
//                             </svg>
//                         </label>
//                         <ul
//                             tabIndex="0"
//                             className="menu dropdown-content mt-3 p-2 shadow bg-neutral-focus rounded-box w-60"
//                         >
//                             <li>
//                                 <Link to="/">Home</Link>
//                             </li>
//                             <li>
//                                 <Link to="/bookmarks">Bookmarks</Link>
//                             </li>
//                             <li>
//                                 <Link to="/list">List</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

function NavBar() {
    return (
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
                            <ul className="p-2">
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
            <div className="navbar-center hidden lg:flex">
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
                        <ul className="p-2">
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
            <div className="navbar-end">
                <SearchBtn />
            </div>
        </div>
    );
}

export default NavBar;
