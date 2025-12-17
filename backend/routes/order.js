const router = require("express").Router();
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/Order");
const User = require("../models/user");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const {order} = req.body;
        for (const orderData of order) {
            const newOrder = new Order({user:id, book:orderData._id});
            const orderDataFromDb = await newOrder.save();
            //saving order reference in user model
            await User.findByIdAndUpdate(id, {$push: {orders: orderDataFromDb._id}});
            //clearing the cart
            await User.findByIdAndUpdate(id, {$pull: {cart: orderData._id}});
        }
        return res.json({
            status:"Success",
            message:"Order placed successfully"
        });
} catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occurred" });
    }
});

//get orders of a particular user
// router.get("/get-order-history", authenticateToken, async (req, res) => {
//     try {
//         const { id } = req.headers;
//         const userData = await User.findById(id).populate({
//             path: "orders",
//             populate: {path: "book"}
//         });
//         const orders = userData.orders.reverse();
//         return res.json({
//             status: "Success",
//             // orders: orders
//             data: ordersData,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "An Error Occurred" });
//     }
// });
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: {
        path: "book",
        model: "Book", // ✅ explicitly mention model
      },
    });

    const orders = userData.orders.reverse();

    return res.json({
      status: "Success",
      data: orders, // ✅ fixed
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});



//get all orders (admin)
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
        .populate({
            path: "book",
        })
        .populate({
            path: "user",
        })
        .sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occurred" });
    }
});

//update order status (admin)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.json({
            status: "Success",
            message: "Order status updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occurred" });
    }
});


module.exports = router;