import React from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Utils
import { replaceSpaces } from '../../lib/utils'

// Icons
import { GiCookingPot } from 'react-icons/gi'
import {
    MdBreakfastDining,
    MdLunchDining,
    MdDinnerDining
} from 'react-icons/md'

// Components
import Image from '../Image'



function MealGrid({ data }) {
    const navigate = useNavigate()

    const MealType = {
        breakfast: {
            icon: <MdBreakfastDining className='text-white inline-block text-[2rem]' />,
            color: 'bg-orange-400'
        },
        lunch: {
            icon: <MdLunchDining className='text-white inline-block text-[2rem]' />,
            color: 'bg-green-400'
        },
        dinner: {
            icon: <MdDinnerDining className='text-white inline-block text-[2rem]' />,
            color: 'bg-red-400'
        }
    }
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 md:max-w-[650px] lg:grid-cols-3 justify-items-center place-items-center gap-7  lg:max-w-[1000px] mx-auto `}>
            {data.map((item, idx) => (
                // Product
                <div
                    onClick={() => navigate(`/meals/${replaceSpaces(item.name)}/${item._id}`)}
                    key={`meal-${idx}`}
                    className={` relative cursor-pointer sm:hover:drop-shadow-xl sm:hover:scale-110 transition-all duration-200 ease-in-out overflow-hidden h-[300px] w-[300px] rounded-b-xl drop-shadow-lg flex items-center justify-center`}>

                    {/* Image */}
                    <div className={`${!item.img ? 'bg-neutral-300' : 'bg-white'}  w-full h-full flex justify-center items-center `}>
                        {item.img
                            ? <Image src={`${item.img}`} />
                            : <GiCookingPot className='text-white text-[7rem] relative bottom-5' />
                        }
                    </div>

                    {/* Name */}
                    <div className='bg-white h-[70px] flex items-center justify-center absolute bottom-0 w-full'>
                        <span className='uppercase font-semibold text-neutral-700'>
                            {item.name}
                        </span>
                    </div>

                    {/* Type Bookmark */}
                    <span className={`${MealType[item.type].color} absolute -top-[0.5rem] left-0 p-4  rounded-b-[100%] drop-shadow-sm`}>
                        {MealType[item.type].icon}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default MealGrid