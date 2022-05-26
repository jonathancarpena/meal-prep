import React, { useState, useEffect } from 'react'
import moment from 'moment'

// Router
import { useLocation, useNavigate } from 'react-router-dom'

// Redux
import { useDispatch } from 'react-redux'
import { clearBag } from '../../redux/features/bag/bagSlice'

// Icons
import { GiCookingPot } from 'react-icons/gi'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

function Success() {
    const [open, setOpen] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!state) {
            navigate('/')
        } else {
            dispatch(clearBag())
        }
    }, [])

    return (
        <div className='mt-[90px] min-h-[70vh] bg-neutral-100 py-20  sm:px-20 px-10 flex flex-col space-y-10 justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <GiCookingPot className='text-[15rem] text-yellow-500 inline-block' />
                <h1 className='font-bold text-neutral-700 text-5xl text-center'>
                    Your order is placed!
                </h1>
            </div>

            <div className='bg-white p-5 rounded-2xl flex flex-col space-y-3'>
                <h1 className='text-4xl font-bold text-neutral-700'>
                    Order Number: #{state.number}
                </h1>
                <p className='text-xl'>
                    Pick Up Date:
                    <span className='ml-3 font-semibold'>{moment(state.bookDate).format('dddd, MMM DD, YYYY')}</span>.
                </p>

                <div >
                    <span onClick={() => setOpen(!open)} className='text-xl cursor-pointer '>
                        Items {open ? <FiChevronUp className='inline-block ' /> : <FiChevronDown className='inline-block ' />}
                    </span>

                    {open &&
                        <>
                            <p className='mt-2 border-b-2 border-b-neutral-700 py-1 flex justify-between text-neutral-700'>
                                <span className=''>Name</span>
                                <span>Qty</span>
                            </p>
                            <ul className='mb-2 border-t-neutral-700  py-2 flex flex-col space-y-2'>
                                {state.bag.map((item, idx) => (
                                    <li key={`bag-item-${idx}`} className='flex justify-between font-semibold text-neutral-700 text-lg'>
                                        <span >{item.name}</span>
                                        <span>{item.qty}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }

                </div>


            </div>

        </div>
    )
}

export default Success