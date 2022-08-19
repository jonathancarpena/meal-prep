import React, { useState, useEffect } from 'react'
import moment from 'moment'

// Router
import { Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// API
import { get_AllDates, get_AllOrders, post_AddDate, delete_RemoveDate } from '../../lib/api'

// Icons
import { MdToggleOff, MdToggleOn, MdAttachMoney } from 'react-icons/md'
import { BsCalendar2EventFill } from 'react-icons/bs'


// Components
import Loading from '../../components/Admin/Loading'
import DatePicker from 'react-datepicker'
const ToggleDay = ({ selected, status, setAllDates, allDates }) => {

    const { token } = useSelector(state => state.admin)
    async function handleToggleDate(condition) {
        if (condition) {

            setAllDates([...allDates, { _id: "temp", day: moment(selected).toISOString() }])
            const body = {
                day: moment(selected).toDate()
            }
            await post_AddDate(token, body)
        } else {

            const currentDate = moment(selected).format('YYYY-MM-DD')
            const blockedOff = allDates.filter((item) => moment(item.day).format('YYYY-MM-DD') !== currentDate)
            setAllDates([...blockedOff])
            const day = moment(selected).toISOString()
            await delete_RemoveDate(token, day)
        }
    }



    return (
        <div >
            {status
                ? <p className='flex items-center space-x-3'>
                    <span className='font-semibold'>Available Now</span>
                    <MdToggleOn
                        className='text-[3rem] inline-block text-green-500 cursor-pointer hover:text-green-600'
                        onClick={() => handleToggleDate(false)}
                    />

                </p>
                : <p className='flex items-center space-x-3'>
                    <span className='font-semibold'>Blocked Off</span>
                    <MdToggleOff
                        className='text-[3rem] text-neutral-500 cursor-pointer hover:text-neutral-600'
                        onClick={() => handleToggleDate(true)}
                    />
                </p>
            }

        </div>
    )
}
const Orders = ({ content }) => {

    return (
        <ul className='flex flex-col space-y-3 mt-3'>
            {content.map((item, idx) => (
                <Link to={`/admin/orders/${item.data.number}/${item.data._id}`} className='cursor-pointer'>
                    <p key={`order-${idx}-${item.data._id}`}>{item.text}</p>
                </Link>

            ))}
        </ul>
    )
}
const CustomDateButton = React.forwardRef(({ value, onClick }, ref) => (
    <button className="w-max bg-blue-500 text-white rounded-lg p-2" onClick={onClick} ref={ref}>
        Pick Date
    </button>
));

function Activity() {
    const { token } = useSelector(state => state.admin)
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(moment(Date.now())._d)
    const [content, setContent] = useState(null)
    const [allDates, setAllDates] = useState(null)
    const [orders, setOrders] = useState(null)
    const [invalidDate, setInvalidDate] = useState(false)

    useEffect(() => {
        const today = moment(Date.now())
        const select = moment(selected)
        if ((today.format('YYYY-MM-DD') === select.format('YYYY-MM-DD')) || select.isBefore(today)) {
            setInvalidDate(true)
        } else {
            setInvalidDate(false)
        }

    }, [selected])
    useEffect(() => {
        if (allDates === null) {
            get_AllDates(token)
                .then((data) => setAllDates(data))
        }
        if (orders === null) {
            get_AllOrders(token)
                .then((data) => setOrders([...data]))
        }
    })

    useEffect(() => {
        if (allDates !== null && orders !== null && content !== null) {
            setLoading(false)
        }
    }, [allDates, orders, content])

    useEffect(() => {
        const formatSelected = moment(selected).format('YYYY-MM-DD')
        const temp = []
        if (orders !== null) {
            orders.forEach((item) => {
                const bookDate = moment(item.book_date)
                const diffDays = bookDate.diff(moment(selected), 'days')
                if (moment(bookDate).format('YYYY-MM-DD') === formatSelected) {
                    temp.push({ text: `Order #${item.number} is due today.`, data: item })
                }
                if (diffDays > 0 && diffDays < 4) {
                    temp.push({ text: `Order #${item.number} is due in ${diffDays} days.`, data: item })
                }
            })
            setContent([...temp])
        }

    }, [selected, orders])

    const renderDayContents = (day, date) => {
        const calendarDate = moment(date).format('YYYY-MM-DD')
        let available = false
        allDates.forEach((item) => {
            if (calendarDate === moment(item.day).format('YYYY-MM-DD')) {
                available = true
            }
        })
        if (available) {
            return (
                <span className='bg-green-500 text-white block rounded-lg'>
                    <MdAttachMoney className='text-base inline-block' />
                </span>
            )
        } else {
            return <span>{day}</span>
        }
    }


    function returnAvailable() {
        const calendarDate = moment(selected).format('YYYY-MM-DD')
        let available = false
        allDates.forEach((item) => {
            if (calendarDate === moment(item.day).format('YYYY-MM-DD')) {
                available = true
            }
        })
        return available
    }


    if (loading) {
        return <Loading />
    }
    return (
        <div className='pt-[10rem] lg:px-20 px-10 pb-20 flex justify-center items-center'>
            <div className='bg-white rounded-xl p-5 drop-shadow-xl max-w-[1200px]'>
                {/* Header */}
                <h1 className='text-neutral-700 text-3xl mb-5'>
                    <BsCalendar2EventFill className='inline-block mb-2 mr-2' />
                    Activity
                </h1>

                <div className='flex'>
                    <div className='flex-0 mr-5'>
                        <DatePicker
                            todayButton="Today"
                            selected={selected}
                            onChange={(e) => setSelected(e)}
                            renderDayContents={renderDayContents}
                            customInput={<CustomDateButton />}
                        />
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <h2 className='text-2xl border-b-2 '>
                            {moment(selected).format('dddd MMM D, YYYY')}
                        </h2>



                        <div className=''>
                            {!invalidDate &&
                                <>
                                    {returnAvailable()
                                        ? <>
                                            <ToggleDay
                                                selected={selected}
                                                status={true}
                                                setAllDates={setAllDates}
                                                allDates={allDates}
                                            />
                                        </>
                                        : <>
                                            <ToggleDay
                                                selected={selected}
                                                status={false}
                                                setAllDates={setAllDates}
                                                allDates={allDates}
                                            />
                                        </>
                                    }
                                </>

                            }


                            {content.length > 0 && <Orders content={content} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activity