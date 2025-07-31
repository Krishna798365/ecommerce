
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Verify from './pages/Verify';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfile from './pages/Myprofile';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

export const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
      <Navbar/>
      <Searchbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection/>}/>
        <Route path='/myprofile' element={<MyProfile/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path='/verify' element={<Verify/>}/>
        <Route path="/forgot-password" element={<ForgetPassword />}></Route>
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
      <Footer/>
    </div>
  );
};
export default App;
