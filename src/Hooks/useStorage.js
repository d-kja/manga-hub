import { useState } from "react";

const useStorage = (item) => {
    const [storageItem, setStorageItem] = useState(() => checkStorage(item));

    const updateStorageItem = (arg) => {
        const ref = arg instanceof Function ? arg(storageItem) : arg;
        setStorageItem(ref);
        localStorage.setItem(ref.key, JSON.stringify(ref.data));
    };

    const clearItem = () => clearStorage(item.key);
    return { storageItem, updateStorageItem, clearItem };
};

// Retrieve information
export function checkStorage({ key, data }) {
    return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : { key, data };
}

export function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function clearStorage(key) {
    localStorage.removeItem(key);
}

export function checkExpiredStorageItem(key) {
    const item = JSON.parse(localStorage.getItem(key));
    const time = new Date().getTime();
    if (item && item.expire <= time) return true;
    return false;
}

// default time (current + 10 min)
export function setExpirationDate(currentTime) {
    return currentTime + 600000; // + 10 min
}

export default useStorage;
