import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );

        console.log(response.data.data); // ✅ works
        setFavourites(response.data.data); // ✅ store data
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [favourites]);

  return (
    <div className="grid grid-cols-4 gap-5">
      {favourites.length === 0 && <div className="text-5xl font-semibold text-zinc-700 flex items-center justify-center">No Favourite Book</div>}
      {favourites && favourites.map((items , i) => (
        <div key={i}><BookCard data={items} favourite={true}/></div>
      ))}
    </div>
  );
};

export default Favourites;
