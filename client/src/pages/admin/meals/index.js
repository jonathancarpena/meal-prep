import React, { useEffect, useState } from 'react'

// API
import { get_AllMeals, put_UpdateMeal, IMAGE_API } from '../../../lib/api'

// Utils
import { replaceSpaces } from '../../../lib/utils'

// Router
import { Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Icons
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { GiCookingPot } from 'react-icons/gi'
import { FiPlusCircle } from 'react-icons/fi'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdStore, MdToggleOff, MdToggleOn } from 'react-icons/md'


// Components
import Loading from '../../../components/Admin/Loading'
import Image from '../../../components/Image'

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

const MealStatus = ({ active, _id }) => {
    const [toggle, setToggle] = useState(active)
    const { token } = useSelector(state => state.admin)
    async function handleToggle(condition) {
        setToggle(condition)
        const body = {
            active: condition
        }
        await put_UpdateMeal(token, _id, body)
    }

    return (
        <>
            {/* Status */}
            <p className=''>
                <GrStatusGoodSmall className={`${toggle ? 'text-green-500' : 'text-red-500'} inline-block mr-2 mb-0.5`} />
                {toggle ? 'Active' : 'Inactive'}
            </p>

            {/* Actions */}
            <div className='text-[2rem] flex items-start'>
                {toggle
                    ? <button onClick={() => handleToggle(false)}>
                        <MdToggleOn className=' text-green-500 cursor-pointer hover:text-green-600' />
                    </button>

                    : <button onClick={() => handleToggle(true)}>
                        <MdToggleOff className='text-neutral-500 cursor-pointer hover:text-neutral-600' />
                    </button>
                }
            </div>
        </>
    )
}
function AdminMeals() {
    const MealHeaders = ["image", "name", "info", "ingredients", "status", "toggle"]
    const [loading, setLoading] = useState(true)
    const [meals, setMeals] = useState(null)

    useEffect(() => {
        if (meals === null) {
            get_AllMeals()
                .then(data => setMeals([...data]))
        }
    }, [meals])
    useEffect(() => {
        if (meals !== null) {
            setLoading(false)
        }
    }, [meals])

    if (loading) {
        return <Loading />
    }
    return (
        <div className='pt-[10rem] px-10 lg:px-20 pb-20'>
            <div className='bg-white rounded-xl p-5 drop-shadow-xl'>

                <div className='flex justify-between items-center'>
                    <h1 className='text-neutral-700 text-3xl mb-5'>
                        <MdStore className='inline-block mb-1' /> Meals
                    </h1>

                    <Link to='/admin/meals/add'>
                        <button className='text-lg text-neutral-500 flex space-x-2 items-center border-2 border-neutral-400 rounded-xl px-4 py-1 hover:bg-neutral-400 hover:text-white transition-all duration-200 ease-in-out'>
                            <FiPlusCircle />
                            <span>Add</span>
                        </button>
                    </Link>

                </div>


                {/* Grid */}
                <div className='lg:flex hidden flex-col '>

                    <div className='grid grid-cols-6 gap-5 border-b-2 py-2 px-4'>
                        {MealHeaders.map((item) => (
                            <span key={item} className='uppercase '>
                                {item}
                            </span>
                        ))}
                    </div>


                    <div className={`${meals.length > 10 ? 'overflow-y-scroll' : ''} flex flex-col `}>
                        {meals.map((element, idx) => {
                            let lastChild = false
                            if (idx === meals.length - 1) {
                                lastChild = true
                            }
                            return (
                                <div className={`${lastChild ? '' : 'border-b-2'} even:bg-gray-100  grid grid-cols-6 gap-5 p-4 `} key={element._id}>

                                    {/* Image */}
                                    <Link to={`/admin/meals/${replaceSpaces(element.name)}/${element._id}`} >
                                        {element.img
                                            ? <Image src={element.img} alt={element.name} width={50} height={50} sx='object-center object-cover rounded-lg overflow-hidden' />
                                            : <span className='bg-neutral-400 w-[50px] h-[50px] flex justify-center items-center rounded-lg' >
                                                <GiCookingPot className='text-white text-3xl' />
                                            </span>
                                        }
                                    </Link>

                                    {/* Name */}
                                    <Link to={`/admin/meals/${replaceSpaces(element.name)}/${element._id}`}>
                                        <span className='capitalize'>{element.name}</span>
                                    </Link>

                                    {/* Info */}
                                    <InfoDropdown meal={element} />

                                    {/* Ingredients */}
                                    <IngredientsDropdown ingredients={element.ingredients} />

                                    <MealStatus _id={element._id} active={element.active} />
                                </div>
                            )
                        })}
                    </div>

                </div>

                {/* Mobile Grid */}
                <div className='flex flex-col lg:hidden'>

                    <div className={`${meals.length > 7 ? 'overflow-y-scroll' : ''} flex flex-col max-h-[700px]`}>
                        <div className='sticky top-0 w-max overflow-visible bg-white grid grid-cols-[70px_200px_100px_100px_100px_70px] gap-5 border-b-2 py-2 px-4'>
                            {MealHeaders.map((item) => (
                                <span key={item} className='uppercase '>
                                    {item}
                                </span>
                            ))}
                        </div>
                        {meals.map((element, idx) => {
                            let lastChild = false
                            if (idx === meals.length - 1) {
                                lastChild = true
                            }
                            return (
                                <div className={`${lastChild ? '' : 'border-b-2'} w-max even:bg-gray-100  grid grid-cols-[70px_200px_100px_100px_100px_70px] gap-5 p-4 `} key={element._id}>

                                    {/* Image */}
                                    <Link to={`/admin/meals/${replaceSpaces(element.name)}/${element._id}`}>
                                        {element.img
                                            ? <Image src={element.img} alt={element.name} width={50} height={50} sx='object-center object-cover rounded-lg overflow-hidden' />
                                            : <span className='bg-neutral-400 w-[50px] h-[50px] flex justify-center items-center rounded-lg' >
                                                <GiCookingPot className='text-white text-3xl' />
                                            </span>
                                        }
                                    </Link>

                                    {/* Name */}
                                    <Link to={`/admin/meals/${replaceSpaces(element.name)}/${element._id}`}>
                                        <span className='capitalize'>{element.name}</span>
                                    </Link>

                                    {/* Info */}
                                    <InfoDropdown meal={element} />

                                    {/* Ingredients */}
                                    <IngredientsDropdown ingredients={element.ingredients} />

                                    <MealStatus _id={element._id} active={element.active} />
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AdminMeals