import { fetchMangas } from "../Mangas/MangaActions";

export const fetchBanner = async () => {
    return await fetchMangas();
};
