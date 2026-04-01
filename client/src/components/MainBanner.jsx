import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt='banner' className='w-full hidden md:block rounded-md max-h-[420px] object-cover' />
      <img src={assets.main_banner_bg_sm} alt='banner' className='w-full md:hidden rounded-md max-h-[320px] object-cover' />

      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end
          md:justify-center pb-8 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left
          max-w-64 md:max-w-72 lg:max-w-96 leading-snug lg:leading-tight'
        >Love the Freshness, Live the Savings</h1>

        <div className='flex items-center mt-4 font-medium'>
          <Link to={"/products"} className='group flex items-center gap-2 px-6 md:px-8 py-2.5 bg-primary
          hover:bg-primary-dull transition rounded text-white cursor-pointer text-sm'>
            Shop Now
            <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
          </Link>

          <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-8 py-2.5 cursor-pointer text-sm'>
            Explore deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner