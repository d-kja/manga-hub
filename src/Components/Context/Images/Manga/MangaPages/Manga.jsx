import React from "react";
import { useParams } from "react-router-dom";

function Manga() {
    const params = useParams();
    return <div>{params.id}</div>;
}

export default Manga;
