import { fetchMangas } from "../Mangas/MangaActions";

// TODO replace this, it's sort of useless to use a new context
export const fetchBanner = async () => {
    return await fetchMangas();
};
