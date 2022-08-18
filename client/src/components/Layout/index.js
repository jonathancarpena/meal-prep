import { useEffect, useState } from 'react'

// Context
import { useStoreOpen } from '../../lib/context/StoreOpenProvider'

// Router
import { useNavigate, useLocation } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { clearBag } from '../../redux/features/bag/bagSlice'

// Components
import Navbar from './Navbar'
import Footer from './Footer'
import OrderSidedrawer from './OrderSidedrawer'
import AdminLayout from './Admin'

// Icons
import { BsBagFill } from 'react-icons/bs'


function Layout({ children }) {
    const [adminView, setAdminView] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const open = useStoreOpen()
    const dispatch = useDispatch()
    const bag = useSelector(state => state.bag)

    if (!open && bag.length > 0) {
        dispatch(clearBag())
    }

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
        <div className='w-full min-h-screen flex flex-col justify-center overflow-hidden items-center bg-neutral-100'>
            {adminView
                ? <>
                    <AdminLayout>
                        <div className=' bg-neutral-100 min-h-screen font-body'>
                            {children}
                        </div>
                    </AdminLayout>
                </>
                : <div className='min-h-[91vh] font-body bg-neutral-100  w-full max-w-[1980px] overflow-hidden'>
                    <Navbar />
                    {children}

                    {open &&
                        <button disabled={!open} onClick={() => navigate('/order')} className='transition-all ease-in-out duration-200 hover:bg-yellow-500 z-[300] drop-shadow-xl lg:hidden fixed bottom-6 right-6 text-white bg-yellow-400 p-4 rounded-full'>
                            <BsBagFill className=' cursor-pointer text-[2rem]' />
                        </button>
                    }


                    <Footer />
                    <OrderSidedrawer />
                </div>
            }

        </div>

    )
}

export default Layout