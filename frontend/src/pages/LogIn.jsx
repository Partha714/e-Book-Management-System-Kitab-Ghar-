import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {authActions} from "../Library/auth"
import {useDispatch} from "react-redux"

const LogIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      const { username, password } = Values;

      // ✅ Correct validation
      if (!username || !password) {
        alert("Please fill all the fields");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-in",
        Values
      );

      // ✅ Store token & user info
      dispatch(authActions.login());
      dispatch(authActions.login(response.data.role));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("role", response.data.role);

      alert("Login successful");
      navigate("/profile");

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-[90vh] bg-zinc-950 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-700 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Log In</p>

        <div className="mt-4">
          <div>
            <label className="text-zinc-300">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-800 text-white p-2 outline-none"
              placeholder="username"
              name="username"
              value={Values.username}
              onChange={change}
            />
          </div>

          <div className="mt-4">
            <label className="text-zinc-300">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-800 text-white p-2 outline-none"
              placeholder="password"
              name="password"
              value={Values.password}
              onChange={change}
            />
          </div>

          <button
            onClick={submit}
            className="w-full bg-yellow-500 text-white rounded-4xl p-2 mt-6 hover:bg-yellow-600"
          >
            Log In
          </button>

          <p className="text-zinc-300 mt-4">
            Don't have an account?{" "}
            <Link
              to="/SignUp"
              className="text-yellow-400 hover:text-blue-500 transition-all"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
