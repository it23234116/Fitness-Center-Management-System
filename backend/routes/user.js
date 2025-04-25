const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); 


const jwt = require("jsonwebtoken");
const SECRET_KEY = "secrettoken";


////create a user
const UserModel = require("../models/user");
router.post("/", async (req, res) => {
  try {
    const { email, firstName, lastName, password,phone,height,weight, role } = req.body; // Fix: Extract values properly

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "You already have an account on this email" });
    }
    const hashpassword = await bcrypt.hash(password,10)
    const user = new UserModel({ email, firstName, lastName, password:hashpassword,phone,height,weight, role });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });

  }
});


///// updateuser


router.put("/:id", async (req, res) => {
    const { firstName, lastName, email,phone,height,weight, role } = req.body;
  
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update fields if provided
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (height) user.height = height;
      if (weight) user.weight = weight;
      if (role) {
        if (!["admin", "member"].includes(role)) {
          return res.status(400).json({ message: "Invalid role" });
        }
        user.role = role;
      }
  
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  });
//////// Delete User

router.delete("/:id", async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  });

  
  ///// Get user


  router.get("/:id", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id).select("-password"); // Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  });
  

  /////Get all users


  router.get("/", async (req, res) => {
    try {
      const users = await UserModel.find().select("-password"); // Exclude passwords
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  });
  

      // Check if the email already exists

  router.get('/email-check/:email', async (req, res) => {
    try {
      const existingUser = await UserModel.findOne({ email: req.params.email });
      if (existingUser) {
        return res.status(200).json({ exists: true });
      }
      res.status(200).json({ exists: false });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/login", async(req,res)=>{
    const {email, password} = req.body;

    const user= await UserModel.findOne({email:email})
    
    if(!user){return res.status(404).json ({error:"User Dosent Exists"});}

    bcrypt.compare(password,user.password).then((match)=>{
      if(!match) {return res.status(401).json({error:"Wrong Username and Password Combination"});}

     const accessToken = jwt.sign(
      {email:user.email, id:user._id, role: user.role},
      SECRET_KEY,
      { expiresIn: "1h" }
     );   res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: { id: user._id, email: user.email, role: user.role }
    });

    }).catch(err => {
      res.status(500).json({ error: "Internal Server Error" });
    });
  })


module.exports = router;
