import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import API from "../api";


const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    language: "",
    desc: "",
  });

  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // 🔹 Fetch existing book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await API.get(
          `/get-book-by-id/${id}`
        );

        setData({
          url: response.data.data.url,
          title: response.data.data.title,
          author: response.data.data.author,
          price: response.data.data.price,
          language: response.data.data.language,
          desc: response.data.data.desc,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // 🔹 Handle input change
  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 🔥 Update book
  const submit = async (e) => {
    e.preventDefault();

    const { url, title, author, price, language, desc } = data;

    if (
      !url.trim() ||
      !title.trim() ||
      !author.trim() ||
      !price ||
      !language.trim() ||
      !desc.trim()
    ) {
      alert("All fields are required ❗");
      return;
    }

    try {
      const response = await API.put(
        `/update-book/${id}`,
        data,
        { headers }
      );

      alert(response.data.message || "Book updated successfully");
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update book");
    }
  };

  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen p-8 w-full">
      <h1 className="text-2xl text-yellow-100 font-semibold mb-6">
        Update Book
      </h1>

      <form
        onSubmit={submit}
        className="bg-zinc-800 p-8 rounded-lg w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="url"
            name="url"
            placeholder="Image URL"
            value={data.url}
            onChange={change}
            required
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />

          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={data.title}
            onChange={change}
            required
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={data.author}
            onChange={change}
            required
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={data.price}
            onChange={change}
            min="1"
            required
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />

          <input
            type="text"
            name="language"
            placeholder="Language"
            value={data.language}
            onChange={change}
            required
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />
        </div>

        <textarea
          name="desc"
          placeholder="Description"
          rows="4"
          value={data.desc}
          onChange={change}
          required
          className="w-full mt-6 bg-zinc-900 text-white p-3 rounded border border-zinc-700"
        />

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-yellow-400 text-black px-8 py-3 rounded font-semibold
                       hover:bg-yellow-300 active:scale-95 transition"
          >
            Update Book
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-zinc-700 text-white px-8 py-3 rounded font-semibold
                       hover:bg-zinc-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
