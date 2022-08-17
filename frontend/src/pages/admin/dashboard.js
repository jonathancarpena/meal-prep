import React, { useEffect, useState } from 'react'

// API
import { get_AllMeals, get_AllOrders } from '../../lib/api'

// Redux
import { useSelector } from 'react-redux'


// Components
import Orders from '../../components/Admin/Dashboard/Orders'
import ActiveMenu from '../../components/Admin/Dashboard/ActiveMenu'
import AdminCalendar from '../../components/Admin/Dashboard/AdminCalendar'
import Loading from '../../components/Admin/Loading'

function Dashboard() {
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
    }, [meals, orders, token])

    useEffect(() => {
        if (meals !== null && orders !== null) {
            setLoading(false)
        }
    }, [meals, orders])

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div className='pt-[170px] px-10 lg:px-20 pb-20'>

            <div className='flex flex-col space-y-10'>
                <AdminCalendar orders={orders} />
                <Orders orders={orders} setOrders={setOrders} meals={meals} />
                <ActiveMenu meals={meals} />
            </div>



        </div>
    )
}

export default Dashboard