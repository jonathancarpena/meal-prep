import React, { useEffect, useState } from 'react'
import moment from 'moment'

// API
import { get_SingleOrder, put_UpdateOrder, delete_RemoveOrder, get_AllMeals } from '../../../lib/api/index'

// Router
import { useParams, useNavigate, Link } from 'react-router-dom'

// Utils
import { replaceSpaces } from '../../../lib/utils'

// Icons
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdDelete, MdCheckBoxOutlineBlank, MdCheckBox, MdPerson, MdMail, MdPayment, MdDateRange } from 'react-icons/md'
import { GiCookingPot } from 'react-icons/gi'

// Components
import Loading from '../../../components/Admin/Loading'
import Image from '../../../components/Image'

// Redux
import { useSelector } from 'react-redux'


const OrderStatus = ({ handleDeleteOrder, completed, setCompleted, _id, number }) => {
    const { token } = useSelector(state => state.admin)
    async function handleToggle(condition) {
        setCompleted(condition)
        const body = {
            completed: condition
        }
        await put_UpdateOrder(token, _id, body)
    }

    return (
        <div className='absolute top-[50%] -translate-y-[50%] right-5 flex space-x-2'>

            <MdDelete
                onClick={() => handleDeleteOrder(_id, number)}
                className='text-2xl text-neutral-500 hover:text-neutral-600 cursor-pointer'

            />
            {completed
                ? <button onClick={() => handleToggle(false)} className='flex items-center space-x-2'>
                    <MdCheckBox className='text-2xl text-green-500 cursor-pointer hover:text-green-600' />
                </button>
                : <button onClick={() => handleToggle(true)} className='flex items-center space-x-2'>

                    <MdCheckBoxOutlineBlank className='text-2xl text-neutral-500 cursor-pointer hover:text-neutral-600' />
                </button>
            }
        </div>
    )
}
const Items = ({ items, order }) => {

    function generateTotalItems() {
        let total = 0
        order.items.forEach(({ qty }) => total += qty)
        return total
    }
    return (
        <div>
            <h2 className='text-2xl mb-4 border-b-2 w-max border-b-neutral-700'>
                Items <span>({generateTotalItems()})</span>
            </h2>
            <ul className={`flex flex-col space-y-2 `} >
                {items.map((item, idx) => (
                    <li key={`${item._id}-${idx}`} className='flex space-x-2  even:bg-gray-100 p-2'>


                        <Link to={`/admin/meals/${replaceSpaces(item.name)}/${item._id}`}>
                            <div className='w-[70px] h-[70px] flex  justify-center items-center bg-neutral-300 object-center object-cover rounded-lg overflow-hidden'>
                                {item.img
                                    ? <Image src={item.img} alt={item.name} />
                                    : <GiCookingPot className='text-[3rem] text-white' />
                                }
                            </div>
                        </Link>


                        <div>
                            <Link to={`/admin/meals/${replaceSpaces(item.name)}/${item._id}`}>
                                <p>{item.name}</p>
                            </Link>
                            <span className=' font-semibold'>
                                Quantity: {item.qty}
                            </span>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}
const Details = ({ customer, placed, reserved }) => {

    return (
        <div>
            <h2 className='text-2xl mb-4 border-b-2 w-max border-b-neutral-700'>
                Details
            </h2>

            <div className='flex flex-col space-y-1 text-neutral-700 '>

                <p className='flex items-center space-x-2 text-base lg:text-lg'>
                    <MdPerson className='inline-block text-lg' />
                    <span>{customer.first_name} {customer.last_name}</span>
                </p>
                <p className='flex items-center space-x-2 text-base lg:text-lg'>
                    <MdMail className='inline-block text-lg' />
                    <span>{customer.email} </span>
                </p>

                <p className='flex items-center space-x-2 text-base lg:text-lg'>
                    <MdPayment className='inline-block text-lg' />
                    <span>Order Placed on: {moment(placed).format('dddd MMM DD, YYYY')}</span>
                </p>

                <p className='flex items-center space-x-2 text-base lg:text-lg'>
                    <MdDateRange className='inline-block text-lg' />
                    <span>Order Booked for: </span>
                    <span className='font-semibold underline-offset-1 underline'>{moment(reserved).format('dddd MMM DD, YYYY')}</span>
                </p>

            </div>
        </div>
    )
}
function SingleOrder() {
    const { _id, number } = useParams()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null)
    const [completed, setCompleted] = useState(null)

    const { token } = useSelector(state => state.admin)


    async function handleDeleteOrder(_id, number) {
        const userConfirm = window.confirm(`Are you sure you want to remove order #${number}?`)
        if (userConfirm) {
            await delete_RemoveOrder(token, _id)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                navigate('/admin/orders')
            }, [2000])
        }
    }

    useEffect(() => {
        if (order === null) {
            const updatedItems = []
            let mealsDB = []
            let updatedOrder;

            get_AllMeals()
                .then((data) => mealsDB = [...data])

            get_SingleOrder(token, _id)
                .then((data) => {
                    updatedOrder = { ...data }
                    for (const item of data.items) {
                        let populatedItem = { qty: item.qty }
                        const itemInfo = mealsDB.find((meal) => meal._id === item._id)
                        populatedItem = { ...populatedItem, ...itemInfo }
                        updatedItems.push(populatedItem)
                    }
                    updatedOrder.items = [...updatedItems]
                    setOrder({ ...updatedOrder })
                    setCompleted(updatedOrder.completed)
                })
        }
    }, [_id, order, token])

    useEffect(() => {
        if (order !== null) {
            setLoading(false)
        }
    }, [order])


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='pt-[10rem] px-10 lg:px-20 pb-20'>
            <div className='bg-white rounded-xl  drop-shadow-xl '>

                <div className='relative p-5 border-b-4'>

                    {/* Order Status */}
                    <OrderStatus
                        handleDeleteOrder={handleDeleteOrder}
                        _id={order._id}
                        number={order.number}
                        completed={completed}
                        setCompleted={setCompleted}
                    />

                    {/* Order Number */}
                    <h1 className='text-neutral-700 text-3xl   flex items-center  '>
                        Order #{number}
                        <GrStatusGoodSmall
                            className={`${completed ? 'text-green-500' : 'text-red-500'} inline-block text-xl ml-2 mt-1`}
                        />
                    </h1>
                </div>

                <div className='flex flex-col space-y-5 p-5'>
                    <Items order={order} items={order.items} />
                    <Details
                        customer={order.customer}
                        placed={order.date_placed}
                        reserved={order.date_reserved}
                    />
                </div>

            </div>
        </div>
    )
}

export default SingleOrder