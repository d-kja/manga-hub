import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase.config";

export const queryManga = async (searchQuery) => {
    const mangasRef = collection(db, "mangas");
    const mangasSnap = await getDocs(mangasRef);

    const mangasData = [];
    const rgx = new RegExp(`${searchQuery}\\w*`, "i");

    mangasSnap.forEach((item) => {
        item.data().name.match(rgx) &&
            mangasData.push({
                id: item.id,
                data: item.data(),
            });
    });

    return mangasData;
};

export const queryTag = async (tag) => {
    const mangasRef = collection(db, "mangas");
    const q = query(mangasRef, where("others.tags", "array-contains", tag));
    const mangasSnap = await getDocs(q);

    const mangasData = [];
    mangasSnap.forEach((item) => {
        mangasData.push({
            id: item.id,
            data: item.data(),
        });
    });

    return mangasData;
};
