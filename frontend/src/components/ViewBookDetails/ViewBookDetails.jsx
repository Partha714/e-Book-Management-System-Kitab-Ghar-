import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from "../api";

// Icons
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

// Components
import Loader from '../Loader/Loader';
import UpdateBook from '../../pages/UpdateBook';

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await API.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // --- NEW: Handle Cart Function ---
  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      // Since backend sends status: "Success" even if already in cart,
      // we just show the message returned by the backend.
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const navigate = useNavigate();

  const deleteBook = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this book?");
  if (!confirmDelete) return;

  try {
    const response = await axios.delete(
      `http://localhost:1000/api/v1/delete-book/${id}`,
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  } catch (error) {
    alert("Failed to delete book");
  }
};


  return (
    <>
      {Data ? (
        <div className='px-4 md:px-12 py-8 bg-zinc-950 flex flex-col md:flex-row gap-8'>

          <div className='w-full lg:w-3/6 flex flex-col-reverse lg:flex-row gap-6 items-start'>
            <div className='flex-none w-full lg:w-auto flex justify-center lg:justify-start'>
              {/* User Actions */}
              {isLoggedIn === true && role === "user" && (
                <div className='flex flex-row lg:flex-col gap-4'>
                  <button
                    className='bg-zinc-800 text-3xl text-white p-4 rounded-xl hover:bg-zinc-700 transition-all flex items-center justify-center'
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className='bg-zinc-800 text-3xl text-white p-4 rounded-xl hover:bg-zinc-700 transition-all flex items-center justify-center'
                    onClick={handleCart} // Attached the function here
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}

              {/* Admin Actions */}
              {isLoggedIn === true && role === "admin" && (
                <div className='flex flex-row lg:flex-col gap-4'>
                  <Link
                    to={`/profile/update-book/${id}`}
                    className="bg-zinc-800 text-3xl text-white p-4 rounded-xl hover:bg-zinc-700 transition-all flex items-center justify-center"
                  >
                    <FaEdit />
                  </Link>

                  <button className='bg-zinc-800 text-3xl text-red-500 p-4 rounded-xl hover:bg-zinc-700 transition-all flex items-center justify-center' onClick={deleteBook}>
                    <MdDeleteOutline />
                  </button>
                </div>
              )}
            </div>

            <div className='bg-zinc-800 rounded p-6 lg:p-12 flex items-center justify-center flex-grow w-full'>
              <img
                src={Data.url}
                alt={Data.title}
                className='h-[50vh] lg:h-[60vh] rounded object-contain'
              />
            </div>
          </div>

          <div className='p-4 w-full lg:w-3/6'>
            <h1 className='text-4xl text-zinc-200 font-semibold'>{Data.title}</h1>
            <p className='text-zinc-400 mt-1'>by {Data.author}</p>
            <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
            <p className='flex mt-4 items-center justify-start text-zinc-400'>
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
              Price: ₹ {Data.price}
            </p>
          </div>

        </div>
      ) : (
        <div className='h-screen bg-zinc-900 flex items-center justify-center'>
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
