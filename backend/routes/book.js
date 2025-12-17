const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Book = require('../models/book');
const { authenticateToken } = require('./userAuth');

//add book --admin
router.post("/add-book", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(403).json({message:"Access denied"})
        }
        const book = new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        await book.save();
        res.status(200).json({message:"Book added successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})
//update book --admin
// router.put("/update-book", authenticateToken, async(req,res)=>{
//     try {
//         const {bookid} = req.headers;
//         await Book.findByIdAndUpdate(bookid,{
//             url:req.body.url,
//             title:req.body.title,
//             author:req.body.author,
//             price:req.body.price,
//             desc:req.body.desc,
//             language:req.body.language,
//         });
//         return res.status(200).json({
//             message:"Book updated successfully"
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:"An Error Occurred"})
        
//     }
// });

router.put("/update-book/:id", authenticateToken, async (req, res) => {
  try {
    const admin = await User.findById(req.headers.id);

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { url, title, author, price, desc, language } = req.body;

    if (!url || !title || !author || !price || !desc || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Book.findByIdAndUpdate(req.params.id, {
      url,
      title,
      author,
      price,
      desc,
      language,
    });

    return res.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});


//delete book --admin
// router.delete("/delete-book", authenticateToken, async(req,res)=>{
//     try {
//         const {bookid} = req.headers;
//         await Book.findByIdAndDelete(bookid);
//         return res.status(200).json({
//             message:"Book deleted successfully"
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:"An Error Occurred"})};
//     });
router.delete("/delete-book/:id", authenticateToken, async (req, res) => {
  try {
    const admin = await User.findById(req.headers.id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // ❗ DO NOT DELETE ORDERS
    // Just delete the book
    await Book.findByIdAndDelete(req.params.id);

    return res.json({
      status: "Success",
      message: "Book deleted successfully. Orders preserved.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});



//get all books (from here all apis are accessible to user and admin)
router.get("/get-all-books", async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1});
        return res.json({
            status:"Success",
            data:books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"})
        
    }
});

//get recently added books (authenticateToken,)
router.get("/get-recent-books", async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1}).limit(4);
        return res.json({
            status:"Success",
            data:books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An Error Occurred"})
    }
});

//get book by id
// router.get("/get-book-by-id/:id", authenticateToken, async(req,res)=>{
//     try {
//         const {id} = req.params;
//         const book = await Book.findById(id);
//         return res.json({
//             status:"Success",
//             data:book,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:"An Error Occurred"})
//     }
// });
// GET BOOK BY ID — any logged-in user
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    return res.status(200).json({ data: book })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }
})




module.exports = router;

