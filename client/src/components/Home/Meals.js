import React, { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// Images
import meal1 from '../../images/home/meals-sample-1.jpg';
import meal2 from '../../images/home/meals-sample-2.jpg';
import meal3 from '../../images/home/meals-sample-3.jpg';

// Icons
import { BsInfoCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

function Card({ item }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className='w-full relative'>
      <img alt={item.text} src={item.img} className='object-cover' />
      <button
        onClick={() => setShowInfo(!showInfo)}
        className='bg-yellow-400 p-2 rounded-lg transition-all ease-in-out duration-200 absolute top-5 right-5 z-[50]  text-white hover:text-bg-yellow-500 hover:scale-110 active:scale-90 drop-shadow-md'>
        <BsInfoCircleFill className='text-[1.5rem]' />
      </button>
      <div
        className={`${showInfo ? 'translate-y-0' : 'translate-y-full'
          } select-none flex flex-col justify-evenly transition-all ease-in-out duration-200 bg-white opacity-90 h-[50%] p-8 md:p-10 bottom-0 w-full absolute`}>
        <h3 className='text-lg lg:text-xl font-bold lg:mb-4'>
          {item.info.name}
        </h3>
        <ul>
          <li className='lg:text-lg'>Calories: {item.info.cal} cals</li>
          <li className='lg:text-lg'>Protein: {item.info.protein}g</li>
          <li className='lg:text-lg'>Carbs: {item.info.carbs}g</li>
          <li className='lg:text-lg'>Fats: {item.info.fats}g</li>
        </ul>

        <button
          onClick={() => setShowInfo(false)}
          className='active:scale-90 transition-all ease-in-out duration-200 bg-neutral-200 px-2 rounded-lg absolute top-4 right-4 md:top-6 md:right-6 flex space-x-1 items-center'>
          <MdClose />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
}
function Meals() {
  const MealsContent = [
    {
      text: 'Lunch',
      img: meal1,
      info: {
        name: 'Katsu Chicken Curry',
        cal: 500,
        protein: 20,
        carbs: 53,
        fats: 23,
      },
    },
    {
      text: 'Breakfast',
      img: meal2,
      info: {
        name: 'Powerful Oats',
        cal: 480,
        protein: 18,
        carbs: 41,
        fats: 18,
      },
    },
    {
      text: 'Dinner',
      img: meal3,
      info: {
        name: 'Pesto Chicken Pasta',
        cal: 500,
        protein: 20,
        carbs: 50,
        fats: 20,
      },
    },
  ];

  return (
    <div className='bg-neutral-100 px-10 py-24 z-[30] flex flex-col md:flex-row-reverse md:px-5 lg:px-20 justify-around items-center'>
      {/* Header */}
      <div className='flex flex-col justify-around mb-12 md:mb-0 md:w-[45%]'>
        <h2 className=' text-5xl tracking-tight font-bold text-center uppercase lg:mb-10 lg:text-7xl '>
          THE Meals<span className='text-yellow-500'>.</span>
        </h2>

        {/* Sub Header */}
        <p className='text-center text-base lg:text-3xl mt-5 text-neutral-700 '>
          {`Our dishes are tailored to balance the right amount of flavor and the optimal amount of macronutrients. Order as many meals as you need to supplement your next week.`}
        </p>
      </div>

      {/* Content */}
      <div className='w-[380px] md:w-[400px] lg:w-[500px]'>
        <Swiper
          slidesPerView={1}
          modules={[Autoplay]}
          className=' rounded-xl overflow-hidden drop-shadow-xl cursor-grab active:cursor-grabbing'
          autoplay={{
            delay: 3,
            disableOnInteraction: true,
          }}
          freeMode={true}
          loop={true}
          speed={5000}>
          {MealsContent.map((item) => (
            <SwiperSlide
              key={item.text}
              className=' w-full relative mb-5   flex items-center justify-center rounded-xl overflow-hidden'>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Meals;
