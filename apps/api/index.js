const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const logRoutes = require("./routes/logs");

const app = express();

app.use(cors());
app.use(express.json());

// اتصال به دیتابیس ابری
mongoose
  .connect("mongodb+srv://testuser:testpass123@cluster0.a1b2c.mongodb.net/easyboy_db?retryWrites=true&w=majority") // این لینک فقط برای تست است
  .then(() => console.log("🍃 API connected to Cloud MongoDB"))
  .catch((err) => console.log("MongoDB error:", err));

app.get("/api/stats", (req, res) => {
  res.json({
    users: 154,
    groups: 12,
    messages: "2.4K",
    bot: "online",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 EasyBoy API running on port ${PORT}`);
});