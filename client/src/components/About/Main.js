import Myself from '../../images/about/myself.jpg';

function Main() {
  return (
    <div className='bg-neutral-100 px-5 lg:px-20 overflow-hidden flex justify-center'>
      <div className='flex flex-col rounded-xl pt-10 w-full items-center lg:max-w-[100rem]   lg:flex-row'>
        {/* Image */}
        <div className=' text-white font-semibold text-3xl border-[15px] border-white  h-[600px] md:w-[400px] md:h-[700px] w-full lg:max-w-xl  flex items-center justify-center bg-yellow-400 drop-shadow-xl z-20 lg:min-w-[500px] lg:min-h-[800px] lg:max-h-[800px]'>
          <img src={Myself} alt='myself' width="100%" height="100%" className='object-cover w-full h-full' />
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
              ensuring that every spoonful bite the customer experiences is amazing!
            </p>
          </div>

          <div className='flex flex-col space-y-2'>
            <h3 className='font-bold text-xl'>
              The Backstory Behind the Business
            </h3>
            <p className='text-lg'>
              {`Nathan's Meal Prep was launched on March 19th of 2020. At the start of 
              COVID-19 pandemic with gyms closed and people quarantining at home, I 
              wondered how were people going to stay in shape. As we all decided to make do 
              with what we had, our bodies needed the right nutrients to continue our 
              body building journey. A combination of staying fit while people were at home 
              inspired me to create a delivery/pickup meal prep business. So I began and experimented with 
              many various recipes while keeping the meals under 500 calories and adjusting 
              the meals to meet a high protein macronutrient profile. I want to ensure that my meals
              will bring customer's 100% satisfaction.
              `}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
