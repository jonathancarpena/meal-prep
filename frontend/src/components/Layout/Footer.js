import React, { useState, useEffect } from 'react'

// React Router
import { Link } from 'react-router-dom'

// Components
import Brand from '../Brand'

// Icons
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { MdSend } from 'react-icons/md'

import { Transition } from '@tailwindui/react'

const Slide = ({ show, sx, children }) => {
    return (
        // <Transition show={show}  >
        //     <Transition.Child
        //         enter="transition-opacity ease-in duration-300"
        //         enterFrom="opacity-0"
        //         enterTo="opacity-30"
        //         entered="opacity-30"
        //         leave="transition-opacity ease-out duration-300"
        //         leaveFrom="opacity-30"
        //         leaveTo="opacity-0"
        //     >
        //         {children}
        //     </Transition.Child>
        // </Transition >
        <Transition show={show}  >
            <Transition.Child
                enter="transition-transform ease-in-out duration-300"
                enterFrom="translate-x-[50%]"
                enterTo="-translate-x-5"
                leave="transition-transform ease-in-out duration-300"
                leaveFrom="-translate-x-5"
                leaveTo="translate-x-[50%] "
            >
                {children}
            </Transition.Child>
        </Transition >
    )
}

const quickLinks = [
    { text: 'home', link: '/' },
    { text: 'about', link: '/about' },
    { text: 'order', link: '/order' },
]

const supportLinks = [
    { text: 'terms & services', link: '/' },
    { text: 'returns & refunds', link: '/' },
    { text: 'contact us', link: '/contact' },
]

export const Socials = [
    {
        icon: <FaInstagram className='text-4xl text-white' />,
        link: ''
    },
    {
        icon: <FaTwitter className='text-4xl text-white' />,
        link: ''
    },
    {
        icon: <FaTiktok className='text-4xl text-white' />,
        link: ''
    },
]
function Footer() {
    const [email, setEmail] = useState('')
    const [ready, setReady] = useState(false)
    const [show, setShow] = useState(false)
    function emailValidation(email) {
        const domainExt = ["com", "edu", "net", "org"]

        let valid = true;
        if (!(email.includes('@'))) {
            // Error: No '@'
            valid = false
        } else if (email.split('@')[1].split('.') === '') {
            // Error: @.com
            valid = false
        } else if (!(domainExt.includes(email.split('@')[1].split('.')[1]))) {
            // Error: .something
            valid = false
        }

        return valid
    }

    useEffect(() => {
        const okay = emailValidation(email)
        if (okay) {
            setReady(true)
        } else {
            setReady(false)
        }
    }, [email])

    function handleNewsletterSubmit(e) {
        e.preventDefault()
        if (email !== "" && ready) {
            alert(`See you soon!`)
        }

    }
    return (
        <div className='bg-primary-600 py-16 px-12 sm:px-80'>

            {/* Links */}
            <div className=' flex flex-col space-y-12 sm:flex-row sm:space-y-0 sm:items-start sm:justify-between mb-10'>
                <Brand isDarkBg />

                {/* Quick Links */}
                <div >
                    <h4 className='text-white font-bold text-3xl mb-6'>
                        Quick Links
                    </h4>
                    <ul className='flex flex-col space-y-5'>
                        {quickLinks.map((item) => (
                            <li key={item.text} className='text-white capitalize text-lg'>
                                <Link to={item.link}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support Links */}
                <div >
                    <h4 className='text-white font-bold text-3xl mb-6'>
                        Support
                    </h4>
                    <ul className='flex flex-col space-y-5'>
                        {supportLinks.map((item) => (
                            <li key={item.text} className='text-white capitalize text-lg'>
                                <Link to={item.link}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h4 className='text-white font-bold text-3xl mb-6'>
                        Our Socials
                    </h4>

                    <ul className='flex space-x-3'>
                        {Socials.map((item, idx) => (
                            <a key={`social-${idx}`} target="_blank" href={item.link} rel="noopener noreferrer">
                                {item.icon}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Newsletter */}
            <div className='sm:min-w-[450px] sm:max-w-[450px]'>
                <h4 className='text-white font-bold text-3xl pt-6'>
                    Sign Up for Our Newsletter
                </h4>
                <p className='text-white text-lg font-semibold mb-5 my-1'>
                    Don't miss a beat. Be the first
                    to know when we release new updates.
                </p>
                <form onSubmit={handleNewsletterSubmit} className='text-sm flex items-center space-x-2 sm:text-lg'>
                    <div className='relative sm:space-x-3 bg-white rounded-3xl p-2 flex justify-between items-center flex-1 '>
                        <FiMail className='absolute text-neutral-300 text-2xl left-3 sm:relative sm:left-0 sm:ml-3' />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='ml-8  py-2 px-3 flex-1 rounded-3xl w-fit focus:outline-sky-400 focus:outline-offset-2 text-neutral-700 '
                            placeholder='Email Address'
                        />
                        <button className={`
                        ${(email !== "")
                                ? ready ? 'bg-yellow-400' : 'bg-neutral-400'
                                : 'bg-yellow-400'
                            } 
                        hidden sm:inline-block transition-all duration-300 ease-in-out uppercase  text-white  font-bold py-1 px-4 rounded-3xl absolute right-3 sm:relative sm:right-0 sm:mr-3
                        `}>
                            Sign Up
                        </button>


                    </div>
                    <button className={`
                        ${(email !== "")
                            ? ready ? 'bg-yellow-400' : 'bg-neutral-400'
                            : 'bg-yellow-400'
                        } 
                         sm:hidden h-[52px] transition-all duration-300 ease-in-out uppercase w-[100px] text-white  font-bold py-1 px-4 rounded-3xl  
                        `}>
                        Sign Up
                    </button>
                </form>
            </div>



        </div>

    )
}

export default Footer