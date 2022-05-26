import React from 'react'


// React Router 
import { Link } from 'react-router-dom'

// Images
import ActionImg from '../../images/home/action.png'


function Book() {
    return (
        <div className='overflow-hidden w-full bg-primary-400 pt-24 px-12 flex flex-col-reverse sm:justify-between sm:flex-row '>


            {/* Image */}
            <div className='sm:w-[30%] bottom-20 relative flex justify-center'>
                {/* Image Wrapper */}
                <div className='z-[10]'>
                    <img src={ActionImg} alt={ActionImg} width={600} height={600} />
                </div>

                {/* Arch */}
                <div
                    className='absolute top-20 left-[50%] -translate-x-[50%] h-[100%] w-[450px] bg-yellow-400 rounded-t-[5rem] text-white '></div>
            </div>

            {/* Action Button */}
            <div className='sm:w-[60%] mb-44 sm:mb-0'>

                <div className='text-white'>
                    <h1 className=' text-5xl font-extrabold uppercase'>
                        Ready to eat.
                    </h1>
                    <div className='text-2xl font-bold flex flex-col space-y-5 my-5'>
                        <p>Choose your meal.</p>
                        <p>Reserve your date. </p>
                        <p>Enjoy.</p>
                    </div>

                </div>

                <Link to='/meals/today'>
                    <button
                        className='bg-yellow-500 px-5 py-3 text-3xl text-white font-bold uppercase rounded-xl'>
                        Order Now
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default Book