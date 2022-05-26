import React from 'react'

// Images
import Accent from '../../images/home/steps-accent.png'

// Icons
import { BsCalendarCheck } from 'react-icons/bs'
import { GiHotMeal } from 'react-icons/gi'
import { RiUserSmileLine } from 'react-icons/ri'

const StepsContent = [
    {
        text: 'You Order',
        img: <BsCalendarCheck className='text-[150px] ' />,
        description: "Select which meals you’d like and order online. Our menu changes weekly so you’ll always enjoy trying something new."
    },
    {
        text: 'We Prep',
        img: <GiHotMeal className='text-[150px] ' />,
        description: "Our chefs prepare your healthy meals fresh — they’re never frozen. We deliver them straight to your doorstep."
    },
    {
        text: 'You Enjoy',
        img: <RiUserSmileLine className='text-[150px] ' />,
        description: "Your fully prepared meals are already cooked, assembled, and ready to eat. All you have to do is heat them up and enjoy!"

    },
]

function Steps() {
    return (
        <div className='bg-neutral-200 px-12 py-24 relative text-neutral-700 drop-shadow-xl overflow-visible'>


            {/* Title */}
            <h1 className='text-5xl  font-semibold text-center uppercase'>
                Made Easy
            </h1>


            {/* Accent */}
            {/* <div className=' sm:visible sm:absolute sm:-top-10 brightness-[1] grayscale '>
                <img src={Accent} width={100} height={200} />
            </div> */}



            {/* Content */}
            <ul className='flex flex-col space-y-10 w-full  mt-12 sm:flex-row sm:justify-evenly sm:space-x-5 sm:space-y-0'>
                {StepsContent.map((item) => (
                    <div key={item.text} className='text-center flex flex-col items-center space-y-5 sm:w-[30%]'>

                        {/* Icon */}
                        {item.img}

                        {/* Header */}
                        <h1 className='uppercase text-4xl font-bold '>
                            {item.text}.
                        </h1>

                        {/* Description */}
                        <p className=''>
                            {item.description}
                        </p>
                    </div>
                ))}
            </ul>

        </div>
    )
}

export default Steps