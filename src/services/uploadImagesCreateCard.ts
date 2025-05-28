interface responseUpload {
    imgUpload?: string[] | undefined // Propriedade opcional para URLs de imagem
    errorImg?: string ; // Propriedade opcional para mensagens de erro
}
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../lib/firebase";

export async function handleUploadCreateSurprise(imageCouple: any, idUser: string): Promise<responseUpload> {

    const storage = getStorage(app)
    const uploads = imageCouple?.map((image: any) => {
        const storageRef = ref(storage, `CreateCard/${idUser}/images/${image?.name}`);
        return uploadBytes(storageRef, image) // Faz o upload de cada foto
            .then((snapshot) => {

                return getDownloadURL(snapshot.ref); // Obtém a URL de download
            })
            .catch((error) => {
                console.error(`Erro ao enviar foto ${image}:`, error);
            });
    })

    try {
        const urls = await Promise.all(uploads);
        return { imgUpload: urls }
    } catch (error:unknown) {
        if(error instanceof Error){
            console.error("Erro ao enviar as fotos:", error);
            return { errorImg: error.message }
        }
        return  {errorImg:"Erro ao enviar as fotos"}
    }
}