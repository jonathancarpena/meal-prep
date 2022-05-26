import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Image
import HeroImage from '../../images/home/meal.png'
import Lines from '../../images/home/hero-accent.png'


function Hero() {


    return (
        <div className='bg-gradient-to-tr from-primary-500 to-primary-50 flex justify-between flex-col pt-40 px-12 overflow-hidden  sm:flex-row sm:pt-52'>

            {/* Header */}
            <div className=' text-white flex flex-col space-y-5 pb-20 sm:pb-16 sm:w-[40%]'>
                <span> - ALL NEW</span>
                <h1 className='uppercase  text-6xl font-semibold tracking-tighter'>
                    The protein bar game has changed.
                </h1>
                <h2>
                    Try the protein bar that everyone hasn't stopped talking about.
                </h2>

                <Link to='/meals/today' className='w-full'>
                    <button className='w-full bg-yellow-500 px-5 py-2 rounded-3xl'>
                        ORDER NOW
                    </button>
                </Link>


            </div>

            {/* Image */}
            <div className='flex justify-center sm:w-[50%] relative'>

                {/* Arch */}
                <div className=' bg-yellow-400 rounded-t-[5rem] h-[350px] z-[50] sm:h-[600px] w-[500px] sm:absolute sm:left-[50%] sm:-translate-x-[50%] sm:-bottom-[50px] sm:-top-[30px] '>
                    {/* Image Wrapper */}
                    <div className='relative right-3  bottom-16 sm:left-3  z-[15]'>
                        <img
                            src={HeroImage}
                            alt="Delicious Meal"
                            width={450}
                            height={450}
                        />
                    </div>
                </div>

                {/* Accent Lines */}
                <div className='absolute -left-20 top-0 brightness-[1] grayscale invert z-[60]'>
                    <img
                        src={Lines}
                        alt="Delicious Meal"
                        width={200}
                        height={100}
                    />
                </div>



            </div>
        </div>
    )
}

export default Hero