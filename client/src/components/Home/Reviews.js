import React, { useRef, useCallback } from 'react';

// Import Swiper React components
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Icons
import { ImQuotesRight } from 'react-icons/im';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

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
      author: 'Amara A.',
      content: `I've been obsessed with this small business lately!! My partner and I ordered the 
      garlic parmesan wings and super french toast through their website and received on the time I 
      reserved. The food came fresh and hot! I still can't believe that the meals were ordered were 
      under 500 calories.
`,
    },
    {
      author: 'Sebastian L.',
      content: `BELIEVE the hype!! Food was so so good, favorite dish was by far the 
      pad thai and the tocino silog. It was cooked to perfection, the sweetness from the meat, 
      the savoriness from the garlic rice AND the fried egg on top, perfect pair! 
      The pad thai as well and it was very delicious and considering the amount that Nathan provides is a plus.
        `,
    },
    {
      author: 'Lydia K.',
      content: `My husband got the chicken pesto pasta and I got the chicken adobo. 10/10 would recommend to 
      anyone that is interested in eating food that is delicious and macro-friendly. I appreciate that 
      Nathan provides the macros for us when we track.
            `,
    },
    {
      author: 'Charles C.',
      content: `On a diet? Have no time to cook? Look no further this small business is here! I know Nathan 
      personally and he strives to balance the food's deliciousness and the macronutrients. I've been a loyal 
      customer of his and since I placed my first order I have not stop. I have lost over 20 pounds just eating 
      his meal preps alone. 
            `,
    },
  ];
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
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 1,
            disableOnInteraction: true,
          }}
          loop={true}
          speed={5000}
          className={`hidden  w-[80%] md:w-[75%] rounded-2xl sm:block `}>
          {ReviewsContent.map((item, idx) => (
            <SwiperSlide
              key={`Review-${idx}`}
              className='cursor-grab active:cursor-grabbing min-h-[400px] flex flex-col space-y-5 justify-between items-center w-[200px] bg-white p-5'>
              <ImQuotesRight className='text-yellow-500 text-[3rem]' />
              <p className='w-[90%] text-center'>{item.content}</p>
              <span className='font-bold text-2xl uppercase'>
                {item.author}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <span className='hidden sm:inline-block absolute top-[50%] -translate-y-[50%] left-10 cursor-pointer'>
          <GoChevronLeft
            className='   text-yellow-500 text-5xl'
            onClick={handlePrev}
          />
        </span>
        <span className='hidden sm:inline-block absolute top-[50%] -translate-y-[50%] right-10 cursor-pointer'>
          <GoChevronRight
            className=' text-yellow-500 text-5xl'
            onClick={handleNext}
          />
        </span>
      </div>

      {/* Mobile Reviews */}
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 1,
          disableOnInteraction: true,
        }}
        loop={true}
        speed={5000}
        pagination={{ clickable: true }}

        className={` sm:hidden w-[80%]  bg-white rounded-2xl`}>
        {ReviewsContent.map((item, idx) => (
          <SwiperSlide
            key={`Review-${idx}`}
            className='mb-12  flex flex-col space-y-5 justify-between items-center w-[200px] bg-white p-5'>
            <ImQuotesRight className='text-yellow-500 text-[3rem]' />
            <p className='w-[90%] text-center'>{item.content}</p>
            <span className='font-bold text-2xl uppercase'>{item.author}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Reviews;
