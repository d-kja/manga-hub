import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

function SearchBtn({
    handleSearchBarSubmit,
    handleSearchBarChange,
    resetSearchBar,
    options,
}) {
    const [searchInput, setSearchInput] = useState("");
    const [state, setState] = React.useState({
        top: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        if (!open) {
            // resetSearchBar();
            // setSearchInput("");
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <>
            <Box
                sx={{
                    width:
                        anchor === "top" || anchor === "bottom" ? "auto" : 250,
                }}
                role="presentation"
                className="bg-neutral justify-center flex"
            >
                <List>
                    <form
                        className="form-control text-white"
                        onSubmit={(e) => handleSearchBarSubmit(e, searchInput)}
                    >
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search…"
                                className="input input-bordered input-lg"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                    handleSearchBarChange(e, searchInput);
                                }}
                            />
                            <button
                                className="btn btn-square btn-lg"
                                type="submit"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </List>
            </Box>
        </>
    );

    return (
        <div className="relative">
            <React.Fragment key={"top"}>
                <Button
                    onClick={toggleDrawer("top", true)}
                    className="btn btn-ghost"
                >
                    <SearchIcon className="text-white hover:text-primary" />
                </Button>
                <Drawer
                    anchor={"top"}
                    open={state["top"]}
                    onClose={toggleDrawer("top", false)}
                >
                    {list("top")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default SearchBtn;
