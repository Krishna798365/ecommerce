import React, { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import ProductItem from "../components/ProductItem";
import { toast } from "react-toastify";
const Product = () => {
  const { productId } = useParams();
  const { products, currency, description, addtocart } =
    useContext(ShopContext);
  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState("");
  const [size, setsize] = useState("");
  const fetchproductdata = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductdata(item);
        setimage(item.image[0]);
      }
    });
  };
  useEffect(() => {
    if (!productId || !products.length) return;

    const item = products.find((p) => p._id === productId);

    if (item) {
      setproductdata(item);
      // Only set default image if not already set (on first load)
      setimage((prev) => prev || item.image[0]);
    }
  }, [productId, products]);
  return productdata ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-400">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
  {/* Thumbnail Section */}
  <div className="flex flex-col-reverse sm:flex-row flex-1 gap-4 sm:gap-3">
    
    {/* Thumbnail images */}
    <div className="flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 w-full sm:w-[20%] max-h-[500px]">
      {productdata?.image?.map((item, index) => (
        <img
          key={index}
          src={item}
          onClick={() => setimage(item)}
          className={`w-[70px] h-[70px] sm:w-20 sm:h-20 object-cover cursor-pointer rounded   p-0.5 transition-all duration-200
            `}
          alt=""
        />
      ))}
    </div>

    {/* Main selected image */}
    <div className="w-full sm:w-[80%]">
      <img
        src={image}
        className="w-full max-h-[400px] sm:max-h-[500px] object-contain rounded shadow-md"
        alt="Selected product"
      />
    </div>
  </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productdata.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" srcSet="" className="w-3.5" />
            <img src={assets.star_icon} alt="" srcSet="" className="w-3.5" />
            <img src={assets.star_icon} alt="" srcSet="" className="w-3.5" />
            <img src={assets.star_icon} alt="" srcSet="" className="w-3.5" />
            <img
              src={assets.star_dull_icon}
              alt=""
              srcSet=""
              className="w-3.5"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productdata.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productdata.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productdata.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              if (!size) {
                toast.error("Please select a size");
                return;
              }
              addtocart(productdata._id, size);
            }}
            className=" cursor-pointer bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>COD Available</p>
            <p>Easy Return And Exchange Policy Within 7 Days</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm"> Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of goods and services over the internet. It
            allows businesses to reach customers globally, process orders,
            accept payments, manage shipping, and provide customer service, all
            without needing a physical storefront
          </p>
          <p>
            E-commerce websites act as virtual storefronts, where customers can
            browse products, add items to their cart, and complete transactions
            online
          </p>
        </div>
      </div>
      <div>
        <RelatedProducts
          category={productdata.category}
          subcategory={productdata.subcategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
