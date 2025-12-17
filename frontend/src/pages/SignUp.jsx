import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
 const [Values, setValues] = useState({username:"", email:"", password:"", address:""});
 const navigate = useNavigate();
 const change = (e)=>{
     const {name, value} = e.target;
      setValues({...Values, [name]:value});
 }
const submit = async () => {
  try {
    const { username, email, password, address } = Values;

    if (!username || !email || !password || !address) {
      alert("Please fill all the fields");
      return;
    }

    const response = await axios.post(
      "http://localhost:1000/api/v1/sign-up",
      Values
    );

    alert("User registered successfully");
    console.log(response.data.message);
    navigate("/LogIn");

  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className='h-auto bg-zinc-950 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-700 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-300'>
              Username
            </label>
            <input type="text" className='w-full mt-2 bg-zinc-800 text-white p-2 outline-none' placeholder='username' name='username' required value={Values.username} onChange={change}/>
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-300'>
              Email
            </label>
            <input type="text" className='w-full mt-2 bg-zinc-950 text-white p-2 outline-none' placeholder='xyz@eg.com' name='email' required value={Values.email} onChange={change}/>
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-300'>
              Password
            </label>
            <input type="password" className='w-full mt-2 bg-zinc-800 text-white p-2 outline-none' placeholder='password' name='password' required value={Values.password} onChange={change}/>
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-300'>
              Address
            </label>
            <textarea className='w-full mt-2 bg-zinc-800 text-white p-2 outline-none' rows={5} placeholder='address' name='address' required value={Values.address} onChange={change}/>
          </div>
          <button className='w-full bg-yellow-500 text-white rounded-4xl p-2 mt-6 hover:bg-yellow-600' onClick={submit}>Sign Up</button>
          <p className='text-zinc-300 mt-4 '>Already have an account? <Link to="/LogIn" className='text-yellow-400 hover:text-blue-500 transition-all'>Log In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp