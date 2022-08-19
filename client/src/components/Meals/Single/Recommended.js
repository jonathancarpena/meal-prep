import React, { useCallback, useRef } from 'react'

// Router
import { useNavigate } from 'react-router-dom';

// Utils
import { replaceSpaces } from '../../../lib/utils'

// Import Swiper React components
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Icons
import { GiCookingPot } from 'react-icons/gi'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

// Components
import Image from '../../Image';

function Recommended({ similarMeals }) {
    const navigate = useNavigate()
    const sliderRef = useRef(null);
    // window.scrollTo(0, 0)

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);



    function handleNavigate(link) {
        navigate(link)
        window.location.reload(false);
    }
    return (
        <div>
            <h1 className='font-bold text-3xl text-center text-neutral-700'>
                You May Also Like
            </h1>

            <div className='hidden lg:block relative mt-[2rem] bg-white rounded-2xl p-10'>
                <Swiper
                    ref={sliderRef}
                    slidesPerView={4}
                    loop={true}
                    spaceBetween={50}
                    className={`w-[80%] rounded-2xl p-10`}
                >
                    {similarMeals.map((item, idx) => (
                        <SwiperSlide key={`Meal-${idx}`} onClick={() => handleNavigate(`/meals/${replaceSpaces(item.name)}/${item._id}`)} className='cursor-pointer flex flex-col justify-center items-center '>
                            <div className='w-[200px] h-[200px] bg-neutral-200 flex items-center justify-center rounded-xl'>
                                {item.img
                                    ? <Image src={item.img} alt={item.name} className='w-full h-full object-center object-cover rounded-lg' />
                                    : <GiCookingPot className='w-[80%] h-[80%]  text-white' />
                                }
                            </div>
                            <p className='text-lg text-center font-semibold text-neutral-700 uppercase'>
                                {item.name}
                            </p>


                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Arrows */}
                <span className='absolute top-[50%] -translate-y-[50%] left-10 cursor-pointer'>
                    <GoChevronLeft className='text-yellow-500 text-5xl' onClick={handlePrev} />
                </span>
                <span className='absolute top-[50%] -translate-y-[50%] right-10 cursor-pointer'>
                    <GoChevronRight className='text-yellow-500 text-5xl' onClick={handleNext} />
                </span>
            </div>

            {/* Mobile Swiper */}
            <div className='lg:hidden relative mt-[2rem]   rounded-2xl mb-10'>
                <Swiper
                    slidesPerView={1}
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    loop={true}
                    className={` sm:hidden  bg-white rounded-2xl `}
                >

                    {similarMeals.map((item, idx) => (
                        <SwiperSlide key={`Meal-${idx}`} onClick={() => handleNavigate(`/meals/${replaceSpaces(item.name)}/${item._id}`)} className='mb-12 pt-10  cursor-pointer flex flex-col justify-center items-center '>

                            <div className='w-[200px] h-[200px] bg-neutral-200 flex items-center justify-center rounded-xl'>
                                {item.img
                                    ? <Image src={item.img} alt={item.name} className='w-full h-full object-center object-cover rounded-lg' />
                                    : <GiCookingPot className='w-[80%] h-[80%]  text-white' />
                                }
                            </div>
                            <p className='text-lg text-center font-semibold text-neutral-700 uppercase'>
                                {item.name}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>


            </div>

        </div>
    )
}

export default Recommended