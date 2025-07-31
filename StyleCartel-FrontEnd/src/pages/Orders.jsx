import React from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendurl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadorderdata = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendurl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["orderId"] = order._id; // Attach orderId for canceling
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.filter(item => item.status !== "Cancelled").reverse());

      }
    } catch (error) {
      console.error("Error loading orders", error);
    }
  };


 const handleCancelOrder = async (orderId) => {
  try {
    if (!orderId || !token) {
     
      return;
    }

    const res = await axios.delete(
      `${backendurl}/api/order/cancel`,
      { orderId },
      {
        headers: {
          token, // you're already using this format elsewhere
        },
      }
    );

    toast.success("Order cancelled successfully");
    
    loadorderdata(); // Reload without full refresh
  } catch (error) {
    console.error("Cancel failed:", error?.response?.data || error.message);
    
  }
};



  useEffect(() => {
    loadorderdata();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 "
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price + 10}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size} </p>
                </div>
                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gray-400 ">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment:{" "}
                  <span className="text-gray-400 ">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    [
                      "Delivered",
                      "Order Placed",
                      "Packing",
                      "Shipped",
                      "Out For Delivery",
                      "Returned",
                    ].includes(item.status)
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></p>
                <p className="text-sm">{item.status}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={loadorderdata}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>

                {["Order Placed", "Packing"].includes(item.status) && (
                  <button
                    onClick={() =>handleCancelOrder(item.orderId)}
                    className="border px-4 py-2 text-sm font-medium rounded-sm text-red-500 border-red-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
