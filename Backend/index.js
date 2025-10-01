require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const CategoryRouter = require("./Routers/CategoryRouter");
const ColorRouter = require("./Routers/ColorRouter");
const ProductRouter = require("./Routers/ProductRouter");
const AdminRouter = require("./Routers/AdminRouter");
const UserRouter = require("./Routers/UserRouter");
const OrderRouter = require("./Routers/OrderRouter");

const {GoogleGenAI} = require("@google/genai")

const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5153", "http://localhost:5173", "https://ishop-frontend-tau.vercel.app/"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(new Error("Not allowed by CORS")); // Block request
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // credentials: true,
  })
);

app.use(express.static("Public"));

app.use("/category", CategoryRouter);
app.use("/color", ColorRouter);
app.use("/product", ProductRouter);
app.use("/admin", AdminRouter);
app.use("/user", UserRouter);
app.use("/order", OrderRouter);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chatHistory = [];

app.post("/gemini/chat", async (req, res) => {
  const userMessage = req.body.message;


  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  chatHistory.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: chatHistory,
      config: {
        systemInstruction: `
You are an AI assistant chatbot named "ISHOP Assistant" created specifically to answer customer queries related to the ISHOP e-commerce website only.

🔒 IMPORTANT RULES:
- Do NOT answer any question that is unrelated to the ISHOP website.
- If a user asks about programming, jokes, personal questions, or anything outside ISHOP context, respond with: 
  "Sorry, I’m designed only to assist with the ISHOP e-commerce platform. Please ask something related to the website."
- Do NOT provide or write any code.
- You are NOT a general-purpose chatbot. You are built only for product-related support.

✅ You CAN answer questions like:
- "How to add a product to cart?"
- "How does payment via Razorpay work?"
- "What are the available categories?"
- "How to login as a user?"
- "Is my order confirmed?"
- "What technologies does ISHOP use?"

🧑‍💻 If the user asks: 
- "Who created this website?"
- "Who is the developer?"
- "Why was ISHOP built?"
- "Who made this platform?"

Then respond politely with:  
"This website was created by Dilip Sharma as a full-stack project. It was built to offer a complete online shopping experience with features like cart, payment integration, admin panel, and more."

Tone: Polite, professional, supportive.
`

      },
    });

    const reply = response.text;

    chatHistory.push({
      role: "model",
      parts: [{ text: reply }],
    });

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at Port 3000`);
  });
});
