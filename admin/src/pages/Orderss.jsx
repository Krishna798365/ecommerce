import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {backendUrl, currency} from "../../../../admin/src/App";

import { assets } from "../../../../admin/src/assets/assets";
const Orderss = ({ token }) => {
  const [orders, setorders] = useState([]);

  const fetchallorders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setorders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const statusHandler = async (e,orderId)=>{
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderId,status:e.target.value},{headers:{token}});
      if (response.data.success) {
        
         await fetchallorders();
    }
   } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    fetchallorders();
  }, [token]);
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
        orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
           <div>
             <div>
              {order.items.map((items, index) => {
                if ((index === order.items, length)) {
                  return (
                    <p className="py-0.5" key={index}>
                       {" "}
                      {items.name} x {items.quantity} <span>{items.size}</span>
                    </p>
                  );
                } else {
                  return (
                    <p className="py-0.5" key={index}>
                      {" "}
                      {items.name} x {items.quantity} <span>{items.size}</span>
                    </p>
                  );
                }
              })}
            </div>
             <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
             <div>
              <p>
                {order.address.street + ", " + order.address.city + ", " + order.address.state + ", " + order.address.zipcode}
              </p>
              </div>
              <p>{order.address.phone}</p>
             
           </div>
           <div>
            <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">
                {order.paymentMethod}
              </p>
            <p>Payment:{order.payment ? 'Done':'Pending'}</p>
              
              <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
           </div>
          <p className="text-sm sm:text-[15px]">Total Amount: {currency}{order.amount}</p>
          <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className="p-2 font-semibold">
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
          </div>                            
        ))}
      </div>
     
    </div>
  );
};

export default Orderss;
