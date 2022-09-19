import Myself from '../../images/about/myself.jpg';

function Main() {
  return (
    <div className='bg-neutral-100 px-5 lg:px-20 overflow-hidden flex justify-center'>
      <div className='flex flex-col rounded-xl pt-10 w-full items-center lg:max-w-[100rem]   lg:flex-row'>
        {/* Image */}
        <div className=' text-white font-semibold text-3xl border-[15px] border-white  h-[600px] md:w-[400px] md:h-[700px] w-full lg:max-w-xl  flex items-center justify-center bg-yellow-400 drop-shadow-xl z-20 lg:min-w-[500px] lg:min-h-[800px] lg:max-h-[800px]'>
          <img src={Myself} alt='myself' className='object-cover' />
        </div>

        {/* Content */}
        <div className=' flex flex-col space-y-6 justify-center py-10  md:px-5 lg:p-20 lg:w-[65%]'>
          <h2 className='font-bold text-2xl lg:text-5xl mb-3 lg:mb-6'>
            All your Macro-Friendly Meals right here.
          </h2>

          <div className='flex flex-col space-y-2'>
            <h3 className='font-bold text-xl'>
              We take pride in putting our customers first!
            </h3>

            <p className='text-lg'>
              That means providing meals that are of the highest quality &
              ensuring that every spoonful bite the customer experiences is 5
              Stars!
            </p>
          </div>

          <div className='flex flex-col space-y-2'>
            <h3 className='font-bold text-xl'>
              Anabar | The Protein Bar that changed that game.
            </h3>
            <p className='text-lg'>
              The Anabar was launched on March 19th of 2021 & quickly became the
              hottest bar on the market! Before launch we knew we really had
              something special & a true industry first in the protein bar
              space. After selling out multiple launches in a row we realized we
              had something truly special on our hands. We now employ a full
              staff dedicated to making sure every bar you buy is of the highest
              quality & every order you place is packaged & to you as fast as
              humanly possible. We promise you this bar is worth the wait!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
