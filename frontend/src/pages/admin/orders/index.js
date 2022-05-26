import React, { useEffect, useState } from 'react'
import moment from 'moment'

// API
import { get_AllMeals, put_UpdateOrder, get_AllOrders, delete_RemoveOrder } from '../../../lib/api'

// Redux
import { useSelector } from 'react-redux'

// Router
import { Link } from 'react-router-dom'

// Icons
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdDelete, MdAssignment, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'


// Components
import Loading from '../../../components/Admin/Loading'

const ItemDropdown = ({ order, meals }) => {
    const [showDetails, setShowDetails] = useState(false)
    function generateTotalItems(order) {
        let total = 0
        order.items.forEach(({ qty }) => total += qty)
        return total
    }

    function generateItemDetails(item) {
        const { _id, qty } = item
        const { name } = meals.find((meal) => meal._id === _id)
        return (
            <p><span className='font-semibold'>({qty}x) </span> {name}</p>
        )
    }

    return (
        <div onClick={() => setShowDetails(!showDetails)} className='cursor-pointer'>
            <span className='text-neutral-700'>
                {generateTotalItems(order)} items
                {showDetails ? <FaChevronUp className='ml-2 inline-block text-secondary' /> : <FaChevronDown className='ml-2 inline-block text-secondary' />}
            </span>
            <div className={`${showDetails ? 'visible' : 'hidden'} flex flex-col space-y-2 pt-2 text-xs`}>
                {order.items.map((item, idx) => {
                    return (
                        <React.Fragment key={`${order._id}-${item._id}-${idx}`}>
                            {generateItemDetails(item)}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

const OrderStatus = ({ completed, handleDeleteOrder, _id, number }) => {
    const [toggle, setToggle] = useState(completed)
    const { token } = useSelector(state => state.admin)
    async function handleToggle(condition) {
        setToggle(condition)
        const body = {
            completed: condition
        }
        await put_UpdateOrder(token, _id, body)
    }

    return (
        <>
            <p className=''>
                <GrStatusGoodSmall className={`${toggle ? 'text-green-500' : 'text-red-500'} inline-block mr-2 mb-0.5`} />
                {toggle ? 'Completed' : 'Not Completed'}
            </p>
            <div className='text-neutral-700'>
                <button onClick={() => handleDeleteOrder(_id, number)}>
                    <MdDelete className='text-2xl mr-5 text-neutral-500 cursor-pointer hover:text-neutral-600' />
                </button>

                {toggle
                    ? <button onClick={() => handleToggle(false)}>
                        <MdCheckBox className='text-2xl text-green-500 cursor-pointer hover:text-green-600' />
                    </button>
                    : <button onClick={() => handleToggle(true)}>
                        <MdCheckBoxOutlineBlank className='text-2xl text-neutral-500 cursor-pointer hover:text-neutral-600' />
                    </button>
                }
            </div>
        </>
    )
}

function AdminOrders() {
    const DashHeaders = ['id', 'items', 'date placed', 'reserved date', 'status', 'actions']
    const MobileDashHeaders = ['id', 'items', 'book date', 'status', 'actions']
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState(null)
    const [meals, setMeals] = useState(null)
    const { token } = useSelector(state => state.admin)

    useEffect(() => {
        if (meals === null && orders === null) {
            get_AllMeals()
                .then((data) => {
                    setMeals([...data])
                })

            get_AllOrders(token)
                .then((data) => {
                    setOrders([...data])
                })
        }
    }, [])

    useEffect(() => {
        if (meals !== null && orders !== null) {
            setLoading(false)
        }
    }, [meals, orders])

    async function handleDeleteOrder(_id, number) {
        const userConfirm = window.confirm(`Are you sure you want to remove order #${number}?`)
        if (userConfirm) {
            await delete_RemoveOrder(token, _id)
            const filteredOrders = orders.filter((item) => item._id !== _id)
            setOrders([...filteredOrders])
        }
    }

    if (loading) {
        return <Loading />
    }
    return (
        <div className='pt-[10rem] px-10 sm:px-20 pb-20'>
            <div className='bg-white rounded-xl p-5 drop-shadow-xl'>

                {/* Header */}
                <h1 className='text-neutral-700 text-3xl mb-5'>
                    <MdAssignment className='inline-block mb-1' /> Orders
                </h1>

                {/* List of Orders */}
                <div className='sm:flex flex-col hidden'>

                    <div className='grid grid-cols-6 gap-5 border-b-2 py-2 px-4'>
                        {DashHeaders.map((item) => (
                            <span key={item} className='uppercase '>
                                {item}
                            </span>
                        ))}
                    </div>


                    <div className={`${orders.length > 10 ? 'overflow-y-scroll' : ''} flex flex-col`}>
                        {orders.map((element, idx) => {
                            let lastChild = false
                            if (idx === orders.length - 1) {
                                lastChild = true
                            }
                            return (

                                <div className={`${lastChild ? '' : 'border-b-2'} even:bg-gray-100 col-span-5 grid grid-cols-6 gap-5 p-4 `} key={element._id}>
                                    <Link to={`/admin/orders/${element.number}/${element._id}`}>
                                        <span>#{element.number}</span>
                                    </Link>
                                    <ItemDropdown order={element} meals={meals} />
                                    <span>{moment(element.date_placed).format("MMM DD, YYYY")}</span>
                                    <span>{moment(element.reserved_date).format("MMM DD, YYYY")}</span>
                                    <OrderStatus
                                        completed={element.completed}
                                        _id={element._id}
                                        number={element.number}
                                        handleDeleteOrder={handleDeleteOrder}
                                    />
                                </div>

                            )
                        })}
                    </div>

                </div>

                {/* Mobile: List of Orders */}
                <div className='flex flex-col sm:hidden '>

                    <div className={`${orders.length > 6 ? 'overflow-y-scroll' : ''} flex flex-col max-h-[700px]`}>
                        <div className='sticky top-0 w-max overflow-visible bg-white grid grid-cols-[50px_100px_100px_150px_100px] gap-5 border-b-2 py-2 px-4 '>
                            {MobileDashHeaders.map((item) => (
                                <span key={item} className='uppercase '>
                                    {item}
                                </span>
                            ))}
                        </div>

                        {orders.map((element, idx) => {
                            let lastChild = false
                            if (idx === orders.length - 1) {
                                lastChild = true
                            }
                            return (

                                <div className={`${lastChild ? '' : 'border-b-2'}  even:bg-gray-100 w-max grid grid-cols-[50px_100px_100px_150px_100px]  gap-5 p-4 `} key={element._id}>
                                    <Link to={`/admin/orders/${element.number}/${element._id}`}>
                                        <span>#{element.number}</span>
                                    </Link>
                                    <ItemDropdown order={element} meals={meals} />
                                    <span>{moment(element.reserved_date).format("MMM DD, YYYY")}</span>
                                    <OrderStatus
                                        completed={element.completed}
                                        _id={element._id}
                                        number={element.number}
                                        handleDeleteOrder={handleDeleteOrder}
                                    />
                                </div>

                            )
                        })}
                    </div>

                </div>
            </div>



        </div>
    )
}

export default AdminOrders