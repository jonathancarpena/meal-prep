import React, { useState, useEffect } from 'react'


// Hooks
import useDeviceScroll from '../../../lib/hooks/useDeviceScroll'

// Router
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { clearAuth, showMobileMenu, closeMobileMenu } from '../../../redux/features/admin/adminSlice'

// Icons
import { MdMenu, MdOutlineClose } from 'react-icons/md'
const AdminNavbarLinks = ["activity", "orders", "meals", "account"]


const MobileMenu = () => {
    const { mobileMenu } = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    function handleNavigate(link) {
        navigate(`/admin/${link}`)
        dispatch(closeMobileMenu())
    }

    function handleLogout() {
        dispatch(closeMobileMenu())
        dispatch(clearAuth())
    }
    return (
        <div className={`${mobileMenu ? 'translate-x-0' : 'translate-x-full'} transition-all ease-in-out duration-300 fixed inset-0 z-[150] h-screen bg-white flex flex-col text-neutral-700 lg:hidden`}>
            <div className='flex items-center justify-end px-6  h-[120px] top-10'>

                <MdOutlineClose
                    onClick={() => dispatch(closeMobileMenu())}
                    className='cursor-pointer text-[2rem]'
                />
            </div>

            <div className='flex flex-col  items-center justify-center mt-[2rem]'>
                {AdminNavbarLinks.map((item, idx) => (
                    <div
                        key={`mobile-menu-${item}`}
                        onClick={() => handleNavigate(item)}
                        className={`cursor-pointer w-full text-center py-10 active:bg-neutral-500`}>
                        <span className={`${pathname.includes(item) ? 'underline underline-offset-8' : ''} capitalize font-semibold text-5xl `}>
                            {item}
                        </span>
                    </div>
                ))}
                <button onClick={handleLogout} className='py-10 mt-5 bg-blue-500 active:bg-blue-600 transition-all ease-in-out duration-200 w-[70%] rounded-xl text-5xl font-semibold text-white'>
                    Logout
                </button>
            </div>




        </div>
    )
}
function Navbar() {
    const activeLinkStyles = 'underline underline-offset-2 underline-neutral-800'
    const scroll = useDeviceScroll()
    const dispatch = useDispatch()
    const location = useLocation()


    function handleLogout() {
        dispatch(clearAuth())
    }


    return (
        <nav className={`${scroll > 25 ? 'top-0 drop-shadow-xl bg-white' : 'top-10 bg-neutral-100'}  rounded-b-xl max-w-[1980px] fixed flex justify-between items-center px-10 lg:px-20 z-[100]  transition-all ease-linear duration-200 w-screen h-[90px]  text-neutral-700`}>
            <h1 className='font-bold text-4xl '>
                <Link to='/admin/dashboard'>
                    Admin
                </Link>
            </h1>

            <ul className='hidden lg:flex items-center space-x-5 mr-10'>
                {AdminNavbarLinks.map((item) => (
                    <li
                        key={`nav-item-${item}`}
                        className={`${location.pathname === `/admin/${item}` ? activeLinkStyles : ''} capitalize text-xl`}>
                        <Link to={`/admin/${item}`}>
                            {item}
                        </Link>
                    </li>
                ))}
                <button onClick={handleLogout} className=' bg-blue-500 px-4 py-1 text-white text-xl font-semibold hover:bg-blue-400 active:bg-blue-600 transition-all ease-in-out duration-200 rounded-lg'>
                    Logout
                </button>
            </ul>

            <div className='lg:hidden flex space-x-3 items-center'>
                <MdMenu onClick={() => dispatch(showMobileMenu())} className='text-[2rem] cursor-pointer' />
            </div>

            <MobileMenu />
        </nav>
    )
}



function AdminLayout({ children }) {
    const [showNavbar, setShowNavbar] = useState(false)
    const location = useLocation()
    useEffect(() => {
        if (location.pathname === '/admin' || location.pathname === '/admin/') {
            setShowNavbar(false)
        } else {
            setShowNavbar(true)
        }
    }, [location])
    return (
        <div className='w-full max-w-[1980px]'>
            {(showNavbar) && <Navbar />}
            {children}
        </div>
    )
}

export default AdminLayout