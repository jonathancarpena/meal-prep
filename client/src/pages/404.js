import React from 'react'

// Router
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className='mt-[90px] py-10 px-20 flex justify-center flex-col items-center h-[70vh]'>

            <h1 className='font-bold text-9xl text-neutral-400'>
                404
            </h1>
            <h2 className='font-bold text-2xl text-neutral-400'>
                Page Not Found
            </h2>

            <button onClick={() => navigate('/')} className='mt-10 bg-yellow-500 rounded-lg text-2xl font-semibold text-white px-5 py-3'>
                Go Home
            </button>




        </div>
    )
}

export default NotFound