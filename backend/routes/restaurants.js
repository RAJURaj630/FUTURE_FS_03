import express from "express";
import {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

// 🏬 Public Routes
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);

// 🔐 Admin Routes
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;