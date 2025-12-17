import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Library/auth";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";

import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "../src/pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />

        {/* ✅ PROFILE ROUTES (FIXED) */}
        <Route path="/profile" element={<Profile />}>
          {role === 'user' ? <Route index  element={<Favourites/>}/> : <Route index  element={<AllOrders/>}/>}
          {role === 'admin' && <Route path="add-book" element={<AddBook />} />}
          {role === 'admin' && <Route path="update-book/:id" element={<UpdateBook />} />}
          <Route path="order-history" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;

























