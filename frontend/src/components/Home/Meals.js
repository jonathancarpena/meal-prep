import React, { useState, useEffect } from 'react'


// Images
import Accent from '../../images/home/meals-accent.png'


// Icons
import { GiHotMeal } from 'react-icons/gi'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';


const Card = ({ img, info, footer }) => {
    const [flip, setFlip] = useState(false)
    return (
        <>
            <div
                onClick={() => setFlip(!flip)}
                className="w-[300px] min-h-[300px] bg-transparent cursor-pointer group perspective"
            >
                <div
                    className={`relative preserve-3d ${flip ? 'my-rotate-y-180' : ''}  w-full h-full duration-1000`}
                >

                    {/* Front Card */}
                    <div className='backface-hidden absolute w-full h-max rounded-xl overflow-hidden'>

                        {/* Card Image */}
                        <div className='bg-neutral-200 h-[250px] flex justify-center items-center '>
                            {img
                                ? <img src={img} alt={img} />
                                : <GiHotMeal className='text-secondary text-[7rem]' />
                            }

                        </div>
                        {/* Card Footer */}
                        <div className='bg-white py-5 px-4'>
                            <p className='text-2xl text-neutral-700 font-bold uppercase text-center'>{footer}</p>
                        </div>
                    </div>

                    {/* Back Card */}
                    <div className="absolute my-rotate-y-180 backface-hidden w-full h-max rounded-xl overflow-hidden"
                    >
                        {/* Card Image */}
                        <div className='bg-neutral-200 h-[250px] flex flex-col space-y-2 justify-center items-center'>
                            <span className='text-lg font-bold uppercase'>
                                {info.name}
                            </span>
                            <div>
                                <p>Total Cals: {info.cal}cals</p>
                                <p>Protein: {info.protein}g</p>
                                <p>Carbs: {info.carbs}g</p>
                                <p>Fats: {info.fats}g</p>
                            </div>
                        </div>
                        {/* Card Footer */}
                        <div className='bg-white py-5 px-4'>
                            <p className='text-2xl text-neutral-700 font-bold uppercase text-center'>{footer}</p>
                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}

function Meals() {
    const MealsContent = [
        {
            text: "Breakfast",
            img: '',
            info: {
                name: 'Super French Toast',
                cal: 256,
                protein: 43,
                carbs: 23,
                fats: 10
            }

        },
        {
            text: "Lunch",
            img: '',
            info: {
                name: 'Anabolic Pesto Pasta',
                cal: 256,
                protein: 43,
                carbs: 23,
                fats: 10
            }

        },
        {
            text: "Dinner",
            img: '',
            info: {
                name: 'Creamy Chicken w/ Spinach',
                cal: 256,
                protein: 43,
                carbs: 23,
                fats: 10
            }
        },
    ]


    return (
        <div className='bg-yellow-400 px-12 py-24 z-[30]'>

            {/* Header */}
            <div>
                <h1 className='text-5xl font-semibold text-center uppercase text-white'>
                    Our Meals
                </h1>

                {/* Sub Header */}
                <p className='text-center mt-5 text-neutral-700 sm:mx-48'>
                    Our dishes are tailored to meet individual dietary needs. Order á la carte or opt for a meal plan. We offer Chef’s Choice, pre-chosen meal plans or Your Choice, fully customizable meal plans.
                </p>
            </div>



            {/* Accent */}
            <div className='absolute -top-20 right-10 brightness-[1] grayscale rotate-180'>
                <img src={Accent} width={100} height={200} />
            </div>


            {/* Content */}
            <ul className='hidden sm:visible  sm:flex sm:w-[90%] sm:mx-auto sm:justify-evenly sm:mt-8'>
                {MealsContent.map((item) => (
                    <li key={item.text} className='hover:drop-shadow-xl hover:scale-110 transition-all duration-200 ease-in-out  drop-shadow-sm  w-[25%]'>
                        <Card info={item.info} footer={item.text} />
                    </li>
                ))}
            </ul>


            {/* Mobile Swiper */}
            <Swiper
                slidesPerView={1}
                modules={[Scrollbar]}
                scrollbar={{ draggable: true }}
                className='sm:hidden'
            >
                {MealsContent.map((item) => (
                    <SwiperSlide key={item.text} className='py-10 mb-10  flex items-center justify-center '>
                        <Card info={item.info} footer={item.text} />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default Meals