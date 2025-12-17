const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add favourite book
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(400).json({ message: "Book already in favourites" });
        }
        await User.findByIdAndUpdate(id, {
            $push: { favourites: bookid }
        });
        res.status(200).json({ message: "Book added to favourites" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//remove favourite book
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, {
                $pull: { favourites: bookid }
            });
            return  res.status(200).json({ message: "Book removed from favourites" });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//get favourite books of user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('favourites');
        const favouriteBooks = userData.favourites;
        res.json({
            status: "success",
            data: favouriteBooks,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
        
    }
});
module.exports = router;