import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase.config";

export const fetchMangas = async (query) => {
    const mangasRef = collection(db, "mangas");
    const mangasSnap = await getDocs(mangasRef);

    const mangasData = [];

    mangasSnap.forEach((item) => {
        mangasData.push({
            id: item.id,
            data: item.data(),
        });
    });

    return mangasData;
};

export const fetchBanners = async (id) => {
    //const mbannerPromise = await fetch(`/mangas/${id}`);
    //const mData = await mbannerPromise.json();

    return [];
};

export const fetchPages = async (id) => {
    //const pagesPromise = await fetch(`/mangas/${id}`);
    //const pages = await pagesPromise.json();

    return [];
};
