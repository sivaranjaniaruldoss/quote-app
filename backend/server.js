// 🔹 Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// 🔹 Debug (Remove later if you want)
console.log("MONGO_URI:", process.env.MONGO_URI);

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => console.log("Connection Error ❌:", err));


// 🔹 Schema
const quoteSchema = new mongoose.Schema({
  name: String,
  quote: String
});

// 🔹 Model
const Quote = mongoose.model("Quote", quoteSchema);


// 🔹 POST Route
app.post("/submit", async (req, res) => {
  try {
    const { name, quote } = req.body;

    console.log("Received:", name, quote);

    const newQuote = new Quote({
      name,
      quote
    });

    await newQuote.save();

    console.log("Saved to MongoDB ✅");

    res.status(200).json({
      message: "Data saved successfully"
    });

  } catch (error) {
    console.error("Error saving ❌:", error);
    res.status(500).json({
      message: "Error saving data"
    });
  }
});


// 🔹 GET Route
app.get("/quotes", async (req, res) => {
  try {
    const allQuotes = await Quote.find();
    res.json(allQuotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotes" });
  }
});


// 🔹 Root Route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});


// 🔹 Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
