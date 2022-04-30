export const fetchMangas = async () => {
    const mangaPromise = await fetch(`/mangas`);
    const mangaData = await mangaPromise.json();

    return mangaData;
};
