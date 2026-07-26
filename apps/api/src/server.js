const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./models/User");
const Admin = require("./models/Admin");
const Log = require("./models/Log");
const Group = require("./models/Group");
const createLog = require("./utils/createLog");
const startBot = require("./bot");
const authMiddleware = require("./middleware/auth");
const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ].filter(Boolean)
}));
app.use(express.json());

let botStatus = "offline";

// Test API
app.get("/", (req,res)=>{
    res.json({
        status:"online",
        name:"EasyBoy API",
        version:"1.0.0"
    });
});

// Login
app.post("/api/auth/login", async (req,res)=>{
    try{
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if(!admin){
            return res.status(401).json({
                error:"Invalid username or password"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.passwordHash);

        if(!isMatch){
            return res.status(401).json({
                error:"Invalid username or password"
            });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        await createLog(
            "Admin Login",
            `${admin.username} logged in`,
            admin._id.toString()
        );

        res.json({ token, username: admin.username });

    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// Dashboard Stats - REAL DATA (protected)
app.get("/api/stats", authMiddleware, async (req,res)=>{
    try{
        const usersCount = await User.countDocuments();
        const groupsCount = await Group.countDocuments();

        res.json({
            users: usersCount,
            groups: groupsCount,
            messages: "0",
            bot: botStatus
        });

    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// Users API - MongoDB (protected)
app.get("/api/users", authMiddleware, async (req,res)=>{
    try{
        const users = await User
        .find()
        .sort({
            createdAt:-1
        });
        res.json(users);
    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// Create Test User (protected)
app.post("/api/users", authMiddleware, async(req,res)=>{
    try{
        const user = await User.create(req.body);
        res.json(user);
    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// Delete User (protected)
app.delete("/api/users/:id", authMiddleware, async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if(user){
            await createLog(
                "User Deleted",
                `${user.name} (${user.username}) was removed`,
                user._id.toString()
            );
        }

        res.json({ success:true });
    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// Update User Role (protected)
app.patch("/api/users/:id/role", authMiddleware, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                error:"User not found"
            });
        }

        const oldRole = user.role;
        user.role = user.role === "Admin" ? "User" : "Admin";
        await user.save();

        await createLog(
            "Role Changed",
            `${user.name} changed from ${oldRole} to ${user.role}`,
            user._id.toString()
        );

        res.json(user);

    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// Groups API (protected)
app.get("/api/groups", authMiddleware, async (req,res)=>{
    try{
        const groups = await Group
        .find()
        .sort({
            createdAt:-1
        });
        res.json(groups);
    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// Delete Group (protected)
app.delete("/api/groups/:id", authMiddleware, async (req,res)=>{
    try{
        await Group.findByIdAndDelete(req.params.id);
        res.json({ success:true });
    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// Logs API - REAL DATA (protected)
app.get("/api/logs", authMiddleware, async (req,res)=>{
    try{
        const logs = await Log
        .find()
        .sort({
            createdAt:-1
        })
        .limit(100);

        res.json(logs);

    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(async ()=>{
    console.log("✅ MongoDB Connected");

    startBot();
    botStatus = "online";

    const userCount = await User.countDocuments();

    if(userCount === 0){
        await User.insertMany([
            {
                name:"Ali",
                username:"@ali_dev",
                telegramId:"1001",
                role:"Admin",
                status:"Active"
            },
            {
                name:"Reza",
                username:"@reza",
                telegramId:"1002",
                role:"User",
                status:"Active"
            }
        ]);
        console.log("👥 Users created");
    }

    const adminCount = await Admin.countDocuments();

    if(adminCount === 0){
        const passwordHash = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await Admin.create({
            username: process.env.ADMIN_USERNAME,
            passwordHash
        });

        console.log("🔐 Default admin created");
    }
})
.catch((err)=>{
    console.log(
        "MongoDB Error:",
        err.message
    );
    botStatus = "offline";
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(
        `🚀 EasyBoy API running on port ${PORT}`
    );
});