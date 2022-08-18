import React, { useRef, useCallback } from 'react'


// Import Swiper React components
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Icons
import { ImQuotesRight } from 'react-icons/im'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'



function Reviews() {
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const ReviewsContent = [
        {
            author: 'John K.',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Et nam veritatis soluta saepe odit voluptatibus. Eos non ratione 
            pariatur dolorum nihil quo. Inventore ratione sint accusamus impedit 
            amet aliquid vel.
            `
        },
        {
            author: 'Veronica G.',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Et nam veritatis soluta saepe odit voluptatibus. Eos non ratione 
            pariatur dolorum nihil quo. Inventore ratione sint accusamus impedit 
            amet aliquid vel.
            `
        },
        {
            author: 'Adam S.',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Et nam veritatis soluta saepe odit voluptatibus. Eos non ratione 
            pariatur dolorum nihil quo. Inventore ratione sint accusamus impedit 
            amet aliquid vel.
            `
        },
    ]
    return (
        <div className='py-32 bg-[#333333] rounded-2xl'>

            {/* Header */}
            <h2 className=' text-white text-5xl tracking-tight font-bold text-center uppercase lg:mb-10 lg:text-7xl '>
                See What People are saying<span className='text-yellow-500'>.</span>
            </h2>

            {/* Reviews */}
            <div className='max-w-[1000px] relative mx-auto mt-16'>
                <Swiper
                    ref={sliderRef}
                    slidesPerView={1}
                    loop={true}
                    className={`hidden  w-[80%] rounded-2xl sm:block `}
                >
                    {ReviewsContent.map((item, idx) => (
                        <SwiperSlide key={`Review-${idx}`} className='flex flex-col space-y-5 items-center w-[200px] bg-white p-5'>
                            <ImQuotesRight className="text-yellow-500 text-[3rem]" />
                            <p className='w-[90%] text-center'>{item.content}</p>
                            <span className='font-bold text-2xl uppercase'>{item.author}</span>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Arrows */}
                <span className='hidden sm:inline-block absolute top-[50%] -translate-y-[50%] left-10 cursor-pointer'>
                    <GoChevronLeft className='   text-yellow-500 text-5xl' onClick={handlePrev} />
                </span>
                <span className='hidden sm:inline-block absolute top-[50%] -translate-y-[50%] right-10 cursor-pointer'>
                    <GoChevronRight className=' text-yellow-500 text-5xl' onClick={handleNext} />
                </span>
            </div>

            {/* Mobile Reviews */}
            <Swiper
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                loop={true}
                className={` sm:hidden w-[80%]  bg-white rounded-2xl`}
            >
                {ReviewsContent.map((item, idx) => (
                    <SwiperSlide key={`Review-${idx}`} className='mb-12  flex flex-col space-y-5 items-center w-[200px] bg-white p-5'>
                        <ImQuotesRight className="text-yellow-500 text-[3rem]" />
                        <p className='w-[90%] text-center'>{item.content}</p>
                        <span className='font-bold text-2xl uppercase'>{item.author}</span>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>

    )
}

export default Reviews