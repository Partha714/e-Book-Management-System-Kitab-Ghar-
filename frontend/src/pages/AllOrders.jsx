import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // 🔹 Fetch all orders (admin)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  // 🔥 Update order status
  const updateStatus = async (orderId, status) => {
    try {
      setLoadingId(orderId);

      await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderId}`,
        { status },
        { headers }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update order status");
    } finally {
      setLoadingId(null);
    }
  };

  // 🔄 Loading
  if (!orders) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // 📭 Empty state
  if (orders.length === 0) {
    return (
      <div className="text-zinc-400 text-center mt-20">
        No orders found
      </div>
    );
  }

  return (
    <div className="h-full p-2 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold mb-8">
        All Orders
      </h1>

      {/* Table Header */}
      <div className="bg-zinc-900 w-full rounded py-2 px-4 flex gap-2 text-sm md:text-base font-semibold">
        <div className="w-[4%] text-center">#</div>
        <div className="w-[35%] md:w-[22%]">Book</div>
        <div className="hidden md:block w-[40%]">Description</div>
        <div className="w-[15%] md:w-[8%]">Price</div>
        <div className="w-[26%] md:w-[18%]">Status</div>
        <div className="w-[10%] md:w-[5%] text-center">
          <FaUser />
        </div>
      </div>

      {/* Orders List */}
      {orders.map((item, i) => (
        <div
          key={item._id}
          className="bg-zinc-800 w-full rounded py-3 px-4 flex gap-2 items-center mb-2 hover:bg-zinc-950 transition"
        >
          <div className="w-[4%] text-center">{i + 1}</div>

          {/* Book */}
          <div className="w-[35%] md:w-[22%]">
            {item.book ? (
              <Link
                to={`/view-book-details/${item.book._id}`}
                className="hover:text-blue-400"
              >
                {item.book.title}
              </Link>
            ) : (
              <span className="text-red-400 italic">
                Book deleted
              </span>
            )}
          </div>

          {/* Description */}
          <div className="hidden md:block w-[40%] text-zinc-400">
            {item.book ? item.book.desc.slice(0, 60) + "..." : "N/A"}
          </div>

          {/* Price */}
          <div className="w-[15%] md:w-[8%]">
            {item.book ? `₹ ${item.book.price}` : "—"}
          </div>

          {/* Status */}
          <div className="w-[26%] md:w-[18%]">
            <select
              value={item.status}
              disabled={loadingId === item._id}
              onChange={(e) =>
                updateStatus(item._id, e.target.value)
              }
              className={`bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm
                ${
                  item.status === "Order Placed"
                    ? "text-yellow-400"
                    : item.status === "Cancelled"
                    ? "text-red-500"
                    :item.status === "Out for Delivery"
                    ? "text-blue-800"
                    : "text-green-500"
                }
              `}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Shipped">Shipped</option>
              <option value="Our for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* User Icon */}
          <div className="w-[10%] md:w-[5%] text-center text-zinc-400">
            <FaUser />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
