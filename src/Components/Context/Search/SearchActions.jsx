import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.config";

export const queryManga = async (searchQuery) => {
    const q = query(
        collection(db, "mangas"),
        where("name", ">=", searchQuery),
        where("name", "<=", searchQuery + "\uf8ff")
    );
    const result = [];

    await onSnapshot(q, (mangaSnap) => {
        mangaSnap.forEach((item) =>
            result.push({
                id: item.id,
                data: item.data(),
            })
        );
    });

    return result;
};
