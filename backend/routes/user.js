const express = require("express");
const router = express.Router();



////create a user
const UserModel = require("../models/user");
router.post("/", async (req, res) => {
  try {
    const { email, firstName, lastName, password, role } = req.body; // Fix: Extract values properly
    const user = new UserModel({ email, firstName, lastName, password, role });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log("err");
    res.status(500).json({ error: "Internal Server Error" });

  }
});


///// updateuser


router.put("/:id", async (req, res) => {
    const { firstName, lastName, email, role } = req.body;
  
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update fields if provided
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
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
  


module.exports = router;
