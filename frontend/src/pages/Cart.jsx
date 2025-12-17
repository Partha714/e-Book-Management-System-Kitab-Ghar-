import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // 🔹 Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-cart-items",
          { headers }
        );
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  // 🔥 Remove from cart
  const handleRemoveFromCart = async (bookId) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );

      setCart((prev) => prev.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error removing book from cart", error);
    }
  };

  // 🧮 Total price
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, book) => sum + Number(book.price), 0);
  }, [cart]);

  // ✅ PLACE ORDER (FINAL)
  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );

      alert("Order placed successfully 🎉");

      setCart([]); // clear UI cart
      navigate("/profile/order-history"); // ✅ correct route
    } catch (error) {
      console.error("Error placing order", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-28 p-4">
      <h1 className="text-2xl text-yellow-100 font-semibold mb-6">
        My Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-zinc-400">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cart.map((book) => (
            <div
              key={book._id}
              className="bg-zinc-800 rounded-lg p-4 shadow-md"
            >
              <Link to={`/view-book-details/${book._id}`}>
                <div className="bg-zinc-950 rounded flex justify-center items-center overflow-hidden">
                  <img
                    src={book.url}
                    alt={book.title}
                    className="h-[22vh] object-contain"
                  />
                </div>

                <h2 className="mt-3 text-lg text-white font-semibold line-clamp-2">
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  by {book.author}
                </p>

                <p className="mt-2 text-zinc-200 font-semibold">
                  ₹ {book.price}
                </p>
              </Link>

              <button
                onClick={() => handleRemoveFromCart(book._id)}
                className="w-full mt-3 bg-yellow-400 text-black py-2.5 rounded-lg font-semibold
                           active:scale-95 transition"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🧮 STICKY TOTAL */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 flex justify-between items-center">
          <div>
            <p className="text-zinc-400 text-sm">Total Amount</p>
            <p className="text-yellow-100 text-xl font-semibold">
              ₹ {totalPrice}
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold
                       active:scale-95 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
