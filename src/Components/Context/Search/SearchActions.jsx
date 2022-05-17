import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.config";

export function queryManga(searchQuery) {
    const q = query(collection(db, "mangas"), where("name", "==", searchQuery));
    const result = [];

    const mangaRef = onSnapshot(q, (mangaSnap) => {
        if (mangaSnap.exists()) {
            mangaSnap.forEach((item) =>
                result.push({
                    id: item.id,
                    data: item.data(),
                })
            );
        }
    });

    return result;
}
