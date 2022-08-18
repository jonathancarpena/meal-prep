import React, { useEffect, useState } from 'react'

// Router
import { Link } from 'react-router-dom'

// API
import { get_TodaysMeals } from '../../lib/api'

// Components
import MealGrid from '../../components/Meals/MealGrid'
import Loading from '../../components/Admin/Loading'

// Icons
import { FiChevronRight } from 'react-icons/fi'
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
            get_TodaysMeals()
                .then(data => setContent([...data]))
        }
    }, [content])

    useEffect(() => {
        if (content !== null) {
            setLoading(false)
        }
    }, [content])

    if (loading) {
        return <Loading />
    }
    return (
        <div className='mt-[90px] bg-neutral-100  p-20 sm:p-20 relative'>
            {/* Breadcrumbs */}
            <div className='hidden absolute sm:flex space-x-1 items-center'>
                <Link to='/meals'>
                    Meals
                </Link>
                <FiChevronRight className='inline-block text-2xl' />
                <span className='font-semibold'>Today</span>
            </div>

            <h1 className='text-4xl text-center font-semibold text-neutral-700 mb-2 sm:mb-8'>
                Today's Menu!
            </h1>
            <Link to='/meals' className='sm:hidden'>
                <h3 className='text-secondary text-center mb-8 underline underline-offset-2'>
                    See Past Items
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