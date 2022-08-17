import React from 'react'

// Images
import Meal2 from '../../images/home/meals-2.png'
import Meal3 from '../../images/home/meals-3.png'


// Icons
import { BsArrowDown, BsTrophy } from 'react-icons/bs'

function Practices() {
    const PracticesContent = [
        {
            text: 'Low Calories',
            img: <span className='flex justify-center items-center sm:h-[65px] text-white text-[35px]'>
                <BsArrowDown /> 500
            </span>
        },
        {
            text: 'Packed w/ Protein',
            img: <img src={Meal2} alt='packed-with-protein' />
        },
        {
            text: 'Always Fresh',
            img: <img src={Meal3} alt='always-fresh' />
        },
        {
            text: 'Certified Delicious',
            img: <BsTrophy className='text-white text-[66px]' />
        },
    ]
    return (
        <div className='bg-neutral-100 relative z-10'>

            <div className='bg-yellow-400 w-[95%] lg:w-[90%] mx-auto rounded-t-3xl  z-[50] text-center py-24 flex flex-col justify-center items-center'>
                <h2 className=' text-white text-4xl tracking-tight font-bold text-center uppercase lg:mb-10 lg:text-6xl '>
                    WHAT TO EXPECT<span className='text-neutral-700'>:</span>
                </h2>

                <ul className=' mt-12 lg:mt-0 grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-20 lg:px-20'>
                    {PracticesContent.map((item) => (
                        <li key={item.text} className='select-none cursor-default hover:scale-110 transition-all ease-in-out duration-300 w-[150px] h-[150px] lg:w-[170px] lg:h-[170px] rounded-xl flex flex-col items-center justify-center space-y-5 text-white bg-neutral-700  drop-shadow-xl'>
                            <div className='flex justify-center max-h-[60px] '>
                                {item.img}
                            </div>
                            <span className='lg:text-lg font-semibold '>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Practices