import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-gray-700 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* Brand / About Section */}
        <div>
          <img src={assets.logo2} className="mb-4 w-32" alt="StyleCartel Logo" />
          <p className="text-sm leading-relaxed text-gray-600">
            Discover the latest trends in fashion with StyleCartel. We bring you
            elegant, modern, and timeless clothing that fits your lifestyle.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <NavLink
              to="/"
              className="hover:text-pink-500 transition"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-pink-500 transition"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/orders"
              className="hover:text-pink-500 transition"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-pink-500 transition"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Contact
            </NavLink>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-pink-500 transition cursor-pointer">
              📞 (+91) 34987 94589
            </li>
            <li className="hover:text-pink-500 transition cursor-pointer">
              ✉️ admin@StyleCartel.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-200 mt-6">
        <p className="py-6 text-xs text-center text-gray-500">
          © {new Date().getFullYear()} StyleCartel.com — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
