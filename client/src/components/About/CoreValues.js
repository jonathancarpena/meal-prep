import React from 'react';

// Images
import Accent from '../../images/about/core-values-accent.png';

// Icons
import { BsFillStarFill } from 'react-icons/bs';
import { GiFireBowl } from 'react-icons/gi';
import { RiUserSmileLine } from 'react-icons/ri';

function CoreValues() {
  const CoreValueContent = [
    {
      text: 'quality ingredients',
      img: (
        <BsFillStarFill className='text-[3.5rem] md:text-[4rem] lg:text-[5rem]' />
      ),
    },
    {
      text: 'great tasting flavor',
      img: (
        <GiFireBowl className='text-[3.5rem] md:text-[4rem] lg:text-[5rem]' />
      ),
    },
    {
      text: '100% customer satisfaction',
      img: (
        <RiUserSmileLine className='text-[3.5rem] md:text-[4rem] lg:text-[5rem]' />
      ),
    },
  ];
  return (
    <div className='bg-[#333333]'>
      <div className='bg-[#333333] relative lg:bottom-14 pt-[6rem] pb-14 rounded-t-[3rem] lg:px-20'>
        <h1 className='text-center text-white uppercase text-4xl sm:text-5xl  font-extrabold'>
          Meal Prep Core Values
        </h1>

        <ul className='flex flex-col space-y-10 items-center justify-evenly w-full mt-16 sm:flex-row sm:space-y-0'>
          {CoreValueContent.map((item) => (
            <li
              key={item.text}
              className='flex flex-col space-y-5 items-center justify-center w-[170px] sm:w-[200px]'>
              <div className='relative bg-white p-6 rounded-full drop-shadow-xl '>
                <span className='text-yellow-500 '>{item.img}</span>

                <div className='absolute rotate-[45deg] w-[50px]  invert brightness-[1] -top-4 -right-6 sm:-top-6 sm:-right-10 sm:w-[70px]'>
                  <img src={Accent} alt={Accent} />
                </div>
              </div>
              <span className='w-max max-w-[300px] capitalize text-white font-bold text-xl sm:text-2xl text-center'>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CoreValues;
