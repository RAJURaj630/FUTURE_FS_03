import express from "express";
import { getMenuByRestaurantId } from "../controllers/restaurantMenuController.js";

const router = express.Router();

// Fix: Add /menu in the route path
router.get("/:restaurantId", getMenuByRestaurantId);

export default router;