import React from 'react'

// Icons
import { FaLeaf, FaSpinner } from 'react-icons/fa'
import { MdRedo } from 'react-icons/md'


function Brand({ isDarkBg = false, onClick = null, sx }) {

    return (
        <div onClick={() => onClick()} className={`w-[170px] h-[85px] flex justify-center items-center cursor-pointer ${sx}`}>
            <div className={`flex justify-center items-center relative w-[100px] border-8 border-primary-400 mx-auto`}>
                <h1 className={`${isDarkBg ? 'text-white' : 'text-neutral-700'} font-bold text-4xl tracking-tighter  z-[20] `}>
                    MealFresh
                </h1>
                <FaLeaf className={`absolute -right-8 bottom-0 text-[4rem] text-yellow-500`} />
            </div>
        </div>

    )
}

export default Brand