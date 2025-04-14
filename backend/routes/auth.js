import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Admin } from "../models/Admin.js";

const router = express.Router();

// Signup - User
router.post("/signup", async (req, res) => {
    try {
        const { fullName, voterId, email, password } = req.body;
        // console.log("Received signup:", req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            voterId,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        // console.log("New user created:", newUser);

        res.status(201).json({ success: true, user: newUser, message: "User created successfully" });


    } catch (error) {
        console.error("Signup error:", error); // <--- catch and log the real issue
        res.status(500).json({ success: false, message: "Signup failed", error: error.message });
    }
});


// Login - User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Optional: Generate JWT
        // const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1d" });

        res.status(200).json({ success: true, message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Login failed", error: err.message });
    }
});

// Login - Admin
router.post("/admin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ success: true, message: "Admin login successful", admin });
    } catch (err) {
        res.status(500).json({ success: false, message: "Admin login failed", error: err.message });
    }
});

// Update user fullName
router.put("/update", async (req, res) => {
    const { email, fullName } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { fullName },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
});


export default router;