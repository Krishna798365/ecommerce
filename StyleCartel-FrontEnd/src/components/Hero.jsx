import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex item-center gap-2'>
            <p className='mt-2 w-8 md:11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>Our BestSellers</p>
          </div>
          <h1 className='prata-regular tex-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2 mt-4'>
            <button
              className='font-semibold text-sm md:text-base bg-black text-white px-10 py-4 cursor-pointer'
              onClick={() => navigate('/collection')} // 👈 Go to /shop route
            >
              SHOP NOW
            </button>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img src={assets.hero_img} className='w-full sm:w-1/2' alt='Hero' />
    </div>
  );
}

export default Hero;