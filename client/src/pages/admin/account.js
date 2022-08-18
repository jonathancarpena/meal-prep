import React, { useState } from 'react'

// Redux
import { useSelector } from 'react-redux'

// API
import { put_UpdateProfile } from '../../lib/api'

// Icons
import { MdPerson, MdSave } from 'react-icons/md'

// Utils
import { toTitleCase } from '../../lib/utils'

function Account() {
    const { token } = useSelector(state => state.admin)

    const [oldPassword, setOldPassword] = useState('')
    const [oldEmail, setOldEmail] = useState('')
    const [oldPhone, setOldPhone] = useState('')

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [errors, setErrors] = useState({ email: null, password: null, phone: null })

    function formReset() {
        setOldPassword('')
        setOldEmail('')
        setOldPhone('')
        setPassword('')
        setEmail('')
        setPhone('')
        setErrors({ email: null, password: null, phone: null })
    }

    async function handleFormSubmit(e, condition, value, oldValue) {
        e.preventDefault()
        const valueKey = `${condition}`
        const oldValueKey = `old${toTitleCase(condition)}`

        let body = { condition }
        body[valueKey] = value
        body[oldValueKey] = oldValue

        const res = await put_UpdateProfile(token, body)

        if (res) {
            formReset()
        } else {
            let copy = { ...errors }
            copy[condition] = true
            setErrors({ ...copy })
        }
    }

    return (
        <div className='pt-[10rem] px-10 lg:px-20 pb-20 text-neutral-700 '>
            <div className='bg-white rounded-xl p-5 drop-shadow-xl max-w-3xl mx-auto'>
                <h1 className='text-neutral-700 text-3xl mb-5'>
                    <MdPerson className='inline-block mb-1' /> Account
                </h1>

                <div className='flex flex-col space-y-10'>

                    <div>
                        <h2 className='mb-3 font-semibold text-lg flex items-center '>
                            Password Change
                            <MdSave onClick={(e) => handleFormSubmit(e, 'password', password, oldPassword)} className='cursor-pointer inline-block ml-2' />
                            {errors.password &&
                                <span className='text-red-500 text-sm ml-3'>Incorrect Password</span>
                            }

                        </h2>

                        <form onSubmit={(e) => handleFormSubmit(e, 'password', password, oldPassword)} className='mx-5 flex flex-col space-y-3'>
                            <div className='flex items-center'>
                                <label htmlFor='oldPw'>Old Password</label>
                                <input
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    id='oldPw'
                                    type={'password'}
                                    className='bg-neutral-50 ml-3 flex-1 border-2 rounded-lg py-1 px-2 focus:outline-2 focus:outline-offset-1 focus:outline-sky-400 '
                                />
                            </div>
                            <div className='flex items-center'>
                                <label htmlFor='newPw'>New Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='newPw'
                                    type={'password'}
                                    className='bg-neutral-50 ml-3 flex-1 border-2 rounded-lg py-1 px-2 focus:outline-2 focus:outline-offset-1 focus:outline-sky-400 '
                                />
                            </div>

                        </form>
                    </div>

                    <div>
                        <h2 className='mb-3 font-semibold text-lg  flex items-center'>
                            Email Change
                            <MdSave onClick={(e) => handleFormSubmit(e, 'email', email, oldEmail)} className='cursor-pointer inline-block ml-2' />
                            {errors.email &&
                                <span className='text-red-500 text-sm ml-3'>Incorrect Email</span>
                            }
                        </h2>
                        <form onSubmit={(e) => handleFormSubmit(e, 'email', email, oldEmail)} className='mx-5 flex flex-col space-y-3'>
                            <div className='flex items-center'>
                                <label htmlFor='oldEmail'>Old Email</label>
                                <input
                                    value={oldEmail}
                                    onChange={(e) => setOldEmail(e.target.value)}
                                    id='oldEmail'
                                    type={'email'}
                                    className='bg-neutral-50 ml-3 flex-1 border-2 rounded-lg py-1 px-2 focus:outline-2 focus:outline-offset-1 focus:outline-sky-400 '
                                />
                            </div>
                            <div className='flex items-center'>
                                <label htmlFor='newEmail'>New Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id='newEmail'
                                    type={'email'}
                                    className='bg-neutral-50 ml-3 flex-1 border-2 rounded-lg py-1 px-2 focus:outline-2 focus:outline-offset-1 focus:outline-sky-400 '
                                />
                            </div>

                        </form>
                    </div>

                    <div>
                        <h2 className='mb-3 font-semibold text-lg  flex items-center'>
                            Phone Number Change
                            <MdSave onClick={(e) => handleFormSubmit(e, 'phone', phone, oldPhone)} className='cursor-pointer inline-block ml-2' />
                            {errors.phone &&
                                <span className='text-red-500 text-sm ml-3'>Incorrect Phone</span>
                            }
                        </h2>
                        <form onSubmit={(e) => handleFormSubmit(e, 'phone', phone, oldPhone)} className='mx-5 flex flex-col space-y-3'>
                            <div className='flex items-center'>
                                <label htmlFor='oldNum'>Old Phone #</label>
                                <input
                                    value={oldPhone}
                                    onChange={(e) => setOldPhone(e.target.value)}
                                    id='oldNum'
                                    type={'text'}
                                    className='bg-neutral-50 ml-3 flex-1 border-2 rounded-lg py-1 px-2 focus:outline-2 focus:outline-offset-1 focus:outline-sky-400 '
                                />
                            </div>
                            <div className='flex items-center'>
                                <label htmlFor='newNum'>New Phone #</label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id='newNum'
                                    type={'text'}
                                    className='bg-neutral-50 ml-3 flex-1 border-2 rounded-lg py-1 px-2 focus:outline-2 focus:outline-offset-1 focus:outline-sky-400 '
                                />
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Account