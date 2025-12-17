import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orders, setOrders] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // 🔹 Fetch user order history
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching order history", error);
      }
    };

    fetchOrders();
  }, []);

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
        You have not placed any orders yet
      </div>
    );
  }

  return (
    <div className="h-full p-2 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold mb-8">
        My Orders
      </h1>

      {/* Table Header */}
      <div className="bg-zinc-900 w-full rounded py-2 px-4 flex gap-2 text-sm md:text-base font-semibold">
        <div className="w-[5%] text-center">#</div>
        <div className="w-[40%] md:w-[25%]">Book</div>
        <div className="hidden md:block w-[40%]">Description</div>
        <div className="w-[15%] md:w-[10%]">Price</div>
        <div className="w-[20%] md:w-[15%]">Status</div>
      </div>

      {/* Orders */}
      {orders.map((item, i) => (
        <div
          key={item._id}
          className="bg-zinc-800 w-full rounded py-3 px-4 flex gap-2 items-center mb-2 hover:bg-zinc-950 transition"
        >
          <div className="w-[5%] text-center">{i + 1}</div>

          {/* Book */}
          <div className="w-[40%] md:w-[25%]">
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
          <div className="w-[15%] md:w-[10%]">
            {item.book ? `₹ ${item.book.price}` : "—"}
          </div>

          {/* Status */}
          <div className="w-[20%] md:w-[15%] font-semibold">
            {item.status === "Order Placed" ? (
              <span className="text-yellow-400">{item.status}</span>
            ) : item.status === "Cancelled" ? (
              <span className="text-red-500">{item.status}</span>
            ) : (
              <span className="text-green-500">{item.status}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrderHistory;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "../Loader/Loader";


// // modify from 6.47.22

// const UserOrderHistory = () => {
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:1000/api/v1/get-order-history",
//           { headers }
//         );

//         setOrderHistory(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <Loader />;

//   return (
//     <div className="p-4 bg-zinc-950 min-h-screen">
//       <h1 className="text-2xl text-yellow-100 font-semibold mb-6">
//         Order History
//       </h1>
// {/* to update see from 6.40.03 */}
//       {orderHistory.length === 0 ? (
//         <p className="text-zinc-400">No orders found</p>
//       ) : (
//         <div className="space-y-4">
//           {orderHistory.map((order) => (
//             <div
//               key={order._id}
//               className="bg-zinc-800 p-4 rounded-lg"
//             >
//               <p className="text-white font-semibold">
//                 {order.book.title}
//               </p>
//               <p className="text-zinc-400 text-sm">
//                 Status: {order.status}
//               </p>
//               <p className="text-zinc-500 text-xs">
//                 Ordered on: {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserOrderHistory;




// import React, {useEffect, useState} from 'react'
// import axios from 'axios';
// import Loader from '../Loader/Loader';


// const UserOrderHistory = () => {
//   const [OrderHistiry, setOrderHistiry] = useState();
//     const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//     // bookid: id,
//   };
//   useEffect(() => { 
//     const fetch = async ()=>{
//     const response =  await axios.get("http://localhost:1000/api/v1/get-order-history",{headers});
//     console.log(response.data);
    
//     }
//     fetch();
//    }, []);
  
//   return (
//     <div></div>
//   )
// }

// export default UserOrderHistory