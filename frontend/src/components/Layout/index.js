import React, { useEffect, useState } from 'react'

// Router
import { useLocation } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Components
import Navbar from './Navbar'
import Footer from './Footer'
import OrderSidedrawer from './OrderSidedrawer'
import AdminLayout from './Admin'


function Layout({ children }) {

    const [adminView, setAdminView] = useState(false)
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        if (location.pathname.includes('admin')) {
            setAdminView(true)
        } else {
            setAdminView(false)
        }
    }, [location])


    return (
        <>
            {adminView
                ? <>
                    <AdminLayout>
                        <div className=' bg-neutral-200 min-h-screen font-body'>
                            {children}
                        </div>
                    </AdminLayout>
                </>
                : <>
                    <Navbar />

                    <div className='min-h-[91vh] font-body bg-neutral-100'>
                        {children}
                    </div>
                    <Footer />

                    <OrderSidedrawer />


                </>
            }

        </>

    )
}

export default Layout