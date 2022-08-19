import React, { useState } from 'react'
import { validateEmail } from '../lib/utils'

// Icons
import { CgSpinnerTwoAlt } from 'react-icons/cg'
const FormInput = ({ error, value, setValue, label, type = "text" }) => {
    function generateErrorMessage() {
        if (label.toLowerCase() === "first name" || label.toLowerCase() === "last name") {
            return "Min. 3 Characters."
        } else if (label.toLowerCase() === "order number") {
            return "Please Provide an Order Number."
        } else if (label.toLowerCase() === "email") {
            return "Invalid Email."
        } else {
            return "Please Provide an Input."
        }
    }
    return (
        <div className='flex flex-col space-y-1 w-full'>
            <label className={`text-neutral-700`} >
                <span className='capitalize'>{label}</span>
                {error &&
                    <span className='font-semibold text-sm text-red-500 ml-3'>
                        {generateErrorMessage()}
                    </span>
                }
            </label>
            {type === "text" &&
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='border-2 border-neutral-500  p-3 rounded-lg focus:outline-2 focus:outline-offset-1 focus:outline-sky-500 text-neutral-900'
                />
            }

            {type === "email" &&
                <input
                    type={"email"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='border-2 border-neutral-500  p-3 rounded-lg focus:outline-2 focus:outline-offset-1 focus:outline-sky-500 text-neutral-900'
                />
            }

            {type === "textarea" &&
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='border-2 border-neutral-500  p-3 rounded-lg focus:outline-2 focus:outline-offset-1 focus:outline-sky-500 text-neutral-900'
                />
            }

        </div>
    )
}

function Contact() {
    const [loading, setLoading] = useState(false)
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [orderNum, setOrderNum] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({ fName: null, lName: null, email: null, orderNum: null, message: null })

    function inputValidation(input, email) {
        let error = false
        if (input.length < 3) {
            error = true
        } else {
            if (email) {
                error = validateEmail(input)
            }
        }
        return error
    }

    function formValidate() {
        const copy = { ...errors }
        if (inputValidation(fName, false)) {
            copy['fName'] = true
        } else {
            copy['fName'] = false
        }

        if (inputValidation(lName, false)) {
            copy['lName'] = true
        } else {
            copy['lName'] = false
        }

        if (inputValidation(email, true)) {
            copy['email'] = true
        } else {
            copy['email'] = false
        }

        if (inputValidation(orderNum, false)) {
            copy['orderNum'] = true
        } else {
            copy['orderNum'] = false
        }

        if (inputValidation(message, false)) {
            copy['message'] = true
        } else {
            copy['message'] = false
        }

        setErrors({ ...copy })

        const results = Object.values(copy).every((item) => item === false)
        return results
    }

    function handleFormReset() {
        setFName('')
        setLName('')
        setEmail('')
        setOrderNum('')
        setMessage('')
        setErrors({ fName: null, lName: null, email: null, orderNum: null, message: null })
    }
    function handleContactSubmit(e) {
        e.preventDefault()
        if (formValidate()) {
            // Send Email
            setLoading(true)
            setTimeout(() => {
                handleFormReset()
                setLoading(false)
                alert("Thank you your message was sent! We'll get back to you in 24-48 hours.")
            }, [2000])
        }
    }
    return (
        <div className='mt-[90px]  min-h-[91vh] p-5 lg:p-20 bg-neutral-100 flex justify-center items-center'>
            <div className="flex flex-col space-y-5 bg-white rounded-xl p-5 drop-shadow-xl max-w-[700px]">
                <h1 className='font-semibold text-4xl'>
                    Contact Us
                </h1>
                <p>
                    Any questions about the products, your order,
                    inquiries etc...Shoot us an email at:
                    Support@FinalBossPerformance.com
                </p>

                <p>If you have any questions about shipping &
                    returns please see our Shipping and Returns
                    tab at the bottom of the home page.
                </p>

                <form onSubmit={handleContactSubmit} className='flex flex-col space-y-5'>

                    <div className='flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5'>
                        <FormInput
                            error={errors.fName}
                            value={fName}
                            setValue={setFName}
                            label={"First Name"}
                        />
                        <FormInput
                            error={errors.lName}
                            value={lName}
                            setValue={setLName}
                            label={"Last Name"}
                        />
                    </div>

                    <FormInput
                        error={errors.email}
                        type='email'
                        value={email}
                        setValue={setEmail}
                        label={'Email'}
                    />

                    <FormInput
                        error={errors.orderNum}
                        value={orderNum}
                        setValue={setOrderNum}
                        label={'Order Number'}
                    />

                    <FormInput
                        error={errors.message}
                        value={message}
                        setValue={setMessage}
                        label={'Message'}
                        type={"textarea"}
                    />

                    <button className='hover:bg-yellow-400 bg-yellow-500 rounded-lg text-white text-xl font-semibold py-3 px-5 w-max self-end'>
                        {loading && <CgSpinnerTwoAlt className='inline-block mr-2 animate-spin mb-1' />}Submit
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Contact