import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../../../../admin/src/App'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = ({token}) => {
  const [list,setlist]=useState([])
  const fetchlist = async()=>{
   try {
    const res = await axios.get(backendUrl+'/api/product/list')
    if (res.data.success) {
      setlist(res.data.products)
      
    }else{
      toast.error(res.data.message)
    }
    
   } catch (error) { 
    console.log(error);
    toast.error(error.message)
    
    
   }
  }
  const removeproduct=async(id)=>{
      try {
        const res = await axios.post(backendUrl+'/api/product/delete',{id},{headers:{token}})
        if (res.data.success) {
          toast.success(res.data.message)
          await fetchlist()
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
  }
  useEffect(()=>{
      fetchlist()
  },[])
  return (
    <>
    <p className='mb-2'>All Products List</p>
     <div className='flex flex-col gap-2'>
       <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
       </div>
       {
        list.map((item,index)=>(
         <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
          <img className='w-12' src={item.image[0]} alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <p onClick={()=>removeproduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
         </div>
        ))
       }
     </div>
 
    </>
  )
}

export default List