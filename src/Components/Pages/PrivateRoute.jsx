import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useCurrentAuth } from "../../Hooks/useCurrentAuth";
import Spinner from "../Layout/Spinner";

function PrivateRoute() {
    const { isLoading, isLogged } = useCurrentAuth();

    if (isLoading) return <Spinner />;

    return isLogged ? <Outlet /> : <Navigate to="/signIn" />;
}

export default PrivateRoute;
