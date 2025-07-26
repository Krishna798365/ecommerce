import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Reset = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Change Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default Reset;
