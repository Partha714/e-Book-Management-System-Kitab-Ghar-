import React from 'react'
import axios from 'axios'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import API from "../api";


const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Hero/>
      <RecentlyAdded/>
    </div>
  )
}

export default Home
