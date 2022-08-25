import React from 'react'

// Icons
import { ImSpinner } from 'react-icons/im'

function Loading() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <h1 className='text-4xl font-semibold text-neutral-600'>
                <ImSpinner className='inline-block mb-1 animate-spin-slow text-8xl' />
            </h1>
        </div>
    )
}

export default Loading