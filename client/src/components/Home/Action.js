import React from 'react'


// React Router 
import { Link } from 'react-router-dom'

// Images
import ActionImg from '../../images/home/action.png'

// Context
import { useStoreOpen } from '../../lib/context/StoreOpenProvider'

function Book() {
    const open = useStoreOpen()
    return (
        <div className=' h-screen lg:h-max pt-32 overflow-hidden w-full bg-netural-100  px-12 flex flex-col-reverse lg:justify-between lg:flex-row '>


            {/* Image */}
            <div className='lg:w-[30%] bottom-20 relative flex justify-center'>
                {/* Image Wrapper */}
                <div className='z-[10]'>
                    <img src={ActionImg} alt={ActionImg} width={600} height={600} />
                </div>

                {/* Arch */}
                <div
                    className='absolute top-20 left-[50%] -translate-x-[50%] h-[100%] w-[450px] bg-yellow-400 rounded-t-[5rem]  '></div>
            </div>

            {/* Action Button */}
            <div className='lg:w-[60%] mb-44 '>

                <div className='mb-10'>
                    <h2 className='  text-5xl lg:text-7xl font-extrabold uppercase text-neutral-700'>
                        Feeling Hungry<span className='text-yellow-400'>?</span>
                    </h2>
                    <h2 className='  text-5xl lg:text-7xl font-extrabold uppercase text-neutral-700'>
                        Lets eat<span className='text-yellow-400'>!</span>
                    </h2>
                </div>

                {open
                    ? <Link to='/meals/today' className=' mt-8 w-max'>
                        <button className='drop-shadow-lg text-white text-xl lg:text-3xl font-semibold w-full bg-yellow-400 hover:scale-105 hover:bg-yellow-300 active:bg-yellow-400 active:scale-95 transition-all ease-in-out px-5 py-5 rounded-2xl lg:w-max lg:px-20'>
                            ORDER NOW
                        </button>
                    </Link>
                    : <Link to='/meals/today' className=' mt-8 w-max'>
                        <button className=' drop-shadow-lg text-white text-xl lg:text-3xl font-semibold w-full bg-yellow-400 hover:scale-105 hover:bg-yellow-300 active:bg-yellow-400 active:scale-95 transition-all ease-in-out px-5 py-5 rounded-2xl lg:w-max lg:px-20'>
                            VIEW THE MENU
                        </button>
                    </Link>
                }
            </div>

        </div>
    )
}

export default Book