const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const conn = require('./conn/conn');
const User = require('./routes/user');
const Books = require('./routes/book');
const Favourite = require('./routes/favourite');
const Cart = require('./routes/cart');
const Order = require('./routes/order');

// ✅ BODY PARSER MIDDLEWARE (MUST BE BEFORE ROUTES)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Connect to MongoDB
conn();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});
