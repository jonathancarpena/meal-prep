import React, { useEffect, useState } from 'react'
import moment from 'moment'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { setupAuth } from '../../redux/features/admin/adminSlice'

// Icons
import { RiEyeCloseLine } from 'react-icons/ri'
import { FaEye } from 'react-icons/fa'
import { FiHome } from 'react-icons/fi'

const LoginModal = ({ setForgotPassword }) => {
    const [identity, setIdentity] = useState('')
    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState('')
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [errors, setErrors] = useState(false)
    const { error } = useSelector(state => state.admin)
    const dispatch = useDispatch()

    function handleLoginSubmit(e) {
        e.preventDefault()

        if (phone) {
            dispatch(setupAuth({ email: null, phone: identity, password }))
        } else {
            dispatch(setupAuth({ email: identity, phone: null, password }))
        }


    }


    useEffect(() => {
        if (error) {
            setErrors(true)
        } else {
            setErrors(false)
        }
    }, [error])
    useEffect(() => {
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        if (identity.length >= 3 && identity.length < 11) {
            const phoneInput = [...identity].every((char) => {
                return numbers.includes(char)
            })
            if (phoneInput) {
                setPhone(true)
            } else {
                setPhone(false)
            }
        } else {
            setPhone(false)
        }
    }, [identity])


    function handleIdentityChange(e) {
        setIdentity(e.target.value)
    }
    return (
        <div className='bg-neutral-100 p-10 rounded-xl drop-shadow-xl min-w-[450px]'>

            <h1 className='text-center text-neutral-700 text-3xl font-bold tracking-tight mb-10 select-none'>
                Login
            </h1>


            <form onSubmit={handleLoginSubmit} className='flex flex-col space-y-5 '>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='identity' className={`${errors ? 'text-red-400' : 'text-secondary'} font-semibold uppercase text-xs select-none`}>
                        {errors ? 'Email or Phone Number - Invalid Credentials' : 'Email or Phone Number '}
                    </label>

                    <div className='relative bg-white flex items-center overflow-hidden w-full space-x-2 focus:outline-none active:outline-none'>

                        <p className={`${phone ? "text-inherit before:content-['US_+1']" : ''} tracking-tight top-[50%] -translate-y-[50%] absolute left-3 w-max transition-all ease-linear duration-[400ms] focus:outline-none active:outline-none select-none`}>
                            <span className={`${phone ? "text-secondary ml-3" : 'text-transparent ml-3'} focus:outline-none active:outline-none`}>
                                |
                            </span>
                        </p>

                        <input
                            type='text'
                            id='identity'
                            value={identity}
                            onChange={handleIdentityChange}
                            className={`${phone ? 'translate-x-[65px]' : ''} flex-1 w-max bg-inherit py-2.5 px-2 transition-all ease-linear duration-200 focus:outline-none active:outline-none`}
                        />

                    </div>

                </div>

                <div className='flex flex-col space-y-2 '>

                    <label htmlFor='password' className={`${errors ? 'text-red-400' : 'text-secondary'} font-semibold uppercase text-xs select-none`}>
                        {errors ? 'Password - Invalid Credentials' : 'Password '}
                    </label>

                    <div className='relative bg-white flex items-center  w-full'>
                        <input
                            type={visiblePassword ? 'text' : 'password'}
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='py-2.5 px-2 focus:outline-none flex-1 '
                        />

                        <span className='mr-4 cursor-pointer text-secondary hover:text-neutral-700 active:text-neutral-800' onClick={() => setVisiblePassword(!visiblePassword)}>
                            {visiblePassword ? <FaEye /> : <RiEyeCloseLine />}
                        </span>
                    </div>

                    <span onClick={() => setForgotPassword(true)} className='select-none text-xs underline underline-offset-1  text-secondary cursor-pointer'>
                        Forgot Password?
                    </span>

                </div>

                <div className=''>
                    <button
                        disabled={identity === "" || password === ""}
                        className={`${(identity === "" || password === "") ? "bg-blue-400" : "bg-blue-500"}  p-3 rounded-lg text-white w-full mt-3 select-none`}
                        type='submit'>
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}

const ForgotPasswordModal = ({ hashCode, setForgotPassword }) => {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [error, setError] = useState(false)
    const [passwordReset, setPasswordReset] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [reTypePassword, setReTypePassword] = useState('')

    const formInputRef = React.createRef()
    useEffect(() => {
        if (!passwordReset) {
            code.forEach((item, idx) => {
                if (idx !== code.length - 1) {
                    if (item.length > 0) {
                        formInputRef.current.children[idx + 1].focus()
                    }
                }

            })
        }

    }, [formInputRef])

    function handleInputChange(e, index) {
        const copy = [...code]
        copy[index] = e.target.value
        setCode([...copy])
    }

    function handleCodeSubmit(e) {
        e.preventDefault()
        const formattedCode = code.toString().replace(/,/g, '')
        if (hashCode === formattedCode) {
            setPasswordReset(true)
        } else {
            setCode(["", "", "", "", "", ""])
            setError(true)
            setTimeout(() => {
                setError(false)
            }, [3000])
        }
    }

    function handleResetPasswordSubmit(e) {
        e.preventDefault()

        // Change Password 
        setForgotPassword(false)
    }
    return (
        <div className={`${error ? 'animate-wiggle ring-4 ring-red-400' : ''} bg-neutral-100 p-10 rounded-xl drop-shadow-xl min-w-[450px] max-w-[450px]`}>

            {!passwordReset &&
                <>
                    <h1 className='text-center text-neutral-700 text-3xl font-bold tracking-tight mb-10 select-none'>
                        Input Generated Code
                    </h1>

                    <span>{hashCode}</span>
                    {error && <h2 className='text-red-400 font-semibold text-center'>Invalid Code</h2>}
                    <form onSubmit={handleCodeSubmit} className=' '>

                        <div ref={formInputRef} className='text-neutral-700 bg-neutral-200 py-6 px-2 rounded-xl flex w-full justify-evenly'>
                            <input
                                minLength={1}
                                maxLength={1}
                                value={code[0]}
                                onChange={(e) => handleInputChange(e, 0)}
                                className='w-[45px] h-[60px] text-2xl text-center focus:outline-none rounded-xl'
                            />
                            <input
                                minLength={1}
                                maxLength={1}
                                value={code[1]}
                                onChange={(e) => handleInputChange(e, 1)}
                                className='w-[45px] h-[60px] text-2xl text-center focus:outline-none rounded-xl'
                            />
                            <input
                                minLength={1}
                                maxLength={1}
                                value={code[2]}
                                onChange={(e) => handleInputChange(e, 2)}
                                className='w-[45px] h-[60px] text-2xl text-center focus:outline-none rounded-xl'
                            />
                            <input
                                minLength={1}
                                maxLength={1}
                                value={code[3]}
                                onChange={(e) => handleInputChange(e, 3)}
                                className='w-[45px] h-[60px] text-2xl text-center focus:outline-none rounded-xl'
                            />
                            <input
                                minLength={1}
                                maxLength={1}
                                value={code[4]}
                                onChange={(e) => handleInputChange(e, 4)}
                                className='w-[45px] h-[60px] text-2xl text-center focus:outline-none rounded-xl'
                            />
                            <input
                                minLength={1}
                                maxLength={1}
                                value={code[5]}
                                onChange={(e) => handleInputChange(e, 5)}
                                className='w-[45px] h-[60px] text-2xl text-center focus:outline-none rounded-xl'
                            />
                        </div>


                        <div className='mt-6'>
                            <button
                                disabled={code.some((element) => element === "")}
                                className={`${(code.some((element) => element === "")) ? "bg-blue-400" : "bg-blue-500"}  p-3 rounded-lg text-white w-full mt-3 select-none`}
                                type='submit'>
                                Submit
                            </button>
                        </div>

                    </form>
                </>

            }



            {passwordReset &&
                <>
                    <h1 className='text-center text-neutral-700 text-3xl font-bold tracking-tight mb-10 select-none'>
                        New Password
                    </h1>

                    <form onSubmit={handleResetPasswordSubmit} className='flex flex-col space-y-5 '>

                        <div className='flex flex-col space-y-2'>
                            <label htmlFor='newPassword' className='text-secondary font-semibold uppercase text-xs select-none'>
                                Password
                            </label>
                            <input
                                type={'password'}
                                id='newPassword'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='bg-white w-full py-2.5 px-2 focus:outline-none flex-1 '
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label htmlFor='reTypePassword' className='text-secondary font-semibold uppercase text-xs select-none'>
                                ReType Password
                            </label>
                            <input
                                type={'password'}
                                id='reTypePassword'
                                value={reTypePassword}
                                onChange={(e) => setReTypePassword(e.target.value)}
                                className='bg-white w-full py-2.5 px-2 focus:outline-none flex-1 '
                            />
                        </div>

                        <div className=''>
                            <button
                                disabled={newPassword !== reTypePassword || newPassword === ""}
                                className={`${(newPassword !== reTypePassword || newPassword === "") ? "bg-blue-400" : "bg-blue-500"}  p-3 rounded-lg text-white w-full mt-3 select-none`}
                                type='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            }

        </div>
    )
}
function Admin() {
    const [forgotPassword, setForgotPassword] = useState(false)
    const [hashCode, setHashCode] = useState('')
    const { ready } = useSelector(state => state.admin)
    const navigate = useNavigate()

    function generateCode() {
        let hashCode = ''
        for (let i = 0; i < 6; i++) {
            hashCode += (Math.floor(Math.random() * 9)) + 1
        }
        return hashCode
    }

    useEffect(() => {
        if (ready) {
            navigate('/admin/dashboard')
        }
    }, [ready])

    useEffect(() => {
        if (forgotPassword) {
            setHashCode(generateCode())
        }
    }, [forgotPassword])

    return (
        <div className='h-screen flex justify-center items-center'>

            <Link to='/'>
                <span className='fixed top-10 left-10 flex items-center'>
                    <FiHome className='inline-block mr-2' /> Home
                </span>
            </Link>

            {!forgotPassword && <LoginModal setForgotPassword={setForgotPassword} />}
            {forgotPassword && <ForgotPasswordModal hashCode={hashCode} setForgotPassword={setForgotPassword} />}


        </div >
    )
}

export default Admin