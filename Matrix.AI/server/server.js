// Import necessary packages
import express from "express";                   // Express framework for building APIs
import cors from "cors";                         // Middleware to handle Cross-Origin Resource Sharing
import "dotenv/config";                          // Load environment variables from .env file
import { clerkMiddleware, requireAuth } from '@clerk/express'; // Clerk for authentication
import aiRouter from "./routes/aiRoutes.js";

import connectcloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

// Initialize Express app
const app = express();
await connectcloudinary()

// Middlewares
app.use(cors());                                 // Allow cross-origin requests (frontend <-> backend)
app.use(express.json());                         // Parse incoming JSON request bodies
app.use(clerkMiddleware());      
               // Initialize Clerk middleware for authentication

// Public route
app.get("/", (req, res) => res.send("Server is live")); // Test route to confirm server is running

// Protected routes middleware
app.use(requireAuth());                          // Require authentication for all routes defined after this line
app.use('/api/ai',aiRouter)
app.use('/api/user',userRouter)



// Server listen
const PORT = process.env.PORT || 3000;           // Use PORT from .env or default to 3000
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`); // Log server URL
});
