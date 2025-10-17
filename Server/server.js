// server/server.js

import express from "express";
import cors from "cors"; // Re-importing the cors library
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

// --- GROQ CONFIGURATION ---
const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const GROQ_MODEL = "llama-3.1-8b-instant";

// --- CORS CONFIGURATION FOR STREAMING ---
// This is the standard and correct way to handle this.
const corsOptions = {
  origin: ["http://localhost:8081", "https://smart-recipe-generator-prabhav.vercel.app"], // Your React app's address
  methods: "GET,POST",
  credentials: true, // Allows cookies or session info if you ever need it
};
app.use(cors(corsOptions));
// This handles the "preflight" request for more complex requests
//app.options("*", cors(corsOptions)); 

app.use(express.json());

app.get("/recipeStream", async (req, res) => {
  try {
    const { ingredients, mealType, cuisine, cookingTime, complexity } = req.query;
    console.log("Received query for Groq:", req.query);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    // Explicitly flush headers to the client
    res.flushHeaders(); 

    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const prompt = [
      "Generate a recipe that incorporates the following details:",
      `[Ingredients: ${ingredients || "Not specified"}]`,
      `[Meal Type: ${mealType || "Any"}]`,
      `[Cuisine Preference: ${cuisine || "Any"}]`,
      `[Cooking Time: ${cookingTime || "Flexible"}]`,
      `[Complexity: ${complexity || "Moderate"}]`,
      "You are a master chef. Provide a detailed recipe formatted in Markdown.",
      "Include sections for a suitable name, a brief description, ingredients, and step-by-step instructions.",
      "Only use the provided ingredients."
    ].join(" ");

    const stream = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });
    
    if (!stream) {
      throw new Error("Failed to create a stream from the API.");
    }

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      sendEvent({ action: "chunk", chunk: content });
    }

    sendEvent({ action: "close" });

  } catch (err) {
    console.error("Error in /recipeStream route:", err);
    res.write(`data: ${JSON.stringify({ action: "error", message: "Failed to generate recipe from Groq." })}\n\n`);
  } finally {
    res.end();
  }

  req.on("close", () => {
    console.log("Client disconnected");
    res.end();
  });
});

app.get("/", (req, res) => {
  res.send("Smart Recipe Generator backend is running ✅");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});