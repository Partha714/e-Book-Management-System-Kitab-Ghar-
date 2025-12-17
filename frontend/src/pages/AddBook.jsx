import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/add-book",
        data,
        { headers }
      );

      alert(response.data.message);

      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    } catch (error) {
      alert("Failed to add book");
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen p-8 w-full">
      <h1 className="text-2xl text-yellow-100 font-semibold mb-6">
        Add New Book
      </h1>

      {/* FULL WIDTH FORM */}
      <div className="bg-zinc-800 p-8 rounded-lg w-full">

        {/* GRID FOR BETTER SPACE USAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="text"
            name="url"
            placeholder="Image URL"
            value={data.url}
            required
            onChange={change}
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />

          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={data.title}
            required
            onChange={change}
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={data.author}
            required
            onChange={change}
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={data.price}
            required
            onChange={change}
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />

          <input
            type="text"
            name="language"
            placeholder="Language"
            value={data.language}
            required
            onChange={change}
            className="bg-zinc-900 text-white p-3 rounded border border-zinc-700"
          />
        </div>

        {/* DESCRIPTION FULL ROW */}
        <textarea
          name="desc"
          placeholder="Description"
          rows="4"
          value={data.desc}
          required
          onChange={change}
          className="w-full mt-6 bg-zinc-900 text-white p-3 rounded border border-zinc-700"
        />

        <button
          onClick={submit}
          className="mt-6 bg-yellow-400 text-black px-8 py-3 rounded font-semibold
                     hover:bg-yellow-300 active:scale-95 transition"
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
