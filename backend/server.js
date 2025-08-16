// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import menuItemRoutes from "./routes/menuItems.js";
import restaurantRoutes from "./routes/restaurants.js";
import restaurantMenuRoutes from "./routes/restaurantMenu.js";

// Config
import connectDB from "./config/db.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/restaurant-menu", restaurantMenuRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});