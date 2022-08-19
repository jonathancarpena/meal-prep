import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref, deleteObject } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDuYF_qNG-hVLuD9E0PJdhlnHr_sGKSN6w",
    authDomain: "nathan-mealprep-ad6d5.firebaseapp.com",
    projectId: "nathan-mealprep-ad6d5",
    storageBucket: "nathan-mealprep-ad6d5.appspot.com",
    messagingSenderId: "453092477885",
    appId: "1:453092477885:web:8ee177f45f239582f460d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)



export function uploadImage(imageUpload, filename) {
    if (!imageUpload) return
    if (!filename) {
        filename = new Date().toISOString().replace(/:/g, '-') + '_' + imageUpload.name
    }

    const imageRef = ref(storage, `images/${filename}`)
    uploadBytes(imageRef, imageUpload)
        .then(() => {
            alert('Image Uploaded.')
        })
        .catch(() => {
            alert('Error. Image was not Uploaded.')
        })
}

export function replaceImage(oldImage, imageUpload, filename) {
    const oldImageRef = `images/${oldImage}`
    console.log(oldImageRef)
    const desertRef = ref(storage, oldImageRef);

    // Delete Image
    deleteObject(desertRef)
        .then(() => {
            alert('Successfully deleted old image')
            uploadImage(imageUpload, filename)
        })
        .catch(() => {
            alert('Error. Trying to Delete Old Image.')
            uploadImage(imageUpload, filename)
        });


}