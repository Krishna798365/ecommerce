import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import Reset from "../pages/Reset";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";

const ShopContext = createContext();
const ShopContextProvider = (props)=>{
    const currency ='$';
    const delivery_fee= 10;
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const adminurl = import.meta.env.VITE_ADMIN_FRONTEND_URL
    const [products,setproducts] = useState([]);
    const [search,setsearch] = useState('');
    const [showSearch,setshowSearch]=useState(false);
    const [cartitems,setcartitems] = useState({});
    const navigate = useNavigate();
    const [token,settoken] = useState('')


    const addtocart = async(itemId,size)=>{
        if(!size){
            toast.error('Select Product Size');
            return;

        }
        let cartData = structuredClone(cartitems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
     setcartitems(cartData);
     if(token){
        try {
            await axios.post(backendurl+'/api/cart/add',{itemId,size},{headers:{token}})

        } catch (error) {
           console.log(error);
           toast.error(error.message)
            
        }
     }
    }
    const getcartcount = ()=>{
        let count = 0;
        for(const items in cartitems){
            for(const item in cartitems[items]){
                try {
                    if(cartitems[items][item]>0){
                        count+=cartitems[items][item];
                    }
                } catch (error) {
                    
                }
            }
    }
    return count;
}
const updatequantity =async(itemId,size,quantity)=>{
 let cartData = structuredClone(cartitems);
 cartData[itemId][size]=quantity;
 setcartitems(cartData);
 if(token){
    try {
      await axios.post(backendurl + '/api/cart/update', 
    { itemId, size, quantity }, 
    { headers: { token } }
);

    } catch (error) {
         console.log(error);
           toast.error(error.message)
    }
 }
}

const getCartTotal = ()=>{
    let total = 0;
    for(const items in cartitems){
        let iteminfo = products.find((product)=>product._id ===items);
        for(const item in cartitems[items]){
            try {
                if(cartitems[items][item]>0){
                    total+=iteminfo.price*cartitems[items][item];
                }
            } catch (error) {
                
            }
        }
    }
    return total;
}
const getproductsdata=async () => {
    try {
        const response = await axios.get(backendurl+'/api/productfrontend/gett');
        
        if (response.data.success) {
            setproducts(response.data.products)
        }else{
            toast.error(response.data.message)
        }
        
    } catch (error) {
        console.log(error);
         toast.error(error.message)
        
    }
}
const getusercart = async(token)=>{
    try {
        const response = await axios.post(backendurl+'/api/cart/get', {},{headers:{token}})
        if(response.data.success){
            setcartitems(response.data.cartData)
        }
    } catch (error) {
        console.log(error);
         toast.error(error.message)
    }
}
useEffect(()=>{
  getproductsdata();
},[products])
useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    settoken(storedToken);
  }
}, []);

// Step 2: Fetch cart data once token is set
useEffect(() => {
  if (token) {
    getusercart(token);
  }
}, [token]);
    const value={
        products,
        currency,delivery_fee
        ,search,setsearch,showSearch,setshowSearch,cartitems,addtocart,getcartcount,updatequantity,getCartTotal
        ,navigate,backendurl,settoken,token,setcartitems,
    }
   
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
export  {ShopContext};