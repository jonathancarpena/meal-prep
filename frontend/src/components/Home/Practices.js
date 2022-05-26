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
            text: 'Packed with Protein',
            img: <img src={Meal2} />
        },
        {
            text: 'Always Fresh',
            img: <img src={Meal3} />
        },
        {
            text: 'Certified Delicious',
            img: <BsTrophy className='text-white text-[66px]' />
        },
    ]
    return (
        <div className='bg-yellow-400 relative z-10'>

            <div className='bg-yellow-500 w-[90%] mx-auto rounded-t-3xl '>
                <div className=' z-[50] text-center py-20'>

                    <h1 className='mx-16 sm:mx-0 text-white font-bold text-3xl tracking-tighter'>
                        EVERY MEAL IS CHEF-PREPARED
                    </h1>

                    <ul className='hidden sm:flex sm:w-full sm:justify-evenly sm:mt-12'>
                        {PracticesContent.map((item) => (
                            <li key={item.text} className='flex flex-col items-center justify-center space-y-5 text-white'>
                                <div className='flex justify-center max-h-[60px]'>
                                    {item.img}
                                </div>
                                <span className='text-lg font-semibold'>{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div className='sm:hidden grid grid-cols-2 mt-12 gap-5 mx-auto w-full'>
                        {PracticesContent.map((item) => (
                            <div key={item.text} className='m-5 flex flex-col items-center justify-center space-y-5 text-white'>
                                <div className='flex justify-center max-h-[100px] w-[100px]'>
                                    {item.img}
                                </div>
                                <span className='text-lg font-semibold'>{item.text}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Practices