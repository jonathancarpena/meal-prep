import React from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Utils
import { replaceSpaces } from '../../lib/utils'

// API
import { IMAGE_API } from '../../lib/api'

// Icons
import { GiCookingPot } from 'react-icons/gi'
import {
    MdBreakfastDining,
    MdLunchDining,
    MdDinnerDining
} from 'react-icons/md'



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
        <div className={`grid grid-cols-1 sm:grid-cols-3 justify-items-center place-items-center gap-7  max-w-[1000px] mx-auto `}>
            {data.map((item, idx) => (
                // Product
                <div
                    onClick={() => navigate(`/meals/${replaceSpaces(item.name)}/${item._id}`)}
                    key={`meal-${idx}`}
                    className={` relative cursor-pointer sm:hover:drop-shadow-xl sm:hover:scale-110 transition-all duration-200 ease-in-out overflow-hidden h-[300px] w-[300px] rounded-b-xl drop-shadow-lg flex items-center justify-center`}>

                    {/* Image */}
                    <div className={`${!item.img ? 'bg-neutral-300' : ''}  w-full h-full flex justify-center items-center `}>
                        {item.img
                            ? <img src={`${IMAGE_API}/${item.img}`} alt={item.name} />
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