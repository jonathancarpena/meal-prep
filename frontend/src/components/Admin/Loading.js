import React from 'react'

// Icons
import { BiLoaderAlt } from 'react-icons/bi'

function Loading() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <h1 className='text-4xl font-semibold text-neutral-600'>
                <BiLoaderAlt className='inline-block mb-1 animate-spin text-4xl' /> Loading
            </h1>
        </div>
    )
}

export default Loading