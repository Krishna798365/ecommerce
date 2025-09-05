import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import OurPolicy from "../components/OurPolicy";
import Chatbot from "../components/Chatbot";

const contactInfo = {
  storeName: "Our Store",
  address: "23584 Delhi Station, sector 34, Delhi, India",
  phone: "(+91) 34987 94589",
  email: "admin@StyleCartel.com",
  image: assets.contact_img,
};

const Contact = () => {
  return (
    <div>
      <Chatbot />
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={contactInfo.image}
          className="w-full md:max-w-[480px] rounded-2xl shadow-md"
          alt="Contact"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-700">
            {contactInfo.storeName}
          </p>
          <p className="text-gray-500">{contactInfo.address}</p>
          <p className="text-gray-500">
            Tel: {contactInfo.phone} <br /> Email: {contactInfo.email}
          </p>
        </div>
      </div>

      <OurPolicy />
    </div>
  );
};

export default Contact;
