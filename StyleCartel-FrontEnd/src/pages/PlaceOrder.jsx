import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios';
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const [method, setmethod] = useState("cod");
  const {
    navigate,
    backendurl,
    token,
    cartitems,
    setcartitems,
    getCartTotal,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
 
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setformData((data) => ({ ...data, [name]: value }));
  };
  const onsubmithandler = async (event) => {
    event.preventDefault();
    try {
      let orderitems = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartitems[items][item];
              orderitems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderitems,
        amount: getCartTotal() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const response = await axios.post(
            backendurl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data.success);

          if (response.data.success) {
            setcartitems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;
          case 'stripe':
           const stripeResponse = await axios.post(backendurl + '/api/order/stripe', orderData, {headers:{token}});
          if (stripeResponse.data.success) {
            const {session_url} = stripeResponse.data;
            window.location.replace(session_url);
          }else{
            toast.error(stripeResponse.data.message);
          }
       
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  };
  return (
    <form onSubmit={onsubmithandler}className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-w-[50%] sm:max-w-[480px">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-[50%]"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-[50%]"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="E-mail address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-[50%]"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-[50%]"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="ZIP-CODE"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-[50%]"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-[50%]"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="Number"
          placeholder="PHONE NO."
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setmethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>
           
            <div
              onClick={() => setmethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm "
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
