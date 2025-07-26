import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt40 text-sm'>
        <div>
          <img src={assets.logo2} className='mb-5 w-50' alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis labore sapiente dolorem illum, quidem excepturi soluta, repellendus error omnis eos tempore vitae? Eos ad, error distinctio quo rem voluptatibus dolore.
          </p>
        </div>
        <div>
          <p className='text-xl font-medium mb-r'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <NavLink to ='/'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</NavLink>
            <NavLink  to ='/about'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About Us</NavLink >
            <NavLink to ='/orders'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >Orders</NavLink >
            <NavLink  to ='/contact'  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact</NavLink >

          </ul>
        </div>
        <div>
          <p className='text-xl font-meadium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>Contact@StyleCartel.com</li>
          </ul>
        </div>
        <div >
          <hr/>
          <p className='py-5 text-sm text-center'>Copyright 2024@ StyleCartel.com-All Right Reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
