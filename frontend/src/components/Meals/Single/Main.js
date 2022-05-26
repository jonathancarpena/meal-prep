import React, { useState } from 'react'

// API
import { IMAGE_API } from '../../../lib/api'

// Redux
import { useDispatch } from 'react-redux'
import { addToBag } from '../../../redux/features/bag/bagSlice'
import { showSidedrawer } from '../../../redux/features/modal/modalSlice'

// Icons
import { GiCookingPot } from 'react-icons/gi'
import { FaPlus, FaMinus } from 'react-icons/fa'

function Main({ data }) {
    const { active, type, img, name, price, nutrition: { calories, protein, carbs, fats }, ingredients, description } = data
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()


    function handleQtyChange(condition) {
        if (condition === "add") {
            setQty(prevState => prevState + 1)
        } else {
            if (qty !== 1) {
                setQty(prevState => prevState - 1)
            }
        }
    }

    function handleAddToBag() {
        dispatch(addToBag({ ...data, qty }))
        dispatch(showSidedrawer())
        setQty(1)
    }
    return (
        <div className='flex flex-col sm:flex-row sm:space-x-10'>
            {/* Image */}
            <div className={`${!img ? 'bg-neutral-300' : ''}  w-full h-[400px] sm:w-[600px] sm:h-[600px] shrink flex justify-center items-center overflow-hidden `}>
                {img
                    ? <img src={`${IMAGE_API}/${img}`} alt={name} className='w-full h-full rounded-xl object-cover object-center' />
                    : <GiCookingPot className='text-white text-[7rem]' />
                }
            </div>


            <div className='flex flex-col flex-none sm:w-[40%]'>

                {/* Name */}
                <div className={`${active ? 'mt-10' : 'my-10'}`}>
                    <h1 className='text-4xl font-semibold uppercase mb-4'>
                        {name}
                    </h1>
                </div>

                {/* Add To Bag, Quantity */}
                {active &&
                    <div className='w-full flex flex-col space-y-4 mb-10'>
                        <span className='font-semibold text-xl'>${price}.00</span>
                        {/* Quantity */}
                        <div className='flex items-center'>
                            <button disabled={qty === 1} onClick={() => handleQtyChange('sub')} className={`${qty > 1 ? 'bg-yellow-200' : 'bg-yellow-100'} p-2 w-[40px] h-[40px]`}>
                                <FaMinus className={`text-xl`} />
                            </button>
                            <span className='bg-white p-2 text-lg w-[40px] h-[40px] flex items-center justify-center'>
                                {qty}
                            </span>
                            <button onClick={() => handleQtyChange('add')} className={` bg-yellow-200 p-2 w-[40px] h-[40px]`}>
                                <FaPlus className='text-xl' />
                            </button>
                        </div>
                        <button onClick={handleAddToBag} className='w-[80%] text-2xl text-white py-3 px-5 bg-yellow-400'>
                            Add
                        </button>
                    </div>
                }

                {/* Info */}
                <div className='flex flex-col space-y-4'>
                    <div>
                        <span className='font-semibold underline underline-offset-2'>Nutrition Facts</span>
                        <p>Calories {calories} | Protein {protein}g | Carbs {carbs}g | Fat {fats}g </p>
                    </div>

                    <div>
                        <span className='font-semibold underline underline-offset-2'>Ingredients</span>
                        <p className='capitalize'>{ingredients.toString()}</p>
                    </div>

                    <div>
                        <span className='font-semibold underline underline-offset-2'>Description</span>
                        <p>{description}</p>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default Main