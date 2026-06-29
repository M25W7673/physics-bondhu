const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { askGemini } = require("./services/geminiService");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("🚀 Physics Bondhu API is Running!");
});

// AI Chat Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const reply = await askGemini(message);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Something went wrong.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
})
app.use(express.static("client"));