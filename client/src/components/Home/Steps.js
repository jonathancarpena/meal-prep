import React from 'react'


// Icons
import { BsCalendarCheck } from 'react-icons/bs'
import { GiHotMeal } from 'react-icons/gi'
import { RiUserSmileLine } from 'react-icons/ri'

const StepsContent = [
    {
        text: 'You Order',
        img: <BsCalendarCheck className='text-[100px] lg:text-[125px]' />,
        description: "Select which meals you’d like and order online. Our menu changes weekly so you’ll always enjoy trying something new."
    },
    {
        text: 'We Prep',
        img: <GiHotMeal className='text-[100px] lg:text-[125px]' />,
        description: "I prepare your healthy meals fresh — they’re never frozen. We deliver them straight to your doorstep or you can pick it up."
    },
    {
        text: 'You Enjoy',
        img: <RiUserSmileLine className='text-[100px] lg:text-[125px]' />,
        description: "Your fully prepared meals are already cooked, assembled, and ready to eat. All you have to do is heat them up and enjoy!"

    },
]


function Steps() {
    return (
        <section className='rounded-b-2xl lg:rounded-2xl py-10 bg-[#333333]   flex flex-col items-center justify-center relative text-white drop-shadow-xl overflow-hidden lg:py-20 '>


            {/* Title */}
            <h2 className=' text-5xl tracking-tight font-bold text-center uppercase mb-10 lg:text-7xl lg:mb-16'>
                3 Steps<span className='text-yellow-400'>.</span>
            </h2>

            {/* Content */}
            <ul className='flex flex-col space-y-10  justify-center items-center lg:flex-row lg:space-y-0  max-w-[1500px] '>
                {StepsContent.map((item) => (
                    <div key={item.text} className='flex flex-col  space-y-2 justify-center items-center px-20  '>

                        <div className='bg-neutral-800  text-center rounded-xl drop-shadow-2xl flex flex-col justify-center items-center space-y-2 w-[200px] h-[200px] lg:w-[250px] lg:h-[250px]'>
                            {/* Icon */}
                            {item.img}

                            {/* Header */}
                            <h3 className='uppercase text-3xl font-bold '>
                                {item.text}<span className='text-yellow-400'>.</span>
                            </h3>
                        </div>


                        {/* Description */}
                        <p className='text-center tracking-tight md:max-w-[600px]  md:text-lg  rounded-lg p-2'>
                            {item.description}
                        </p>
                    </div>
                ))}
            </ul>

        </section>
    )
}

export default Steps