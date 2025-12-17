const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./userAuth');

// signup route
router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // validation
        if (!username || username.length < 4) {
            return res.status(400).json({ message: "Username must be at least 4 characters" });
        }

        // check username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // check email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // password length
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//signin route
router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        await bcrypt.compare(password, existingUser.password, (err, data)=>{
            if(data){
                const authClaims = [
                    {name:existingUser.username},
                    {role:existingUser.role},
                ]
                const token = jwt.sign({authClaims},"bookStore123",{expiresIn : '30d'});
                res.status(200).json({id:existingUser._id, role:existingUser.role, token:token});
            }
            else{
                res.status(400).json({ message: "Invalid username or password" });
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get-user-info
router.get('/get-user-information', authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select('-password -__v');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "interal server error" });
    }
});



// update address   

// router.get("/get-user-information", authenticateToken, async (req, res) => {
//   try {
//     const userId = req.user.id;   // 🔥 FROM JWT, NOT HEADER

//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       status: "success",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// router.put('/update-address', authenticateToken, async (req, res) => {
//     try {
//         const { id } = req.headers;
//         const { address } = req.body;
//         await User.findByIdAndUpdate(id,{ address: address });
//         res.status(200).json({ message: "Address updated successfully" });
        
//     } catch (error) {
//         res.status(500).json({ message: "internal server error" });
//     }
// });

router.put("/update-user-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;

    await User.findByIdAndUpdate(id, { address });

    res.json({
      status: "Success",
      message: "Address updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An Error Occurred" });
  }
});


module.exports = router;



//1:17:38 admin and user roles (books)