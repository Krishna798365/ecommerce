import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const Navbar = () => {
  const [visible,setVisible] = useState(false)
  const {setshowSearch,getcartcount,navigate,token,settoken , setcartitems , adminurl} = useContext(ShopContext);
 const logout=()=>{
  navigate('/login')
  localStorage.removeItem('token')
  settoken('')
  setcartitems({})
  
}

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
     <Link to={'/'}><img src={assets.logo2} alt="Logo" className='w-50' /></Link>
     <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
      <NavLink to ='/' className='flex flex-col items-center gap-1'>
        <p>HOME</p>
        <hr className='w-2/4 border-t-2 border-gray-700 hidden'/>
      </NavLink>
      <NavLink to ='/collection' className='flex flex-col items-center gap-1'>
        <p>COLLECTION</p>
        <hr className='w-2/4 border-t-2 border-gray-700 hidden'/>
      </NavLink>
      <NavLink to ='/about' className='flex flex-col items-center gap-1'>
        <p>ABOUT</p>
        <hr className='w-2/4 border-t-2 border-gray-700 hidden'/>
      </NavLink>
      <NavLink to ='/contact' className='flex flex-col items-center gap-1'>
        <p>CONTACT</p>
        <hr className='w-2/4 border-t-2 border-gray-700 hidden'/>
      </NavLink>

     </ul>
     <div className='flex items-center gap-6'>
      <img onClick={()=> setshowSearch(true)}src={assets.search_icon} alt="" className='w-5 cursor-pointer'/>
      <div className='relative group'>
      
       <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt=''/>
        {token &&
         <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
          <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
            <NavLink to='/myprofile' className='cursor-pointer hover:text-black'>My Profile</NavLink>
            <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
          </div>
          </div>
          }
       
        
      </div>
      <Link to ='/cart' className='relative'>
      <img src={assets.cart_icon} className='w-5 min-w-5' alt=''/>
      <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-8px]'>{getcartcount()}</p>
      </Link>
     
        <img onClick={()=> setVisible(true)}src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''/>
      
      {/*sidebar menu for small screen */}
     <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-[1/2]' : 'w-0'}`}>
        <div  className='flex flex-col text-gray-700'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180'  alt=""/>
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/collection'>Collections</NavLink>
          <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/about'>About</NavLink>
          <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
     
        </div>
     </div>
     </div>
    </div>
  )
}

export default Navbar