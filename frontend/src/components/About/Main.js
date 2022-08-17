import Myself from '../../images/about/myself.jpg'

function Main() {
    return (
        <div className='bg-neutral-100 px-5 sm:px-20 overflow-hidden flex justify-center'>
            <div className='flex flex-col rounded-xl pt-10 w-full sm:max-w-[100rem]   sm:flex-row'>

                {/* Image */}
                <div className=' text-white font-semibold text-3xl border-[15px] border-white  h-[600px] w-full sm:max-w-xl  flex items-center justify-center bg-yellow-400 drop-shadow-xl z-20 sm:min-w-[500px] sm:min-h-[800px] sm:max-h-[800px]'>
                    <img src={Myself} alt='myself' className='object-cover' />
                </div>


                {/* Content */}
                <div className=' flex flex-col space-y-6 justify-center p-10 sm:p-20 sm:w-[65%]'>
                    <h2 className='font-bold text-2xl sm:text-5xl mb-3 sm:mb-6'>
                        A Different Kind of Supplement Company.
                    </h2>

                    <div className='flex flex-col space-y-2'>
                        <h3 className='font-bold text-xl'>
                            We take pride in putting our customers first!
                        </h3>

                        <p className='text-lg'>
                            That means providing products that are of the highest
                            quality & ensuring that every step of the way the customer
                            experience is 5 Stars!
                        </p>
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <h3 className='font-bold text-xl'>
                            Anabar | The Protein Bar that changed that game.
                        </h3>
                        <p className='text-lg'>
                            The Anabar was launched on March 19th of 2021 & quickly became
                            the hottest bar on the market! Before launch we knew we really
                            had something special & a true industry first in the protein bar
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
    )
}

export default Main