import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase.config";

// TODO replace this, it's sort of useless to use a new context
export const fetchBanner = async () => {
    const mangasRef = collection(db, "mangas");
    const mangasSnap = await getDocs(mangasRef);

    const mangasData = [];
    const rgx = new RegExp(`[6-9]|10`);

    mangasSnap.forEach((item) => {
        const temp =
            item.data().rating.totalRating / item.data().rating.totalUsers;
        temp.toString().match(rgx) &&
            mangasData.push({
                id: item.id,
                data: item.data(),
            });
    });

    return mangasData;
};
