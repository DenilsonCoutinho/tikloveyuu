import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import app from "./firebase";

export const deleteFolder = async (userId: string | null) => {
    const storage = getStorage(app)

    const folderRef = ref(storage, `user/${userId}/images`);
    const listRef = await listAll(folderRef);

    for (const item of listRef.items) {
        await deleteObject(item);
    }
};

export const deleteFolderReq = async (userId: string | null) => {
    const storage = getStorage(app)

    const folderRef = ref(storage, `requestSend/${userId}/images`);
    const listRef = await listAll(folderRef);

    for (const item of listRef.items) {
        await deleteObject(item);
    }
};