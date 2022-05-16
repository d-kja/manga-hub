import { doc, getDocs, getDoc, collection } from "firebase/firestore";
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
