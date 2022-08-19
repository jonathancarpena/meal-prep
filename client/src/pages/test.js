import { useState } from 'react'

// Firebase
import { storage } from '../lib/firebase'
import { ref, uploadBytes, getDownloadURL, } from 'firebase/storage'

// Icons
import Image from '../components/Image'

function Test() {
    const [imageUpload, setImageUpload] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!imageUpload) return
        const filename = new Date().toISOString().replace(/:/g, '-') + '_' + imageUpload.name
        const imageRef = ref(storage, `images/${filename}`)
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                alert('Image Uploaded')
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        console.log(url)
                    })
            })
    }




    return (
        <div className='min-h-[91vh] flex flex-col justify-center items-center'>

            {/* <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
                <div className='mb-5 hover:scale-110 drop-shadow-xl transition-all ease-in-out active:scale-95'>
                    <label htmlFor="fileUpload" className=' bg-gray-200 p-5 rounded-xl cursor-pointer '>Choose File</label>
                    <input
                        id="fileUpload"
                        type="file"
                        onChange={(e) => setImageUpload(e.target.files[0])}
                    />
                </div>

                <button type="submit" className='hover:bg-blue-400 active:scale-95 transition-all ease-in-out bg-blue-500 rounded-lg text-white py-3'>
                    Upload
                </button>
            </form> */}



        </div>
    )
}

export default Test