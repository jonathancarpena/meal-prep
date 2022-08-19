import React, { useState, useEffect } from 'react'

// Context
import { useStoreOpen } from '../../lib/context/StoreOpenProvider';

// API
import { get_AllDates, post_AddOrder } from '../../lib/api/index'

// Router
import { Link, useNavigate } from 'react-router-dom';

// Components
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Loading from '../../components/Admin/Loading'
import Image from '../../components/Image'

// Utils
import { validateEmail } from '../../lib/utils';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { removeFromBag, updateQtyBag } from '../../redux/features/bag/bagSlice'
import { updateSession } from '../../redux/features/session/sessionSlice'

// Icons 
import { BsBag, BsCalendar2Event } from 'react-icons/bs'
import { GiCookingPot } from 'react-icons/gi'
import { FaInstagram, FaMinus, FaPlus, FaStoreSlash } from 'react-icons/fa'

const EmptyBag = () => {
    return (
        <div className='relative bottom-10 flex flex-col  space-y-5 justify-center items-center text-neutral-700'>
            <h1 className='text-4xl font-semibold text-center'>Nothing inside Your Bag</h1>
            <BsBag className='text-[4rem]' />
        </div>
    )
}
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
            <label className={`text-neutral-700 text-sm`} >
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
                    className='border-2 border-neutral-500  p-1 rounded-lg focus:outline-2 focus:outline-offset-1 focus:outline-sky-500 text-neutral-900'
                />
            }

            {type === "email" &&
                <input
                    type={"email"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='border-2 border-neutral-500  p-1 rounded-lg focus:outline-2 focus:outline-offset-1 focus:outline-sky-500 text-neutral-900'
                />
            }



        </div>
    )
}
const ContactInfo = ({ fName, setFName, lName, setLName, email, setEmail, errors }) => {

    return (
        <div className='flex flex-col space-y-2'>
            <span className='text-xl text-neutral-700 underline underline-offset-2 mb-3'>Contact Info:</span>
            <form className='mx-5 lg:w-[50%] flex flex-col space-y-2'>
                <div className='flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2 '>
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
                    type='email'
                    error={errors.email}
                    value={email}
                    setValue={setEmail}
                    label={"Email"}
                />



            </form>
        </div>

    )
}
const ReserveDate = ({ availableDates, reserveDate, setReserveDate }) => {
    const today = moment(Date.now())
    const CustomDateButton = React.forwardRef(({ value, onClick }, ref) => (
        <button className="w-max text-neutral-700" onClick={onClick} ref={ref}>
            <BsCalendar2Event className='text-2xl lg:text-3xl inline-block' />
        </button>
    ));

    const renderDayContents = (day, date) => {
        const calendarDate = moment(date).format('YYYY-MM-DD')
        let available = false
        availableDates.forEach((item) => {
            if (calendarDate === moment(item.day).format('YYYY-MM-DD')) {
                available = true
            }
        })
        if (available) {
            return (
                <span className='bg-green-500 text-white block rounded-lg'>
                    {day}
                </span>
            )
        } else {
            return <span className=''>{day}</span>
        }
    }

    function formatAvailableDates() {
        return availableDates.map((item) => moment(item.day).format('YYYY-MM-DD'))
    }
    function generateExcludeDates() {
        const available = formatAvailableDates()
        const excludeDates = []
        for (let i = 0; i <= 31; i++) {
            const date = moment(Date.now()).add(i, 'd')._d
            const formatDate = moment(date).format('YYYY-MM-DD')
            if (!available.includes(formatDate)) {
                excludeDates.push(date)
            }
        }
        return excludeDates
    }
    return (
        <>
            <div className='flex flex-col space-y-2'>
                <span className='text-xl text-neutral-700 underline underline-offset-2'>Pick Up Date:</span>
                <div className='ml-5 flex items-center space-x-3'>
                    <span className='text-neutral-700 text-xl lg:text-3xl   '>
                        {moment(reserveDate).format('dddd MMM DD, YYYY')}
                    </span>
                    <div>
                        <DatePicker
                            minDate={moment(Date.now())._d}
                            selected={moment(reserveDate)._d}
                            onChange={(e) => setReserveDate(e)}
                            renderDayContents={renderDayContents}
                            excludeDates={generateExcludeDates()}
                            maxDate={today.add(1, 'M')._d}
                            customInput={<CustomDateButton />}
                        />
                    </div>
                </div>
            </div>
        </>

    )
}
const ListOfBagItems = ({ ulRef, bag }) => {

    const BagItem = ({ product, index }) => {
        const dispatch = useDispatch()
        const { _id, img, name, price } = product
        const [qty, setQty] = useState(product.qty)

        const QuantityAdjust = () => {
            function handleUpdateQty(condition) {
                let newQty = qty
                if (condition === "add") {
                    newQty += 1
                    setQty(newQty)
                } else {
                    if (qty !== 1) {
                        newQty -= 1
                        setQty(newQty)
                    }
                }
                dispatch(updateQtyBag({ qty: newQty, index }))
                dispatch(updateSession())
            }
            return (
                <div className='flex border-2 rounded-xl'>
                    <button disabled={qty === 1} onClick={() => handleUpdateQty('sub')} className={`${qty > 1 ? 'text-neutral-800' : 'text-neutral-400'} p-2 w-[40px] h-[40px]`}>
                        <FaMinus className={`text-xl`} />
                    </button>
                    <span className='bg-white p-2 text-lg w-[40px] h-[40px] flex items-center justify-center'>
                        {qty}
                    </span>
                    <button onClick={() => handleUpdateQty('add')} className={`text-neutral-800  p-2 w-[40px] h-[40px]`}>
                        <FaPlus className='text-xl' />
                    </button>
                </div>

            )

        }

        function generateTotal() {
            let total = 0
            total = product.qty * price
            return (
                <span>${total}.00</span>
            )
        }

        function handleRemoveItem() {
            const userConfirm = window.confirm(`Are you sure you would like to remove ${name} from your bag?`)
            if (userConfirm) {
                dispatch(removeFromBag(product))
            }
        }
        return (
            <>
                <li className={`hidden lg:flex lg:space-x-10 ${index === bag.length - 1 ? '' : 'mb-10'} `}>
                    {/* Product */}
                    <div className='flex flex-1 space-x-10'>
                        <div className='w-[120px] h-[120px] flex rounded-2xl justify-center items-center bg-neutral-300 overflow-hidden'>
                            {img
                                ? <Image src={img} alt={name} sx=' object-center object-cover rounded-lg ' />
                                : <GiCookingPot className='text-[4rem] text-white' />
                            }
                        </div>
                        <div className='flex flex-col justify-center'>
                            <Link to={`/meals/${_id}`}>
                                <h2 className='text-neutral-700 font-semibold text-2xl tracking-tight'>
                                    {name}
                                </h2>
                            </Link>
                            <span onClick={handleRemoveItem} className='cursor-pointer text-red-400 underline underline-offset-1'>
                                Remove
                            </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className='flex flex-1 items-center justify-between'>
                        <QuantityAdjust />
                        {generateTotal()}
                    </div>

                </li>

                {/* Mobile */}
                <li className={`lg:hidden flex flex-col space-y-3 ${index === bag.length - 1 ? '' : 'mb-10'}  `}>
                    {/* Product */}
                    <div className='flex space-x-5'>

                        {/* Image */}
                        <div className='w-[120px] h-[120px] flex rounded-2xl justify-center items-center bg-neutral-300 overflow-hidden'>
                            {img
                                ? <Image src={img} alt={name} sx=' object-center object-cover rounded-lg ' />
                                : <GiCookingPot className='text-[4rem] text-white' />
                            }
                        </div>

                        {/* Info */}
                        <div className='flex flex-col justify-center'>
                            <Link to={`/meals/${_id}`}>
                                <h2 className='text-neutral-700 font-semibold text-lg tracking-tight'>
                                    {name}
                                </h2>
                            </Link>
                            {generateTotal()}

                        </div>
                    </div>

                    {/* Info */}
                    <div className='flex items-center justify-start'>
                        <QuantityAdjust />
                        <span onClick={handleRemoveItem} className='ml-5 cursor-pointer text-red-400 underline underline-offset-1'>
                            Remove
                        </span>
                    </div>


                </li>
            </>


        )
    }
    return (
        <div>
            <p className='text-2xl text-neutral-700 underline underline-offset-2'>Items:</p>
            <ul ref={ulRef} className='flex flex-col ml-5 mt-5 '>
                {bag.map((product, idx) => (
                    <BagItem key={`bag-item-${idx}`} product={product} index={idx} />
                ))}
            </ul>
        </div>

    )
}
const Summary = ({ bag, handleSubmitOrder }) => {
    function generateBagLength() {
        let length = 0
        if (bag.length > 0) {
            bag.forEach((item) => length += item.qty)
        }
        return length
    }

    function generateBagTotal() {
        let total = 0
        bag.forEach((item) => {
            total += (item.price * item.qty)
        })
        return total
    }
    generateBagTotal()
    return (
        <div className='py-5 flex flex-col space-y-8 lg:w-[400px] lg:self-end '>
            <div className='flex justify-between items-center'>
                <span>Subtotal ({generateBagLength()} items)</span>
                <span className='font-semibold text-xl'>${generateBagTotal()}.00</span>
            </div>

            <button onClick={handleSubmitOrder} className='text-white font-bold ring-2 ring-yellow-400 px-4 py-2 rounded-2xl bg-yellow-400 '>
                Submit Order
            </button>

            <p className='text-center text-sm italic text-neutral-500'>Cash Only</p>
        </div >
    )
}

function Order() {
    const navigate = useNavigate()
    const bag = useSelector(state => state.bag)
    const [loading, setLoading] = useState(true)
    const open = useStoreOpen()


    // Contact Form 
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({ fName: null, lName: null, email: null })
    const [reserveDate, setReserveDate] = useState(null)
    const [availableDates, setAvailableDates] = useState(null)
    const ulRef = React.useRef(null)


    useEffect(() => {
        if (availableDates === null) {
            get_AllDates()
                .then((data) => {
                    setAvailableDates(data)
                    setReserveDate(data[0].day)
                })
        }
    }, [availableDates])

    useEffect(() => {
        if (availableDates !== null && reserveDate !== null) {
            setLoading(false)
        }
    }, [availableDates, reserveDate])





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


        setErrors({ ...copy })

        const results = Object.values(copy).every((item) => item === false)
        return results
    }


    // book_date: {
    //     type: Date,
    //     required: true,
    // },
    // customer: {
    //     type: CustomerSchema,
    //     required: true
    // },

    async function handleSubmitOrder() {


        if (formValidate()) {
            const items = bag.map((item) => {
                return {
                    _id: item._id,
                    qty: item.qty
                }
            })

            const body = {
                items,
                customer: { first_name: fName, last_name: lName, email },
                book_date: moment(reserveDate).toDate()
            }

            const res = await post_AddOrder(body)
            if (res) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    navigate(`/order/success/${res._id}`, {
                        state: {
                            bag,
                            bookDate: res.book_date,
                            customer: res.customer,
                            number: res.number
                        }
                    })
                }, [5000])
            }
        }
    }

    if (!open) {
        return <div className=' bg-neutral-100 p-10 lg:p-20  text-neutral-500 min-h-[91vh] flex flex-col space-y-2 justify-center items-center'>

            <div className='flex flex-col items-center justify-center'>
                <FaStoreSlash className='text-[4rem] ' />
                <h1 className='text-[2rem] lg:text-[2.5rem] tracking-tight font-bold text-center'>All Booked for Today.</h1>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-lg lg:text-xl'>Check out the Instagram for any Updates!</h2>
                <a href="/" target="_blank" rel="noopener noreferrer" className='flex space-x-1 items-center text-lg lg:text-xl border-b-4 border-b-neutral-500'>
                    <FaInstagram className='inline-block mt-0.5' /> <span>@itsncarpena</span>
                </a>
            </div>

        </div>
    }
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div className='mt-[90px] bg-neutral-100 p-10 lg:p-20  min-h-[91vh] flex justify-center items-center'>

            {bag.length === 0
                ? <EmptyBag />
                : <div className='p-5 bg-white drop-shadow-xl rounded-xl w-full max-w-[1200px]'>
                    <h1 className='text-4xl font-semibold mb-5 border-b-4 w-max border-b-yellow-400'>
                        Your Bag ({bag.length})
                    </h1>
                    <div className='flex flex-col space-y-10'>
                        <div className='flex flex-col  space-y-10 lg:space-x-10 lg:flex-row lg:space-y-0'>
                            <ContactInfo
                                fName={fName}
                                setFName={setFName}
                                lName={lName}
                                setLName={setLName}
                                email={email}
                                setEmail={setEmail}
                                errors={errors}
                            />
                            <ReserveDate
                                availableDates={availableDates}
                                reserveDate={reserveDate}
                                setReserveDate={setReserveDate}
                            />
                        </div>

                        <ListOfBagItems ulRef={ulRef} bag={bag} />
                        <Summary bag={bag} handleSubmitOrder={handleSubmitOrder} />
                    </div>


                </div>


            }




        </div>
    )
}

export default Order