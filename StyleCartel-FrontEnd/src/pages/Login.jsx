import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const { token, settoken, navigate, backendurl } = useContext(ShopContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setForm({ name: '', email: '', password: '' });
  }, [mode]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'signup' ? '/register' : '/login';
      const payload = mode === 'signup'
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const response = await axios.post(`${backendurl}/api/user${endpoint}`, payload);
      if (response.data.success) {
        settoken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${mode === 'signup' ? 'Signed up' : 'Logged in'} successfully`);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${backendurl}/api/user/google-auth`, {
        token: credentialResponse.credential,
        mode,
      });

      if (response.data.success) {
        settoken(response.data.token);
        localStorage.setItem('token', response.data.token);
         localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(`Logged in with Google`);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      
    }
  };

  const handleGoogleFailure = () => {
    toast.error("Google Sign-In was unsuccessful. Try again.");
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl capitalize">{mode}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {mode === 'signup' && (
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="E-mail"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <NavLink to="/forgot-password" className="cursor-pointer">Forgot password?</NavLink>
        {
          mode === 'login'
            ? <p onClick={() => setMode('signup')} className="cursor-pointer">Create account</p>
            : <p onClick={() => setMode('login')} className="cursor-pointer">Login here</p>
        }
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>

      <div className="mt-4">
        <p className="text-sm text-gray-500 text-center mb-2">
          {mode === 'signup' ? 'Or sign up with Google' : 'Or sign in with Google'}
        </p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
      </div>
    </form>
  );
};

export default Login;
