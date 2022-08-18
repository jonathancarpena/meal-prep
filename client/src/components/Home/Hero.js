import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Image
import HeroImage from '../../images/home/meal.png'
import Lines from '../../images/home/hero-accent.png'

// Context
import { useStoreOpen } from '../../lib/context/StoreOpenProvider'


function Hero() {
    const open = useStoreOpen()

    return (
        <div className='  h-screen flex flex-col items-center justify-between  lg:flex-row lg:justify-around lg:items-end'>

            {/* Header */}
            <div className='mt-48 md:mt-40 lg:mt-0 flex flex-col  justify-center lg:place-self-center lg:w-[50%] lg:ml-8'>
                <h1 className='flex flex-col -space-y-5 font-bold uppercase tracking-tighter text-[2rem] md:text-[2.5rem] lg:text-[5rem]'>
                    <span>Your Next Favorite</span>
                    <span>
                        <span className='border-b-8 border-b-yellow-400 w-max mr-2 lg:mr-3'>Macro-Friendly</span>
                        <span>Meals.</span>
                    </span>

                </h1>
                <h2 className=' mt-4 uppercase text-xl lg:text-3xl font-semibold  w-max italic'>
                    Everything under 500 calories.
                </h2>
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

            {/* Image */}
            <div className='flex justify-center relative lg:mr-8'>

                {/* Arch */}
                <div className=' bg-yellow-400 rounded-t-[5rem] w-screen h-[350px] md:h-[500px] z-[50] flex justify-center lg:w-[800px] lg:h-[600px]'>
                    <div className='bottom-10 relative flex justify-center'>
                        <img
                            src={HeroImage}
                            alt="Delicious Meal"
                            className='w-[350px] h-[350px] md:h-[500px] md:w-[500px] lg:w-full lg:h-full'
                        />


                        {/* Accent Lines */}
                        <div className='absolute -left-10 top-0 brightness-[1] grayscale invert z-[60]'>
                            <img
                                src={Lines}
                                alt="Delicious Meal"
                                width={200}
                                height={100}
                            />
                        </div>
                    </div>


                </div>


            </div>
        </div>
    )
}

export default Hero