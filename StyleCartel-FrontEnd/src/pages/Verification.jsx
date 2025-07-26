import React, { useState, useRef } from 'react';
import '../EmailVerification.css'; // Custom animation CSS

function Verification({ userEmail = "email123@gmail.com" }) {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const val = element.value;
    if (!/^[0-9]*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    alert(`Verifying OTP: ${otp.join("")}`);
  };

  const handleResend = () => {
    alert("OTP resent!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200">
      <div className="fade-in backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl p-8 rounded-2xl w-[380px]">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">🔒 Email Verification</h2>
        <p className="text-gray-700 text-center text-sm mb-6">
          We have sent a code to <br />
          <span className="font-medium text-blue-800">{userEmail}</span>
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-2xl text-center rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-md"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 rounded-xl shadow-lg"
        >
          ✅ Verify Account
        </button>

        <p className="mt-4 text-sm text-gray-700 text-center">
          Didn’t receive code?{" "}
          <button onClick={handleResend} className="text-blue-800 font-semibold hover:underline">
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
export default Verification;