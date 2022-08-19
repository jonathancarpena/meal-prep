import { useState, useEffect } from 'react'

// Firebase
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../lib/firebase'

// Icons
import { CgSpinner, CgUnavailable } from 'react-icons/cg'


function Image({ src, alt, width = "100%", height = "auto", sx }) {
    const [imageSrc, setImageSrc] = useState(null)
    const [error, setError] = useState(false)
    const image = ref(storage, `images/${src}`)
    useEffect(() => {
        getDownloadURL(image)
            .then((res) => {
                setImageSrc(res)
            })
            .catch(() => setError(true))
    }, [image])

    return (
        <>
            {!imageSrc
                ? <div style={{ width: width, height: height }} className='bg-white flex justify-center items-center'>
                    {!error
                        ? <CgSpinner className='w-full h-full text-neutral-200 animate-spin' />
                        : <CgUnavailable className='w-full h-full text-neutral-200' />
                    }

                </div>
                : <img src={imageSrc} alt={alt ? alt : src} width={width} height={height} className={sx} />}
        </>
    )
}

export default Image