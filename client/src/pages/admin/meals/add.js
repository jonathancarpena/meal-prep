import React, { useState } from 'react'

// Utils
import { replaceSpaces } from '../../../lib/utils'

// Router
import { useNavigate } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// API
import { post_AddMeal } from '../../../lib/api/index'
import { uploadImage } from '../../../lib/firebase'

// Icons
import { MdSave, MdOutlineFileUpload, MdClose } from 'react-icons/md'
import { BsPlusCircle } from 'react-icons/bs'

// Styles
import fileInputStyles from '../../../components/Admin/styles/fileInputStyles.css'


const Name = ({ name, setName, error }) => {
    return (
        <>
            <div className='flex '>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-[80%] lg:w-fit px-2 mb-5 flex items-center text-neutral-700 text-3xl  ring-2 ring-neutral-400 focus:outline-none'
                />
                {error &&
                    <span className='text-red-500 text-sm font-semibold ml-2'>Please provide a name for this meal</span>
                }
            </div>

        </>
    )
}
const Type = ({ type, setType }) => {

    return (
        <>
            <div className='mb-5 text-neutral-700 text-lg'>
                <h2 className='font-semibold r'>
                    Type
                </h2>

                <select
                    className='py-1 focus:outline-none ring-2 ring-neutral-400'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value='breakfast'>Breakfast</option>
                    <option value='lunch'>Lunch</option>
                    <option value='dinner'>Dinner</option>
                </select>
            </div>
        </>
    )
}
const Price = ({ price, setPrice, error }) => {

    return (
        <>

            <div className=' text-neutral-700 text-lg'>
                <h2 className='font-semibold'>
                    Price
                    {error &&
                        <span className='text-red-500 text-sm ml-2'>Please provide a price</span>
                    }
                </h2>

                <span className='capitalize mr-1'>$ </span>
                <input
                    min={1.00}
                    step={0.01}
                    type="number"
                    className=' px-2 w-[80px] ring-2 focus:outline-none ring-neutral-400'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

            </div>


        </>
    )
}
const Description = ({ description, setDescription }) => {
    return (
        <>
            <div className='mb-5 text-neutral-700 text-lg '>
                <h2 className='font-semibold r'>
                    Description
                </h2>
                <textarea
                    className='text-lg p-2 w-full focus:outline-none h-max rounded-sm ring-2 ring-neutral-400'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

            </div>
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
                className='w-max px-2 ring-neutral-400 capitalize ring-2 rounded-sm'
                value={input}
                onChange={handleInputChange}
            />
            <MdClose onClick={handleRemoveItem} className='cursor-pointer inline-block ml-2' />
        </div>

    )
}
const Ingredients = ({ ingredientsRef, error }) => {
    const [allInputs, setAllInputs] = useState([])

    return (
        <>

            <div className='mb-5 text-neutral-700 text-lg '>

                <h2 className='font-semibold r'>
                    Ingredients
                    {error &&
                        <span className='text-red-500 text-sm ml-2'>Please provide ingredients</span>
                    }
                </h2>
                <div className='flex flex-col space-y-2 w-max'>
                    <ul ref={ingredientsRef} className='flex flex-col space-y-2 w-max'>
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
                    <button type="button" onClick={() => setAllInputs([...allInputs, ''])} className='w-full px-5 ring-2 ring-neutral-300 rounded-sm'>
                        <BsPlusCircle className='inline-block mb-0.5 mr-0.5' /> Add
                    </button>
                </div>

            </div>


        </>
    )
}
const Macros = ({ nutrition, setNutrition }) => {
    const { calories, protein, carbs, fats } = nutrition
    function handleInputChange(e) {
        const key = e.target.name
        const _ = { ...nutrition }
        _[key] = e.target.value
        setNutrition({ ..._ })
    }


    return (
        <>

            <form className='mb-5 text-neutral-700 text-lg '>

                <div className='flex'>
                    <h2 className='font-semibold r'>
                        Macros
                    </h2>

                </div>

                <div className='flex flex-col space-y-2'>

                    {/* Calories */}
                    <div>
                        <span className=''>Calories: </span>
                        <input
                            step={1}
                            min={1}
                            name="calories"
                            className='w-[80px] px-2 focus:outline-none ring-2 ring-neutral-400  rounded-sm'
                            type="number"
                            value={calories}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Protein */}
                    <div>
                        <span className=''>Protein: </span>
                        <input
                            step={1}
                            min={1}
                            name="protein"
                            className='w-[65px] px-2 focus:outline-none ring-2 ring-neutral-400  rounded-sm'
                            type="number"
                            value={protein}
                            onChange={handleInputChange}
                        />
                        <span className='ml-1'>g</span>
                    </div>

                    {/* Carbs */}
                    <div>
                        <span className=''>Carbs: </span>
                        <input
                            step={1}
                            min={1}
                            name="carbs"
                            className='w-[65px] px-2 focus:outline-none ring-2 ring-neutral-400  rounded-sm'
                            type="number"
                            value={carbs}
                            onChange={handleInputChange}
                        />
                        <span className='ml-1'>g</span>
                    </div>

                    {/* Fats */}
                    <div>
                        <span className=''>Fats: </span>
                        <input
                            step={1}
                            min={1}
                            name="fats"
                            className='w-[65px] px-2 focus:outline-none ring-2 ring-neutral-400  rounded-sm'
                            type="number"
                            value={fats}
                            onChange={handleInputChange}
                        />
                        <span className='ml-1'>g</span>
                    </div>

                </div>

            </form>


        </>
    )
}
const Img = ({ setImg }) => {
    const [display, setDisplay] = useState(null)

    async function handleFileOnChange(e) {
        if (e.target.files && e.target.files[0]) {
            let img = URL.createObjectURL(e.target.files[0]);
            setDisplay(img)
            setImg(e.target.files[0])
        }
    }
    return (

        <div className='relative max-w-[400px] max-h-[400px] min-w-[300px] min-h-[300px] lg:max-w-[300px] lg:max-h-[300px] lg:min-w-[500px] lg:min-h-[500px] bg-transparent flex justify-center items-center'>


            {display
                ? <img src={display} alt={display} className='w-full h-full object-center object-cover rounded-xl overflow-hidden ' />
                : <span className='bg-neutral-400 lg:w-[500px] lg:h-[500px] w-full h-full min-w-[300px] min-h-[300px] flex justify-center items-center rounded-lg' >

                </span>
            }



            <div style={fileInputStyles} className='absolute top-[50%] -translate-y-[50%]'>
                <label className="custom-file-upload text-neutral-700">
                    <input
                        type="file"
                        name='image'
                        onChange={handleFileOnChange}
                    />
                    <MdOutlineFileUpload className='inline-block mb-0.5 text-xl' /> Upload
                </label>
            </div>






        </div>
    )
}
const SaveButton = ({ handleFormSubmit }) => {
    return (
        <div className='absolute top-4 right-5 '>
            <button onClick={handleFormSubmit} className='h-[45px] text-lg text-neutral-500 flex space-x-2 items-center border-2 border-neutral-400 rounded-xl px-4 py-1 hover:bg-neutral-400 hover:text-white transition-all duration-200 ease-in-out'>
                <MdSave />
                <span className='hidden lg:inline-block'>Save Meal</span>
            </button>
        </div>
    )
}

function AddMeal() {
    const { token } = useSelector(state => state.admin)
    const [name, setName] = useState('')
    const [img, setImg] = useState(null)
    const [price, setPrice] = useState(0)
    const [type, setType] = useState('lunch')
    const [description, setDescription] = useState('')
    const [nutrition, setNutrition] = useState({ calories: 1, protein: 1, carbs: 1, fats: 1 })
    const ingredientsRef = React.useRef(null)
    const [errors, setErrors] = useState({ name: false, price: false, ingredients: false })
    const navigate = useNavigate()

    function validateForm() {
        let formErrors = { ...errors }
        let ready = false
        if (name === '') {
            formErrors.name = true
        } else {
            formErrors.name = false
        }

        if (price === 0 || price === '' || price === null) {
            formErrors.price = true
        } else {
            formErrors.price = false
        }

        const ingredients = []
        ingredientsRef.current.childNodes.forEach((item) => {
            if (item.childNodes[0].value !== "") {
                ingredients.push(item.childNodes[0].value)
            }
        })

        if (ingredients.length === 0) {
            formErrors.ingredients = true
        } else {
            formErrors.ingredients = false
        }

        setErrors({ ...formErrors })

        ready = Object.values(formErrors).every((item) => item === false)

        return ready
    }
    async function handleFormSubmit(e) {
        e.preventDefault()

        const ready = validateForm()
        if (ready) {
            const ingredients = []
            ingredientsRef.current.childNodes.forEach((item) => {
                if (item.childNodes[0].value !== "") {
                    ingredients.push(item.childNodes[0].value)
                }
            })

            const fileExt = img.name.split('.')[1]
            const filename = new Date().toISOString().replace(/:/g, '-') + '_' + replaceSpaces(name) + '.' + fileExt


            // Upload Image to Firebase
            uploadImage(img, filename)

            const body = {
                name,
                price,
                type,
                description,
                nutrition: { ...nutrition },
                ingredients: [...ingredients],
                img: filename
            }

            // Add to MongoDB
            const res = await post_AddMeal(token, body)

            if (res) {
                navigate('/admin')
            }

        }


    }

    return (
        <div className='pt-[10rem] px-10 lg:px-20 pb-20'>
            <div className='bg-white rounded-xl p-5 drop-shadow-xl relative'>

                <Name
                    setName={setName}
                    name={name}
                    error={errors.name}
                />
                <SaveButton
                    handleFormSubmit={handleFormSubmit}
                />


                <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-5'>
                    <Img
                        img={img}
                        setImg={setImg}
                    />
                    <div className='flex flex-col space-y-5 w-full'>

                        <Price
                            price={price}
                            setPrice={setPrice}
                            error={errors.price}
                        />
                        <Type
                            type={type}
                            setType={setType}
                        />
                        <Description
                            description={description}
                            setDescription={setDescription}
                        />
                        <Ingredients
                            ingredientsRef={ingredientsRef}
                            error={errors.ingredients}
                        />
                        <Macros
                            setNutrition={setNutrition}
                            nutrition={nutrition}
                        />

                    </div>
                </div>


            </div>
        </div>
    )
}

export default AddMeal