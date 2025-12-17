import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
const Profile = () => {
  // FIXED: Changed state name to lowercase 'profile' to avoid conflict with Component name
  const [profile, setProfile] = useState()
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers });
        
        // FIXED: Your logs showed data is directly in response.data
        setProfile(response.data);
        
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetch();
  }, [])

  return (
    <div className='bg-zinc-950 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4 text-white'>
      {/* FIXED: Check 'profile' (lowercase) */}
      {!profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader/>
        </div>
      )}
      
      {profile && (
        <>
          <div className='w-full md:w-1/6 h-auto min-h-screen'>
            {/* You can now pass the data to Sidebar if needed */}
            <Sidebar data={profile} /> 
          </div>
          <div className='w-full md:w-5/6 '>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}
export default Profile