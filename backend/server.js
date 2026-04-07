const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔍 Debug (you already added this)
console.log("ENV CHECK:", process.env.MONGO_URI);

// 🌿 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log(err));


// 🌳 Import Routes
const treeRoutes = require("./routes/treeRoutes");

// 🌳 Use Routes
app.use("/api/trees", treeRoutes);


// ✅ Test Route (keep this)
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});


// 🚀 Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});