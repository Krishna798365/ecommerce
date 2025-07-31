import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom'
import { toast } from "react-toastify";
 
const MyProfile = () => {
  const { backendurl, token, currency,navigate ,settoken , setcartitems} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
 const [profile, setProfile] = useState([]);
 const logout=()=>{
  navigate('/login')
  localStorage.removeItem('token')
  settoken('')
  setcartitems({})
  
}
    const fetchProfile = async () => {
      try {
        if (!token) return;

        const res = await axios.get("http://localhost:4000/api/user/profile", {
          headers: {
           token
          },
        });

        setProfile(res.data.user);
        
      } catch (error) {
              console.log(error);
        toast.error(error.message);
      }
    };


  const loadorderdata = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendurl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const items = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            items.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(items.reverse());
      }
    } catch (err) {
        console.log(err);
        toast.error(err.message);
        
    }
  };

useEffect(() => {
  loadorderdata();
  fetchProfile(); // <--- call it here
}, [token]);


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto ">
        {/* Sidebar */}
        <div className="w-6/7 md:w-1/4 bg-white p-6 shadow-lg md: top-0 self-start h-full rounded-b-2xl md:rounded-r-2xl mt-20 ml-6 border-5 border-gray-200">
          <div className="text-center mb-6">
            <img
              src={assets.NewProf}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full border-2 border-black-400 object-cover"
            />
            <h2 className="mt-4 text-xl font-bold text-gray-800 sm:text-m md:l">{profile.name}</h2>
           
          </div>

          <div className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={profile.name} 
            />
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md"
              value={profile.email}
            />
          </div>

          <div className="mt-6 text-center">
                <button onClick={logout} className="text-red-500 font-semibold hover:underline">
              Log Out
            </button>
            
          </div>
        </div>

        {/* Order History */}
        <div className="md:w-3/4 w-full px-4 md:px-8 py-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivered Orders</h2>

          {orderData.filter(item => ["Delivered", "Cancelled", "Returned"].includes(item.status)).length === 0 ? (
            <div className="text-gray-500">No delivered orders found.</div>
          ) : (
            orderData
              .filter(item => ["Delivered", "Cancelled", "Returned"].includes(item.status))
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm mb-5 flex flex-col md:flex-row items-start md:items-center justify-between"
                >
                  <div className="flex gap-4 w-full">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} | Size: {item.size} | Price: {currency}
                        {item.price}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Ordered on: {new Date(item.date).toDateString()}
                      </p>
                      <p className="text-sm text-gray-400">Payment: {item.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 text-right">
                    <span className="inline-flex items-center gap-2  font-medium text-sm">
                      <span className={`min-w-2 h-2 rounded-full ${
                    [
                      "Delivered",
                      "Order Placed",
                      "Packing",
                      "Shipped",
                      "Out For Delivery",
                      "Returned",
                    ].includes(item.status)
                      ? "bg-green-500"
                      : "bg-red-500 "
                  }`} />
                      {item.status}
                    </span>
                   
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
