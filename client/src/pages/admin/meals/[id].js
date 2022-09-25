import React, { useEffect, useState } from 'react'


// Redux
import { useSelector } from 'react-redux'

// Router
import { useParams, useNavigate } from 'react-router-dom'

// API
import { delete_RemoveMeal, get_SingleMeal, put_UpdateMeal } from '../../../lib/api/index'
import { replaceImage, uploadImage } from '../../../lib/firebase'

// Utils
import { replaceSpaces } from '../../../lib/utils'

// Icons
import { GrStatusGoodSmall } from 'react-icons/gr'
import { GiCookingPot } from 'react-icons/gi'
import { MdToggleOff, MdToggleOn, MdOutlineFileUpload, MdEdit, MdCheck, MdClose, MdDelete } from 'react-icons/md'
import { BsPlusCircle } from 'react-icons/bs'

// Styles
import fileInputStyles from '../../../components/Admin/styles/fileInputStyles.css'

// Components
import Loading from '../../../components/Admin/Loading'
import Image from '../../../components/Image'

const Name = ({ name, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(name)
    const [display, setDisplay] = useState(name)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ name: input })
        } else {
            setEdit(false)
        }

    }
    return (
        <>
            {!edit
                ? <h1 className='text-neutral-700 text-3xl mb-5 flex items-center'>
                    {display} <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                </h1>
                : <form className='mb-5 flex items-center text-neutral-700 text-3xl'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='px-2 ring-2 w-[80%] lg:w-fit focus:outline-none'
                    />
                    <div className='flex '>
                        <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='text-3xl cursor-pointer inline-block ml-2' />
                        <MdClose onClick={(e) => handleFormSubmit(e, false)} className='text-3xl cursor-pointer inline-block ml-2' />
                    </div>
                </form>
            }

        </>
    )
}
const Type = ({ type, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(type)
    const [display, setDisplay] = useState(type)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ type: input })
        } else {
            setEdit(false)
        }

    }
    return (
        <>
            {!edit
                ? <div className='text-lg text-neutral-700'>
                    <h2 className='font-semibold flex items-center'>
                        Type <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <span className='capitalize'>{display}</span>
                </div>
                : <form className='mb-5 text-neutral-700 text-lg'>
                    <h2 className='font-semibold r'>
                        Type
                    </h2>


                    <div className='flex'>
                        <select
                            className='py-1 focus:outline-none ring-2'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        >
                            <option value='breakfast'>Breakfast</option>
                            <option value='lunch'>Lunch</option>
                            <option value='dinner'>Dinner</option>
                        </select>

                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                </form>
            }

        </>
    )
}
const Price = ({ price, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(price)
    const [display, setDisplay] = useState(price)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ price: input })
        } else {
            setEdit(false)
        }
    }

    function generateCents(price) {
        if (price.toString().length === 1) {
            return `${price}.00`
        } else if (price.toString().length === 3) {
            return `${price}0`
        } else {
            return `${price}`
        }
    }
    return (
        <>
            {!edit
                ? <div className='text-lg text-neutral-700'>
                    <h2 className='font-semibold flex items-center'>
                        Price <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <span className='capitalize'>$ {generateCents(display)}</span>
                </div>
                : <form className='mb-5 text-neutral-700 text-lg'>
                    <h2 className='font-semibold r'>
                        Price
                    </h2>


                    <div className='flex'>
                        <span className='capitalize mr-2'>$ </span>
                        <input
                            min={1.00}
                            step={0.01}
                            type="number"
                            className='px-2 w-[80px] ring-2 focus:outline-none'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                </form>
            }

        </>
    )
}
const Description = ({ description, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(description)
    const [display, setDisplay] = useState(description)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ description: input })
        } else {
            setEdit(false)
        }

    }
    return (
        <>
            {!edit
                ? <div className='text-lg text-neutral-700'>
                    <h2 className='font-semibold flex items-center'>
                        Description <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <p className=''>{display}</p>
                </div>
                : <form className='mb-5 text-neutral-700 text-lg '>

                    <div className='flex'>
                        <h2 className='font-semibold r'>
                            Description
                        </h2>
                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                    <textarea
                        className='p-2 text-lg min-w-[500px] min-h-[200px] w-full focus:outline-none h-max rounded-sm ring-2'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />

                </form>
            }

        </>
    )
}
const IngredientItem = ({ item, index, allInputs, setAllInputs }) => {
    const [input, setInput] = useState(item)
    function handleRemoveItem() {
        const filteredList = allInputs.filter((item, idx) => idx !== index)
        setAllInputs([...filteredList])
    }

    function handleInputChange(e) {
        setInput(e.target.value)
    }
    return (
        <div>
            <input
                className='w-max px-2 capitalize ring-2 rounded-sm'
                value={input}
                onChange={handleInputChange}
            />
            <MdClose onClick={handleRemoveItem} className='cursor-pointer inline-block ml-2' />
        </div>

    )
}
const Ingredients = ({ ingredients, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [allInputs, setAllInputs] = useState(ingredients)
    const [display, setDisplay] = useState(ingredients)
    const ulRef = React.useRef(null)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            const filteredList = []
            ulRef.current.childNodes.forEach((item) => {
                if (item.childNodes[0].value !== "") {
                    filteredList.push(item.childNodes[0].value)
                }
            })
            setDisplay([...filteredList])
            setAllInputs([...filteredList])
            handleUpdate({ ingredients: [...filteredList] })
        } else {
            setEdit(false)
        }
    }


    return (
        <>
            {!edit
                ? <div className='text-lg text-neutral-700'>
                    <h2 className='font-semibold flex items-center'>
                        Ingredients <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <p className='capitalize'>{display.toString()}</p>
                </div>
                : <form className='mb-5 text-neutral-700 text-lg '>

                    <div className='flex'>
                        <h2 className='font-semibold r'>
                            Ingredients
                        </h2>
                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                    <div className='flex flex-col space-y-2 w-max'>
                        <ul ref={ulRef} className='flex flex-col space-y-2 w-max'>
                            {allInputs.map((item, idx) => (
                                <IngredientItem
                                    key={`form-${item}-${idx}`}
                                    item={item}
                                    index={idx}
                                    allInputs={allInputs}
                                    setAllInputs={setAllInputs}
                                />
                            ))}
                        </ul>
                        <button type="button" onClick={() => setAllInputs([...allInputs, ''])} className='w-full ring-2 ring-neutral-300 rounded-sm'>
                            <BsPlusCircle className='inline-block mb-0.5 mr-0.5' /> Add
                        </button>
                    </div>




                </form>
            }

        </>
    )
}
const Macros = ({ calories, protein, carbs, fats, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [calInput, setCalInput] = useState(calories)
    const [proInput, setProInput] = useState(protein)
    const [carbsInput, setCarbsInput] = useState(carbs)
    const [fatsInput, setFatsInput] = useState(fats)


    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            const body = {
                calories: parseInt(calInput),
                protein: parseInt(proInput),
                carbs: parseInt(carbsInput),
                fats: parseInt(fatsInput)
            }
            handleUpdate({ nutrition: { ...body } })
        } else {
            setEdit(false)
        }
    }


    return (
        <>
            {!edit
                ? <div className='text-lg'>
                    <h2 className='font-semibold flex items-center'>
                        Macros <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <div className='flex flex-col space-y-2'>
                        <span className=''>Calories: {calInput}</span>
                        <span className=''>Protein: {proInput} g</span>
                        <span className=''>Carbs: {carbsInput} g</span>
                        <span className=''>Fat: {fatsInput} g</span>
                    </div>
                </div>
                : <form className='mb-5 text-neutral-700 text-lg '>

                    <div className='flex'>
                        <h2 className='font-semibold r'>
                            Macros
                        </h2>
                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                    <div className='flex flex-col space-y-2'>

                        {/* Calories */}
                        <div>
                            <span className=''>Calories: </span>
                            <input
                                className='w-[80px] px-2 focus:outline-none ring-2  rounded-sm'
                                type="number"
                                value={calInput}
                                onChange={(e) => setCalInput(e.target.value)}
                            />
                        </div>

                        {/* Protein */}
                        <div>
                            <span className=''>Protein: </span>
                            <input
                                className='w-[65px] px-2 focus:outline-none ring-2  rounded-sm'
                                type="number"
                                value={proInput}
                                onChange={(e) => setProInput(e.target.value)}
                            />
                            <span className='ml-1'>g</span>
                        </div>

                        {/* Carbs */}
                        <div>
                            <span className=''>Carbs: </span>
                            <input
                                className='w-[65px] px-2 focus:outline-none ring-2  rounded-sm'
                                type="number"
                                value={carbsInput}
                                onChange={(e) => setCarbsInput(e.target.value)}
                            />
                            <span className='ml-1'>g</span>
                        </div>

                        {/* Fats */}
                        <div>
                            <span className=''>Fats: </span>
                            <input
                                className='w-[65px] px-2 focus:outline-none ring-2  rounded-sm'
                                type="number"
                                value={fatsInput}
                                onChange={(e) => setFatsInput(e.target.value)}
                            />
                            <span className='ml-1'>g</span>
                        </div>

                    </div>

                </form>
            }

        </>
    )
}
const Img = ({ img, name, handleUpdate }) => {
    const [edit, setEdit] = useState(false)
    const [imageUpload, setImageUpload] = useState(img ? img : '')
    const [display, setDisplay] = useState({ quick: null, official: img })

    function handleFormSubmit(e, ok) {
        e.preventDefault()

        if (ok) {
            const fileExt = imageUpload.name.split('.')[1]
            const filename = new Date().toISOString().replace(/:/g, '-') + '_' + replaceSpaces(name) + '.' + fileExt
            if (display.official) {
                // Replace Image in Firebase
                replaceImage(display.official, imageUpload, filename)
            } else {
                // Add Image to Firebase
                uploadImage(imageUpload, filename)
            }

            // Update MongoDB Filename
            handleUpdate({ img: filename })
        } else {
            setDisplay({ ...display, quick: null })
            setImageUpload(img ? img : '')
            setEdit(false)
        }
    }

    async function handleFileOnChange(e) {
        if (e.target.files && e.target.files[0]) {
            let img = URL.createObjectURL(e.target.files[0]);
            setDisplay({ ...display, quick: img })
            setImageUpload(e.target.files[0])

        }
    }
    return (

        <div className='relative max-w-[400px] max-h-[400px] min-w-[300px] min-h-[300px] lg:max-w-[300px] lg:max-h-[300px] lg:min-w-[500px] rounded-xl overflow-hidden lg:min-h-[500px] bg-transparent flex justify-center items-center'>
            {!edit &&
                <>
                    {display.official
                        ? <Image src={display.official} alt={display.official} sx='object-center object-cover rounded-xl overflow-hidden ' />
                        : <span className='bg-neutral-400 lg:w-[500px] lg:h-[500px]  lg:max-w-[500px] lg:max-h-[500px] w-full h-full min-w-[300px] min-h-[300px] flex justify-center items-center rounded-lg' >
                            <GiCookingPot className='text-white text-[10rem]' />
                        </span>
                    }

                    <MdEdit
                        onClick={() => setEdit(true)}
                        className='cursor-pointer inline-block ml-2 absolute top-5 right-5 text-4xl text-neutral-500 bg-white rounded-lg p-1' />
                </>
            }

            {edit &&
                <>
                    <div className='absolute top-5 right-5 text-3xl text-neutral-500 bg-white rounded-xl p-2 flex space-x-2 items-center'>
                        <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ' />
                        <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ' />
                    </div>

                    {(display.quick) && <img src={display.quick} alt={display.quick} className='w-full h-full object-cover object-center rounded-xl overflow-hidden' />}

                    <div style={fileInputStyles} className='absolute -translate-y-[50%] top-[50%]'>
                        <label className="custom-file-upload text-neutral-700">
                            <input
                                type="file"
                                name='image'
                                onChange={handleFileOnChange}
                            />
                            <MdOutlineFileUpload className='inline-block mb-0.5 text-xl' /> Upload
                        </label>
                    </div>
                </>

            }



        </div>
    )
}
const StatusToggle = ({ active, setActive, handleUpdate }) => {
    function handleStatusUpdate(condition) {
        setActive(condition)
        handleUpdate({ active: condition })
    }
    return (
        <button className='text-[3rem]'>
            {active
                ? <MdToggleOn
                    className=' text-green-500 cursor-pointer hover:text-green-600'
                    onClick={() => handleStatusUpdate(false)}
                />
                : <MdToggleOff
                    className=' text-neutral-500 cursor-pointer hover:text-neutral-600'
                    onClick={() => handleStatusUpdate(true)}
                />
            }

        </button>
    )
}
const DeleteButton = ({ handleRemoveMeal }) => {
    return (
        <button onClick={handleRemoveMeal} className='text-lg text-red-500 flex space-x-2 items-center border-2 border-red-400 rounded-xl px-4 py-1 hover:bg-red-400 hover:text-white transition-all duration-200 ease-in-out'>
            <MdDelete />
        </button>
    )
}

function SingleMeal() {
    const { _id } = useParams()
    const { token } = useSelector(state => state.admin)
    const [loading, setLoading] = useState(true)
    const [meal, setMeal] = useState(null)
    const [active, setActive] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (meal === null) {
            get_SingleMeal(_id)
                .then((res) => {
                    setMeal(res)
                    setActive(res.active)
                })
        }
    }, [_id, meal])

    useEffect(() => {
        if (meal !== null) {
            setLoading(false)
        }
    }, [meal])

    async function handleUpdate(body) {
        await put_UpdateMeal(token, _id, body)
    }

    async function handleRemoveMeal() {
        const userConfirm = window.confirm(`Are you sure you want to remove ${meal.name}?`)
        if (userConfirm) {
            await delete_RemoveMeal(token, _id)
            navigate('/admin/meals')
        }
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='pt-[10rem] px-10 lg:px-20 pb-20 flex items-center justify-center'>
            <div className='bg-white rounded-xl p-5 drop-shadow-xl relative max-w-[1200px]'>

                <Name
                    handleUpdate={handleUpdate}
                    name={meal.name}
                />

                <div className='flex space-x-2 items-center absolute right-5 top-[45%] lg:top-5 lg:right-5'>
                    <DeleteButton handleRemoveMeal={handleRemoveMeal} />
                    <StatusToggle
                        active={active}
                        setActive={setActive}
                        handleUpdate={handleUpdate}
                    />
                </div>


                <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-5'>
                    <Img
                        name={meal.name}
                        img={meal.img}
                        handleUpdate={handleUpdate}
                    />
                    <div className='flex flex-col space-y-5 w-full'>

                        {/* Status */}
                        <div className='text-lg'>
                            <h2 className='font-semibold'>Status</h2>
                            <span className='capitalize'>
                                <GrStatusGoodSmall
                                    className={`${active ? 'text-green-500' : 'text-red-500'} text-sm mb-0.5 mr-2 inline-block`}
                                />
                                {active
                                    ? 'Active'
                                    : 'Inactive'
                                }
                            </span>
                        </div>

                        <Price
                            price={meal.price}
                            handleUpdate={handleUpdate}
                        />
                        <Type
                            type={meal.type}
                            handleUpdate={handleUpdate}
                        />
                        <Description
                            description={meal.description}
                            handleUpdate={handleUpdate}
                        />
                        <Ingredients
                            ingredients={meal.ingredients}
                            handleUpdate={handleUpdate}
                        />
                        <Macros
                            handleUpdate={handleUpdate}
                            calories={meal.nutrition.calories}
                            protein={meal.nutrition.protein}
                            carbs={meal.nutrition.carbs}
                            fats={meal.nutrition.fats}
                        />




                    </div>
                </div>


            </div>
        </div>
    )
}

export default SingleMeal