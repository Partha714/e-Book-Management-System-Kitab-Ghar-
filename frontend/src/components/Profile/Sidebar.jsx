import React, { useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../Library/auth"

const Sidebar = ({ data }) => {
 const dispatch = useDispatch();
 const history = useNavigate();
 const role = useSelector((state) => state.auth.role);
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-zinc-700 rounded p-4 flex flex-col gap-4 lg:h-[90%]">

      {/* --- User Info --- */}
      <div className="flex flex-col items-center text-center">
        <img
          src={data.avatar}
          alt="User Avatar"
          className="h-20 w-20 rounded-full object-cover"
        />
        <p className="mt-3 text-lg font-semibold text-zinc-200">
          {data.username}
        </p>
        <p className="text-sm text-zinc-400 hidden lg:block">
          {data.email}
        </p>
      </div>

      {/* --- Mobile Menu Button --- */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden bg-zinc-950 text-white py-2 rounded font-semibold"
      >
        {open ? "Close Menu" : "Open Menu"}
      </button>

      {/* --- Navigation Links --- */}
      {role === "user" && (      <div
        className={`
          flex-col gap-2
          ${open ? "flex" : "hidden"}
          lg:flex
        `}
      >
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold py-2 text-center rounded hover:bg-zinc-950"
        >
          Favourites
        </Link>

        <Link
          to="/profile/order-history"
          className="text-zinc-100 font-semibold py-2 text-center rounded hover:bg-zinc-950"
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold py-2 text-center rounded hover:bg-zinc-950"
        >
          Settings
        </Link>
      </div>)}
      {role === "admin" && (      <div
        className={`
          flex-col gap-2
          ${open ? "flex" : "hidden"}
          lg:flex
        `}
      >
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold py-2 text-center rounded hover:bg-zinc-950"
        >
          All Orders
        </Link>

        <Link
          to="/profile/add-book"
          className="text-zinc-100 font-semibold py-2 text-center rounded hover:bg-zinc-950"
        >
          Add Book
        </Link>

      </div>)}

      {/* --- Logout --- */}
      <button className="bg-zinc-950 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-red-950 transition-all" onClick={()=>{
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history("/");
      }}>
        Log Out
        <FaArrowCircleRight className="ms-3" />
      </button>

    </div>
  )
}

export default Sidebar



// import React from 'react'
// import { FaArrowCircleRight } from 'react-icons/fa'
// import { Link } from 'react-router-dom'

// const Sidebar = ({data}) => {
//   return (
//     <div className='bg-zinc-700 p-4 rounded flex flex-col items-center justify-between h-[90%]'>
//        <div className='flex items-center justify-center flex-col'>
//          <img src={data.avatar} className='h-[12vh]'/>
//         <p className='mt-3 text-xl text-zinc-200 font-semibold'>{data.username}</p>
//         <p className='mt-1 text-normal text-zinc-400 '>{data.email}</p>
//         <div className='w-full mt-4 h-[1px] bg-zinc-600 hidden lg:block'></div>
//        </div>

//         <div className='w-full flex-col items-center justify-center hidden lg:flex'>
//             <Link to="/profile" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-950 rounded transition-all duration-300'>
//             Favourites
//             </Link>
//             <Link to="/profile/orderHistory" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-950 rounded transition-all duration-300'>
//             Order History
//             </Link>
//             <Link to="/profile/settings" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-950 rounded transition-all duration-300'>
//             Settings
//             </Link>
//         </div>
//         <button className='bg-zinc-950 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded  hover:bg-red-950 hover: text-white transition-all duration-300'>
//             Log Out <FaArrowCircleRight className='ms-4'/>
//         </button>
//     </div>
//   )
// }

// export default Sidebar