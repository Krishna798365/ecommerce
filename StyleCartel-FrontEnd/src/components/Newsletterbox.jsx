import React, { useState } from 'react';

const Newsletterbox = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsSubmitted(true); // Change UI after form submission
  };

  return (
    <div className='text-center'>
      {!isSubmitted ? (
        <>
          <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>   
          <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil sequi, labore pariatur ipsum, ex soluta odit enim aut voluptas animi aspernatur consectetur, molestias accusantium similique perspiciatis explicabo minus quos delectus!
          </p>
          <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input
              type="email"
              placeholder='Enter your Email'
              className='w-full sm:flex-1 outline-none'
              required
            />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
          </form>
        </>
      ) : (
        <div className='text-2xl font-semibold text-green-600 mt-10'>
          ✅ Thank you for subscribing to our membership!
        </div>
      )}
    </div>
  );
};

export default Newsletterbox;
