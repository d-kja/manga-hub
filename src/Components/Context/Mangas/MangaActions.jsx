export const fetchMangas = async () => {
    const mangaPromise = await fetch(`/mangas`);
    const mangaData = await mangaPromise.json();

    return mangaData;
};

export const fetchBanners = async (id) => {
    const mbannerPromise = await fetch(`/mangas/${id}`);
    const mData = await mbannerPromise.json();

    return mData;
};

export const fetchPages = async (id) => {
    const pagesPromise = await fetch(`/mangas/${id}`);
    const pages = await pagesPromise.json();

    return pages;
};
