import { collection, getDocs } from "firebase/firestore";
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
