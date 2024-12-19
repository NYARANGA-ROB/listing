import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';

const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success("Sign up successful!");
      setLoading(false);
      navigate('/')
    } catch (error) {
      toast.error("User already exists....");
      setLoading(false);
    }
  };

  return (
    <div className='text-white bg-white fixed h-screen overflow-hidden w-screen flex justify-center  bg-cover bg-no-repeat py-12'
    style={{backgroundImage: 'url(https://urban-homes.s3.ap-south-1.amazonaws.com/sign+bg.png)'}}>

      <div className="bg-white border border-s1ate-400 rounded-md px-8 shadow-2xl backdrop-filter backdrop-blur-2xl bg-opacity-40 relative py-2 h-[520px]">

        <div className='p-3 max-w-lg mx-auto'>
          <h1 className='text-3xl text-black text-center font-semibold my-7'>Sign Up</h1>

          <form onSubmit={submitHandler} className='flex flex-col gap-4 w-[450px]'>
            <input type='text' placeholder='username' className='border p-3 rounded-lg text-black' id='username' onChange={changeHandler} />
            <input type='email' placeholder='email' className='text-black border p-3 rounded-lg text-black' id='email' onChange={changeHandler} />
            <input type='password' placeholder='password' className='text-black border p-3 rounded-lg text-black' id='password' onChange={changeHandler} />
            <button disabled={loading} className='bg-black font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
              {loading ? 'Loading...' : 'Sign up'}
            </button>
            <OAuth />
          </form>

          <div className='flex gap-2 mt-5'>
            <p className='text-black'>Have an account?</p>
            <Link to="/sign-in">
              <span className='text-blue-700 font-medium'>Sign in</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp;
