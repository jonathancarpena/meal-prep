import React, { useEffect, useState } from 'react'

// API
import { put_UpdateMeal, IMAGE_API } from '../../../lib/api'

// Utils
import { replaceSpaces } from '../../../lib/utils'

// Router
import { Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Icons
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { GiCookingPot } from 'react-icons/gi'
import { MdStore, MdToggleOn } from 'react-icons/md'

const InfoDropdown = ({ meal }) => {
    const [showDetails, setShowDetails] = useState(false)
    const { nutrition } = meal
    const { calories, protein, carbs, fats } = nutrition


    return (
        <div onClick={() => setShowDetails(!showDetails)} className='cursor-pointer'>
            <span className='text-neutral-700'>
                Details
                {showDetails ? <FaChevronUp className='ml-2 inline-block text-secondary' /> : <FaChevronDown className='ml-2 inline-block text-secondary' />}
            </span>
            <div className={`${showDetails ? 'visible' : 'hidden'} flex flex-col space-y-2 pt-2 text-xs`}>
                <p>{calories} cals</p>
                <p>Protein: {protein}g</p>
                <p>Carbs: {carbs}g</p>
                <p>Fats: {fats}g</p>
            </div>
        </div>
    )
}

const IngredientsDropdown = ({ ingredients }) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div onClick={() => setShowDetails(!showDetails)} className='cursor-pointer'>
            <span className='text-neutral-700'>
                Details
                {showDetails ? <FaChevronUp className='ml-2 inline-block text-secondary' /> : <FaChevronDown className='ml-2 inline-block text-secondary' />}
            </span>
            <div className={`${showDetails ? 'visible' : 'hidden'} flex flex-col space-y-2 pt-2 text-xs`}>
                {ingredients.map((item, idx) => (
                    <p key={`ingredient-${idx}-${item}`} className='capitalize'>
                        {idx + 1}. {item}
                    </p>
                ))}
            </div>
        </div>
    )
}


function ActiveMeals({ meals }) {
    const MealHeaders = ["image", "name", "info", "ingredients", "actions"]
    const MobileMealHeaders = ["image", "name", "ingredients", "actions"]
    const [activeMenu, setActiveMenu] = useState([])
    const { token } = useSelector(state => state.admin)
    useEffect(() => {
        // Fetch

        if (activeMenu.length === 0) {
            const newArray = meals.filter((item) => item.active === true)
            setActiveMenu([...newArray])
        }
    }, [activeMenu.length, meals])

    async function handleToggleActive(_id, name) {
        const userConfirm = window.confirm(`Are you sure you want to make ${name} inactive?`)
        if (userConfirm) {
            const body = {
                active: false
            }
            await put_UpdateMeal(token, _id, body)
            const filteredList = activeMenu.filter((item) => item._id !== _id)
            setActiveMenu([...filteredList])
        }

    }
    return (
        <div className='bg-white rounded-xl p-5 drop-shadow-xl'>
            <h1 className='text-neutral-700 text-3xl mb-5'>
                <Link to='/admin/meals'>
                    <MdStore className='inline-block mb-1' /> Active Meals
                </Link>
            </h1>

            {/* Grid */}
            <div className=' flex-col hidden sm:flex'>

                <div className='grid grid-cols-5 gap-5 border-b-2 py-2 px-4'>
                    {MealHeaders.map((item) => (
                        <span key={item} className='uppercase '>
                            {item}
                        </span>
                    ))}
                </div>


                <div className={`${activeMenu.length > 4 ? 'overflow-y-scroll' : ''} flex flex-col  max-h-[350px]`}>
                    {activeMenu.map((element, idx) => {
                        let lastChild = false
                        if (idx === activeMenu.length - 1) {
                            lastChild = true
                        }
                        return (
                            <div className={`${lastChild ? '' : 'border-b-2'} even:bg-gray-100  grid grid-cols-5 gap-5 p-4 `} key={element._id}>
                                <Link to={`/admin/meals/${replaceSpaces(element.name)}/${element._id}`}>
                                    {element.img
                                        ? <img src={`${IMAGE_API}/${element.img}`} alt={element.name} className='w-[50px] h-[50px] object-center object-cover rounded-lg overflow-hidden' />
                                        : <span className='bg-neutral-400 w-[50px] h-[50px] flex justify-center items-center rounded-lg' >
                                            <GiCookingPot className='text-white text-3xl' />
                                        </span>
                                    }
                                </Link>
                                <Link to={`/admin/meals/${replaceSpaces(element.name)}/${element._id}`}>
                                    <span className='capitalize'>{element.name}</span>
                                </Link>
                                <InfoDropdown meal={element} />
                                <IngredientsDropdown ingredients={element.ingredients} />

                                <div className=' text-[2rem] flex items-start'>
                                    <button onClick={() => handleToggleActive(element._id, element.name)}>
                                        <MdToggleOn className='text-green-500 cursor-pointer hover:text-green-600' />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

            {/* Mobile Grid */}
            <div className=' flex-col flex sm:hidden'>

                <div className={`${activeMenu.length > 4 ? 'overflow-y-scroll' : ''} flex flex-col  max-h-[350px]`}>

                    <div className='sticky top-0 bg-white w-max grid grid-cols-[70px_200px_100px_70px] gap-5 border-b-2 py-2 px-4'>
                        {MobileMealHeaders.map((item) => (
                            <span key={item} className='uppercase '>
                                {item}
                            </span>
                        ))}
                    </div>

                    {activeMenu.map((element, idx) => {
                        let lastChild = false
                        if (idx === activeMenu.length - 1) {
                            lastChild = true
                        }
                        return (
                            <div className={`${lastChild ? '' : 'border-b-2'} even:bg-gray-100 w-max grid grid-cols-[70px_200px_100px_70px] gap-5 p-4 `} key={element._id}>
                                <Link to={`/admin/meals/${replaceSpaces(element.name)}/${element._id}`}>
                                    {element.img
                                        ? <img src={`${IMAGE_API}/${element.img}`} alt={element.name} className='w-[50px] h-[50px] object-center object-cover rounded-lg overflow-hidden' />
                                        : <span className='bg-neutral-400 w-[50px] h-[50px] flex justify-center items-center rounded-lg' >
                                            <GiCookingPot className='text-white text-3xl' />
                                        </span>
                                    }
                                </Link>
                                <Link to={`/admin/meals/${replaceSpaces(element.name)}/${element._id}`}>
                                    <span className='capitalize'>{element.name}</span>
                                </Link>
                                <IngredientsDropdown ingredients={element.ingredients} />
                                <div className=' text-[2rem] flex items-start'>
                                    <button onClick={() => handleToggleActive(element._id, element.name)}>
                                        <MdToggleOn className='text-green-500 cursor-pointer hover:text-green-600' />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default ActiveMeals