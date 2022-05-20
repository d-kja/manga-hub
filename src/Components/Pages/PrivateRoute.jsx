import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import { useCurrentAuth } from "../../Hooks/useCurrentAuth";

function PrivateRoute() {
    const { isLoading, isLogged } = useCurrentAuth();

    if (isLoading)
        return (
            <div
                className="grid place-items-center"
                style={{
                    minHeight: 300,
                }}
            >
                <CircularProgress color="inherit" />
            </div>
        );

    return isLogged ? <Outlet /> : <Navigate to="/signIn" />;
}

export default PrivateRoute;
