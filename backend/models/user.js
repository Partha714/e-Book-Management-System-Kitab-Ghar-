const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://img.icons8.com/?size=100&id=12438&format=png&color=000000",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    favourites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    ],

    cart: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    ],

    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
