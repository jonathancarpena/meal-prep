import React, { useState } from 'react'

// API
import { IMAGE_API } from '../../lib/api'

// Router
import { useNavigate } from 'react-router-dom'

// Utils
import { replaceSpaces } from '../../lib/utils'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { updateQtyBag } from '../../redux/features/bag/bagSlice'
import { closeSidedrawer } from '../../redux/features/modal/modalSlice'

// Icons
import { IoMdCloseCircle } from 'react-icons/io'
import { GiCookingPot } from 'react-icons/gi'
import { FaMinus, FaPlus } from 'react-icons/fa'

// Components
import { Transition } from '@tailwindui/react'

const Fade = ({ show, children }) => {
    return (
        <Transition show={show} className='z-[100] fixed' >
            <Transition.Child
                enter="transition-opacity ease-in duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-1"
                leave="transition-opacity ease-out duration-200"
                leaveFrom="opacity-1"
                leaveTo="opacity-0"
            >
                {children}
            </Transition.Child>
        </Transition >
    )
}


const QtyAdjust = ({ qty, setQty, index }) => {
    const dispatch = useDispatch()
    function handleUpdateQty(condition) {
        let newQty = qty
        if (condition === "add") {
            newQty += 1
            setQty(newQty)
        } else {
            if (qty !== 1) {
                newQty -= 1
                setQty(newQty)
            }
        }
        dispatch(updateQtyBag({ qty: newQty, index }))
    }
    return (
        <div className='flex border-2 bg-white overflow-hidden border-neutral-700 rounded-xl w-max'>
            <button disabled={qty === 1} onClick={() => handleUpdateQty('sub')} className={`${qty > 1 ? 'text-neutral-800' : 'text-neutral-400'} p-2 w-[40px] h-[40px]`}>
                <FaMinus className={`text-xl`} />
            </button>
            <span className='select-none bg-white p-2 text-lg w-[40px] h-[40px] flex items-center justify-center'>
                {qty}
            </span>
            <button onClick={() => handleUpdateQty('add')} className={`text-neutral-800  p-2 w-[40px] h-[40px]`}>
                <FaPlus className='text-xl' />
            </button>
        </div>
    )
}

const BagItem = ({ item, index }) => {
    const [qty, setQty] = useState(item.qty)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function generatePriceTotal(price) {
        let total = price * qty
        return `${total}.00`
    }

    function handleNavigate() {
        navigate(`/meals/${replaceSpaces(item.name)}/${item._id}`)
        dispatch(closeSidedrawer())
    }
    return (
        <li className='p-2 flex justify-between items-center '>
            <div className='flex space-x-4'>
                <div onClick={() => handleNavigate()} className='cursor-pointer w-[100px] h-[100px] flex rounded-2xl justify-center items-center overflow-hidden bg-neutral-300'>
                    {item.img
                        ? <img src={`${IMAGE_API}/${item.img}`} alt={item.name} className='w-full h-full object-center object-cover rounded-lg ' />
                        : <GiCookingPot className='text-[4rem] text-white' />
                    }
                </div>

                <div className='flex flex-col justify-between'>
                    <p onClick={() => handleNavigate()} className='cursor-pointer font-semibold'>
                        {item.name}
                    </p>
                    <QtyAdjust
                        index={index}
                        qty={item.qty}
                        setQty={setQty}
                    />
                </div>

            </div>


            <div className='flex justify-end'>
                <p className='text-right text-xl font-semibold'>
                    ${generatePriceTotal(item.price, item.qty)}
                </p>
            </div>


        </li>
    )
}
function OrderSidedrawer() {
    const bag = useSelector(state => state.bag)
    const { sideDrawer } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    function generateBagTotal() {
        let total = 0;
        bag.forEach((item) => {
            let itemTotal = item.price * item.qty
            total += itemTotal
        })
        return `$${total}.00`
    }

    function handleCheckout() {
        dispatch(closeSidedrawer())
        navigate('/order')
    }
    return (
        <>

            <div
                className={`${sideDrawer ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full sm:translate-y-0'} transition-all ease-in-out duration-300 fixed inset-0 z-[150] `}
            >

                <div className="absolute w-screen  bottom-0 sm:right-0  sm:w-[400px]">
                    {/*content*/}
                    <div className="h-[70vh] rounded-t-3xl sm:h-screen  sm:rounded-tr-none sm:rounded-l-3xl  border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="min-h-[92px] flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                YOUR BAG
                            </h3>
                            <button
                                className="p-1 ml-auto  border-0 text-black  float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => dispatch(closeSidedrawer())}
                            >
                                <IoMdCloseCircle className='text-yellow-500' />
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-3 flex-auto bg-neutral-100">
                            <ul className={`${bag.length > 3 ? 'overflow-y-scroll sm:overscroll-y-none' : ''} ${bag.length > 5 ? 'sm:overscroll-y-scroll' : ''} flex flex-col space-y-5`}>
                                {bag.map((item, index) => (
                                    <BagItem key={`bagItem-${index}`} item={item} index={index} />
                                ))}
                            </ul>
                        </div>
                        {/*footer*/}
                        <div className="flex flex-col space-y-4 p-6 border-t border-solid border-slate-200 rounded-b">
                            <div className='flex justify-between text-lg'>
                                <span>Subtotal</span>
                                <span className='font-semibold'>{generateBagTotal()}</span>
                            </div>

                            <button
                                className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>

                        </div>
                    </div>
                </div>

            </div>



            <Fade show={sideDrawer}>
                <div className={` opacity-25 fixed inset-0 z-[100] bg-black`}></div>
            </Fade>



        </>




    )
}

export default OrderSidedrawer