import React, { useEffect, useState } from 'react'

// Hooks
import useDeviceScroll from '../../lib/hooks/useDeviceScroll'

// Router
import { useNavigate, useLocation, Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { showSidedrawer, showMobileMenu, closeMobileMenu } from '../../redux/features/modal/modalSlice'

// Components
import Brand from '../Brand'

// Icons
import { BsBagFill, BsBag } from 'react-icons/bs'
import { MdMenu, MdOutlineClose } from 'react-icons/md'

// Constants
import { Socials } from './Footer'
const navLinks = [
    { text: 'about', link: '/about' },
    { text: 'meals', link: '/meals/today' },
    { text: 'contact', link: '/contact' },
]

const MobileMenu = () => {
    const { mobileMenu } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    function handleNavigate(link) {
        navigate(link)
        dispatch(closeMobileMenu())
    }
    return (
        <div className={`${mobileMenu ? 'translate-x-0' : 'translate-x-full'} transition-all ease-in-out duration-300 fixed inset-0 z-[150] h-screen bg-yellow-400 flex flex-col text-white sm:hidden`}>
            <div className='flex items-center space-x-3 justify-end px-10 py-1 h-[90px]'>
                <MdOutlineClose
                    onClick={() => dispatch(closeMobileMenu())}
                    className='cursor-pointer text-[2rem]'
                />
                <BsBagFill onClick={() => handleNavigate('/order')} className='cursor-pointer text-[2rem]' />
            </div>

            <div className='flex flex-col  items-center justify-center mt-[5rem]'>
                {navLinks.map((item, idx) => (
                    <div
                        key={`mobile-menu-${item.text}`}
                        onClick={() => handleNavigate(item.link)}
                        className={`cursor-pointer w-full text-center py-10 active:bg-yellow-500`}>
                        <span className={`${pathname === item.link ? 'underline underline-offset-8' : ''} capitalize font-semibold text-5xl `}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
            <ul className='flex justify-center space-x-10 py-10'>
                {Socials.map((item, idx) => (
                    <a key={`social-${idx}`} target="_blank" href={item.link} rel="noopener noreferrer">
                        {item.icon}
                    </a>
                ))}
            </ul>


        </div>
    )
}

function Navbar() {

    const NavColorShift = {
        home: "bg-yellow-400 drop-shadow-xl",
        other: "bg-neutral-100 drop-shadow-xl",
    }

    const NavBagColorShift = {
        home: "",
        other: "bg-yellow-400 ",
    }
    const activeLinkStyles = 'border-b-2 border-b-yellow-400'

    const navigate = useNavigate()
    const bag = useSelector(state => state.bag)
    const { sideDrawer } = useSelector(state => state.modal)
    const { pathname } = useLocation()
    const [scroll] = useDeviceScroll()

    const [shiftColor, setShiftColor] = useState({
        boolean: false,
        value: {
            nav: NavColorShift.home,
            bag: NavBagColorShift.home
        }
    })


    function generateBagLength() {
        let length = 0
        if (bag.length > 0) {
            bag.forEach((item) => length += item.qty)
        }
        return length
    }

    useEffect(() => {
        let key = "home"
        if (pathname !== '/') {
            key = "other"
        }
        if (scroll >= 25) {
            if (!shiftColor.boolean) {
                setShiftColor({
                    boolean: true,
                    value: {
                        nav: NavColorShift[key],
                        bag: NavBagColorShift[key]
                    }
                })
            }
        } else {
            if (shiftColor.boolean) {
                setShiftColor({
                    boolean: false,
                    value: {
                        nav: NavColorShift[key],
                        bag: NavBagColorShift[key]
                    }
                })
            }
        }

    }, [scroll])

    const dispatch = useDispatch()
    return (

        <>
            <nav className={`${pathname === '/' ? 'text-white' : 'text-neutral-700 bg-neutral-100'} ${shiftColor.boolean ? shiftColor.value.nav : ''} top-0 fixed ${sideDrawer ? 'z-0' : 'z-[100]'} py-1 font-body px-10 sm:px-5 flex justify-between items-center w-full transition-all duration-300 max-h-[90px]`}>
                {/* Branding */}
                <Brand
                    isDarkBg={pathname === '/'}
                    onClick={() => navigate('/')}
                />

                <button onClick={() => dispatch(showSidedrawer())} className='absolute left-[50%] -translate-x-[50%]'>OPEN</button>

                {/* Nav Links */}
                <div className='mr-[80px] hidden sm:inline-block'>
                    <ul className='flex space-x-5'>
                        {navLinks.map((item, idx) => {
                            let lastChild = false
                            if (idx === navLinks.length - 1) {
                                lastChild = true
                            }
                            return (
                                <li key={item.link} className={` cursor-pointer uppercase text-2xl font-semibold`}>
                                    <Link to={item.link}>
                                        <p>
                                            <span className={`mr-3 ${pathname === item.link ? activeLinkStyles : ''} `}>
                                                {item.text}
                                            </span>

                                            {!lastChild &&
                                                <span>
                                                    |
                                                </span>
                                            }
                                        </p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* Bag */}
                <div className={`${pathname === '/' ? 'text-white' : 'text-white'} ${shiftColor.boolean ? shiftColor.value.bag : 'bg-yellow-400'} hidden sm: inline - block w - [80px] absolute right - 0  h - full rounded - l - xl cursor - pointer`}>
                    <Link to='/order'>
                        <div className='relative flex h-full items-center justify-center p-3'>
                            <BsBagFill className='text-[3rem]' />

                            <span className=' text-yellow-400 text-xl font-bold absolute top-[50%] -translate-y-[30%] left-[50%] -translate-x-[50%]'>
                                {generateBagLength() !== 0 ? generateBagLength() : ''}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Mobile Nav */}
                <div className='sm:hidden flex space-x-3 items-center'>
                    <MdMenu onClick={() => dispatch(showMobileMenu())} className='text-[2rem] cursor-pointer' />
                    <Link to='/order'>
                        <BsBag className='text-[2rem] cursor-pointer' />
                    </Link>
                </div>


                <MobileMenu />
            </nav>
        </>
    )
}

export default Navbar