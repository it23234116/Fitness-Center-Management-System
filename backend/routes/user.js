const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secrettoken";
const dotenv = require("dotenv");
dotenv.config();

////create a user
const UserModel = require("../models/user");
router.post("/", async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      phone,
      height,
      weight,
      role,
    } = req.body; // Fix: Extract values properly

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "You already have an account on this email" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email,
      firstName,
      lastName,
      password: hashpassword,
      phone,
      height,
      weight,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///// updateuser

router.put("/:id", async (req, res) => {
  const { firstName, lastName, email, phone, height, weight, role } = req.body;

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

    // Set up email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sachinthawg36@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: "sachinthawg36@gmail.com",
      to: user.email, // Assuming your User model has an 'email' field
      subject: "Account Deletion Confirmation",
      text: `Hello ${user.firstName},\n\nYour account has been successfully deleted.\n\nRegards,\nTeam Maxxies`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "User deleted and email sent successfully" });
  } catch (error) {
    console.error("Error deleting user or sending email:", error);
    res
      .status(500)
      .json({ message: "Error deleting user or sending email", error });
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

router.get("/email-check/:email", async (req, res) => {
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ error: "User Dosent Exists" });
  }

  bcrypt
    .compare(password, user.password)
    .then((match) => {
      if (!match) {
        return res
          .status(401)
          .json({ error: "Wrong Username and Password Combination" });
      }

      const accessToken = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Login successful",
        token: accessToken,
        user: { id: user._id, email: user.email, role: user.role },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//forget password
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ status: "User does Not Exists" });
    }
    const token = jwt.sign({ id: user.id }, "RP_secret_Key", {
      expiresIn: "1h",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sachinthawg36@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: "sachinthawg36@gmail.com",
      to: email,
      subject: "Reset Your Password",
      text:
        "Click the Link to Reset the Password -" +
        " " +
        `http://localhost:3000/reset-password/${user.id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ status: "Success" });
      }
    });
  });
});
//reset password
router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  jwt.verify(token, "RP_secret_Key", (error, decoded) => {
    if (error) {
      return res.json({ status: "Error with Token" });
    } else {
      bcrypt
        .hash(newPassword, 10)
        .then((hash) => {
          UserModel.findByIdAndUpdate(id, { password: hash })
            .then((u) => res.send({ status: "Success" }))
            .catch((error) => res.send({ status: error }));
        })
        .catch((error) => res.send({ status: error }));
    }
  });
});
//request delete
router.put("/request-delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user and update the deleteRequest field to true
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { deleteRequest: true },
      { new: true } // return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Delete request submitted successfully", user });
  } catch (error) {
    console.error("Error submitting delete request:", error);
    res.status(500).json({ message: "Error submitting delete request", error });
  }
});

module.exports = router;
