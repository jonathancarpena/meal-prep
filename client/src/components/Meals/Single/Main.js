import React, { useState } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { addToBag } from '../../../redux/features/bag/bagSlice'
import { showSidedrawer } from '../../../redux/features/modal/modalSlice'
import { updateSession } from '../../../redux/features/session/sessionSlice'

// Icons
import { GiCookingPot } from 'react-icons/gi'
import { FaPlus, FaMinus } from 'react-icons/fa'

// Context
import { useStoreOpen } from '../../../lib/context/StoreOpenProvider'

// Components
import Image from '../../Image'

function Main({ data }) {
    const { active, img, name, price, nutrition: { calories, protein, carbs, fats }, ingredients, description } = data
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const open = useStoreOpen()

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
        dispatch(updateSession())
        dispatch(showSidedrawer())
        setQty(1)
    }
    return (
        <div className='flex flex-col items-center lg:items-start lg:flex-row lg:space-x-10'>
            {/* Image */}
            <div className={`${!img ? 'bg-neutral-300' : ''}  w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] shrink flex justify-center items-center overflow-hidden `}>
                {img
                    ? <Image src={img} alt={name} sx='rounded-xl object-cover object-center' />
                    : <GiCookingPot className='text-white text-[7rem]' />
                }
            </div>


            <div className='flex flex-col flex-none lg:w-[40%]'>

                {/* Name */}
                <div className={`${active ? 'mt-5' : 'my-5'}`}>
                    <h1 className='text-4xl font-semibold uppercase mb-4'>
                        {name}
                    </h1>
                </div>

                {/* Add To Bag, Quantity */}
                {active ?
                    <div className='w-full flex flex-col space-y-4 mb-10'>
                        <span className='font-semibold text-xl'>${price}.00</span>
                        {/* Quantity */}
                        <div className='flex items-center'>
                            <button disabled={qty === 1 || !open} onClick={() => handleQtyChange('sub')} className={`${qty > 1 ? 'bg-yellow-200' : 'bg-yellow-100'} p-2 w-[40px] h-[40px]`}>
                                <FaMinus className={`text-xl`} />
                            </button>
                            <span className='bg-white p-2 text-lg w-[40px] h-[40px] flex items-center justify-center'>
                                {!open ? 0 : qty}
                            </span>
                            <button disabled={!open} onClick={() => handleQtyChange('add')} className={` bg-yellow-200 p-2 w-[40px] h-[40px]`}>
                                <FaPlus className='text-xl' />
                            </button>
                        </div>
                        <button disabled={!open} onClick={handleAddToBag} className={`${open ? '' : 'opacity-60'} w-[80%] text-2xl text-white py-3 px-5 bg-yellow-400`}>
                            {!open ? 'Booked For Today' : 'Add to Bag'}
                        </button>
                    </div>
                    : <div className='w-full flex flex-col space-y-4 mb-10 mt-[-15px]'>

                        <h2 className='select-none w-[80%] text-xl lg:text-2xl text-white py-3 px-5 bg-yellow-400 opacity-60 text-center'>
                            Currently Not Serving
                        </h2>
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