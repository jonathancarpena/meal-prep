import React, { useState, useEffect } from 'react'

// React Router
import { Link, useParams } from 'react-router-dom'

// API
import { get_SingleMeal, get_SimilarMeals } from '../../lib/api'

// Components
import Main from '../../components/Meals/Single/Main'
import Recommended from '../../components/Meals/Single/Recommended'
import Loading from '../../components/Admin/Loading'

// Icons
import { FiChevronRight } from 'react-icons/fi'

function SingleMeal() {
    const { _id } = useParams()
    const [loading, setLoading] = useState(true)
    const [meal, setMeal] = useState(null)
    const [similarMeals, setSimilarMeals] = useState(null)

    useEffect(() => {
        // Fetch Todays Meals

        if (meal === null) {
            get_SingleMeal(_id)
                .then(data => {
                    setMeal(data)
                })
        }


    }, [_id, meal])

    useEffect(() => {
        if (meal !== null && similarMeals === null) {
            get_SimilarMeals(meal.type)
                .then(data => setSimilarMeals([...data]))
        }
    }, [meal, similarMeals])

    useEffect(() => {
        if (meal !== null && similarMeals !== null) {
            setLoading(false)
        }
    }, [meal, similarMeals])

    if (loading) {
        return <Loading />
    }
    return (
        <div className='mt-[90px] bg-neutral-100 px-10 sm:p-20 flex flex-col space-y-20'>
            {/* Breadcrumbs */}
            <div className='absolute top-[7.5rem] flex space-x-1 items-center'>
                <Link to='/meals'>
                    Meals
                </Link>
                <FiChevronRight className='inline-block text-2xl' />
                {meal.active ?
                    <>
                        <Link to='/meals/today'>
                            Today
                        </Link>
                        <FiChevronRight className='inline-block text-2xl' />
                        <span className='font-semibold'>{meal.name}</span>
                    </>
                    : <>
                        <span className='font-semibold'>{meal.name}</span>
                    </>
                }
            </div>

            <Main data={meal} />
            <Recommended similarMeals={similarMeals} />
        </div>
    )
}

export default SingleMeal