import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export const useUploadImage = () => {
    const uploadImages = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage();
            const fileName = `${file.name}-${uuid()}`;
            const storageRef = ref(storage, "users/" + fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });
    };

    const upload = async (item) => {
        const myUrl = await uploadImages(item).catch((error) => {
            toast.error("Something went wrong, unable to upload files", {
                theme: "dark",
            });
            console.log(error);
            return;
        });

        return myUrl;
    };

    return { upload };
};
