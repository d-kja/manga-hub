import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage"
import { v4 as uuid } from "uuid"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const useCloudStorage = (name: string, files: File[]) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        const uploadImages = async (file: File) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const storageRef = ref(storage, `/mangas/${name}-${uuid()}`)

                const uploadTask = uploadBytesResumable(storageRef, file)

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100
                        console.log("Upload is " + progress + "% done")
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused")
                                break
                            case "running":
                                console.log("Upload is running")
                                break
                            default:
                                break
                        }
                    },
                    (error) => {
                        reject(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                resolve(downloadURL)
                            }
                        )
                    }
                )
            })
        }

        const urlData: any = Promise.all(
            [...files].map((file) => uploadImages(file))
        ).catch((error) => {
            toast.error("Something went wrong, unable to upload files")
            setLoading(false)
            return
        })
        setData(urlData)
        setLoading(false)
    }, [files, name])

    return { loading, data }
}
