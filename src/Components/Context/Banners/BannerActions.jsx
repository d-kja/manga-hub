import { useStorage } from "../../../Hooks/useStorage";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase.config";

export const fetchBanner = async () => {
    const mangasRef = collection(db, "mangas");
    const mangasSnap = await getDocs(mangasRef);

    const mangasData = [];
    const rgx = new RegExp(`([6-9]|10)`);

    mangasSnap.forEach((item) => {
        const temp =
            item.data().rating.totalRating / item.data().rating.totalUsers;
        +temp >= 6 &&
            mangasData.push({
                id: item.id,
                data: item.data(),
            });
    });

    return mangasData;
};
