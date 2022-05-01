export const fetchBanner = async () => {
    const fpromise = await fetch("/banners");
    const fdata = await fpromise.json();
    return fdata;
};
