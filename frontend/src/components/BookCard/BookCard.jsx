import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";  
import API from "../../api"



const BookCard = ({ data, favourite}) => {
      const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };
  const handleRemoveBook = async () => {
    const response = await API.put(
        "/remove-book-from-favourite",
        {},
        {headers}
    );
    alert(response.data.message);
    
  }
    
  return (
    <div className="w-full max-w-sm mx-auto">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded-lg p-3 sm:p-4 flex flex-col shadow-md hover:shadow-lg transition">
          
          {/* Image */}
          <div className="bg-zinc-950 rounded flex justify-center items-center overflow-hidden">
            <img
              src={data.url}
              alt={data.title}
              className="h-[22vh] sm:h-[26vh] md:h-[30vh] object-contain"
            />
          </div>

          {/* Text */}
          <h2 className="mt-3 text-base sm:text-lg md:text-xl text-white font-semibold line-clamp-2">
            {data.title}
          </h2>

          <p className="mt-1 text-sm sm:text-base text-zinc-400 line-clamp-1">
            by {data.author}
          </p>

          <p className="mt-2 text-base sm:text-lg text-zinc-200 font-semibold">
            ₹ {data.price}
          </p>
        </div>
      </Link>

      {/* Remove Button */}
      {favourite && (
        <button
          onClick={() => handleRemoveBook(data._id)}
          className="w-full mt-3 bg-yellow-400 text-black py-2.5 rounded-lg font-semibold
                     active:scale-95 transition touch-manipulation"
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
