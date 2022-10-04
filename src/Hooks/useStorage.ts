import { useState } from "react"

interface StorageItem {
  key: string
  data: object | string
}

const useStorage = (item: StorageItem) => {
  const [storageItem, setStorageItem] = useState(() =>
    checkStorage(item)
  )

  const updateStorageItem = (arg: any) => {
    const ref =
      arg instanceof Function ? arg(storageItem) : arg
    setStorageItem(ref)
    localStorage.setItem(ref.key, JSON.stringify(ref.data))
  }

  const clearItem = () => clearStorage(item.key)
  return { storageItem, updateStorageItem, clearItem }
}

// Retrieve information
export function checkStorage({ key, data }: StorageItem) {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)!)
    : { key, data }
}

export function getFromStorage(key: string) {
  return JSON.parse(localStorage.getItem(key)!)
}

export function clearStorage(key: string) {
  localStorage.removeItem(key)
}

export function checkExpiredStorageItem(key: string) {
  const item = JSON.parse(localStorage.getItem(key)!)
  const time = new Date().getTime()
  if (item && item.expire <= time) return true
  return false
}

// default time (current + 5 min)
export function setExpirationDate(currentTime: any) {
  return currentTime + 300000 // + 5 min
}

export default useStorage
