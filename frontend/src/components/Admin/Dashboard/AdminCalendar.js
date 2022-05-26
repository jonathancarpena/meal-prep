import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { Link } from 'react-router-dom';

// Components
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

// Icons
import { MdTimeline } from 'react-icons/md'
import { BsCalendar2EventFill } from 'react-icons/bs'


function AdminCalendar({ orders }) {
    const [date, setDate] = useState(moment(Date.now())._d)
    const [activity, setActivity] = useState([])

    useEffect(() => {
        const array = []
        orders.forEach((item, idx) => {
            const datePlaced = moment(item.date_placed).format('YYYY-MM-DD')
            const reservedDate = moment(item.reserved_date).format('YYYY-MM-DD')

            if (datePlaced === moment(date).format('YYYY-MM-DD')) {
                array.push({ date: moment(reservedDate).format('dddd MMM DD, YYYY'), type: 'P', _id: item._id, number: item.number, customer: { ...item.customer } })
            }

            if (reservedDate === moment(date).format('YYYY-MM-DD')) {
                array.push({ date: moment(reservedDate).format('dddd MMM DD, YYYY'), type: 'R', _id: item._id, number: item.number, customer: { ...item.customer } })
            }
        })
        if (array.length > 0) {
            setActivity([...array])
        } else {
            setActivity([])
        }
    }, [date])



    const CustomDateButton = React.forwardRef(({ value, onClick }, ref) => (
        <button className="" onClick={onClick} ref={ref}>
            <BsCalendar2EventFill className='text-2xl text-neutral-700' />
        </button>
    ));
    return (
        <div className='bg-white rounded-xl p-5 drop-shadow-xl z-[50]'>

            <div className='relative select-none'>
                <div className='flex justify-between items-center'>
                    <Link to='/admin/activity'>
                        <h1 className='text-neutral-700 text-3xl mb-5 mr-12'>
                            <MdTimeline className='inline-block mb-1' /> Activity
                        </h1>
                    </Link>

                    <h2 className='hidden sm:inline-block text-neutral-700 text-3xl mb-5 text-right mr-12 bg-white z-[50]'>
                        {moment(date).format('dddd MMM DD, YYYY')}
                    </h2>
                    <h2 className='sm:hidden text-neutral-700  mb-5 text-right mr-12 bg-white z-[50]'>
                        {moment(date).format('MMM DD, YYYY')}
                    </h2>
                </div>

                <div className='absolute top-1.5 right-2'>
                    <DatePicker
                        todayButton='Today'
                        selected={date}
                        onChange={(e) => setDate(e)}
                        customInput={<CustomDateButton />}
                    />
                </div>
            </div>

            <div>

                <div>
                    {activity.length === 0
                        ? <span className='text-lg text-secondary'>
                            Nothing to do today
                        </span>
                        : <ul className={`${activity.length > 5 ? 'overflow-y-scroll' : ''} flex flex-col space-y-2 px-4 max-h-[175px]`}>
                            {activity.map((item, idx) => (
                                <li key={`activity-${item._id}-${item.type}`} className='list-disc cursor-default'>
                                    <Link to={`/admin/orders/${item.number}/${item._id}`} className='text-sm sm:text-base'>
                                        {item.type === 'P'
                                            ? ` Order #${item.number} - ${item.customer.first_name} 
                                            ${item.customer.last_name.substring(0, 1)}. 
                                            reserved for ${item.date}`
                                            : ` Order #${item.number} for ${item.customer.first_name} ${item.customer.last_name.substring(0, 1)}. is due Today`
                                        }
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    }
                </div>

            </div>





        </div>
    )
}

export default AdminCalendar