import React, { useEffect, useState } from 'react'

// Router
import { Link } from 'react-router-dom'

// API
import { get_AllMeals } from '../../lib/api'

// Components
import MealGrid from '../../components/Meals/MealGrid'

// Icons
import {
    MdBreakfastDining,
    MdLunchDining,
    MdDinnerDining
}
    from 'react-icons/md'


function Today() {
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    useEffect(() => {
        // Fetch Todays Meals
        if (content === null) {
            get_AllMeals()
                .then(data => {
                    setContent([...data])
                })
        }
    }, [content])

    useEffect(() => {
        if (content !== null) {
            setLoading(false)
        }
    }, [content])

    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='mt-[90px] bg-neutral-100 p-20 relative'>



            <h1 className='text-4xl text-center font-semibold text-neutral-700 mb-2'>
                All Meals
            </h1>
            <Link to='/meals/today'>
                <h3 className='text-secondary text-center mb-8 underline underline-offset-2'>
                    See today's menu
                </h3>
            </Link>


            {/* Icons */}
            <div className='text-neutral-700 flex space-x-10 justify-center mb-8 p-3 bg-neutral-100 w-max rounded-xl mx-auto'>
                <p className='flex items-center'>
                    <MdBreakfastDining className=' inline-block text-2xl' />
                    <span className='ml-2 '>Breakfast</span>
                </p>
                <p className='flex items-center'>
                    <MdLunchDining className=' inline-block text-2xl' />
                    <span className='ml-2'>Lunch</span>
                </p>
                <p className='flex items-center '>
                    <MdDinnerDining className=' inline-block text-2xl' />
                    <span className='ml-2 '>Dinner</span>
                </p>
            </div>

            <MealGrid data={content} />

        </div>
    )
}

export default Today