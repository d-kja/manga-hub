import {
    doc,
    getDocs,
    getDoc,
    collection,
    query,
    limit,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

export const fetchMangas = async ({ type, q }) => {
    let mangaQ;
    const mangasRef = collection(db, "mangas");
    if (type === "limit") {
        mangaQ = query(mangasRef, limit(q));
    } else {
        mangaQ = mangasRef;
    }

    const mangasSnap = await getDocs(mangaQ);

    const mangasData = [];

    mangasSnap.forEach((item) => {
        mangasData.push({
            id: item.id,
            data: item.data(),
        });
    });

    return mangasData;
};

export const fetchManga = async (id) => {
    const mangaRef = doc(db, "mangas", id);
    const mangaSnap = await getDoc(mangaRef);

    let mangaData = null;

    if (mangaSnap.exists()) {
        mangaData = {
            id: mangaSnap.id,
            data: mangaSnap.data(),
        };
    }

    return mangaData;
};

export const fetchPages = async (id) => {
    //const pagesPromise = await fetch(`/mangas/${id}`);
    //const pages = await pagesPromise.json();

    return [];
};
