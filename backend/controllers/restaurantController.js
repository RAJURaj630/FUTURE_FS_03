import Restaurant from "../models/Restaurant.js";

export const getAllRestaurants = async(req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch restaurants" });
    }
};

export const getRestaurantById = async(req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.status(200).json(restaurant);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch restaurant" });
    }
};

export const createRestaurant = async(req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(400).json({ error: "Failed to create restaurant" });
    }
};

export const deleteRestaurant = async(req, res) => {
    const { id } = req.params;
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete restaurant" });
    }
};

export const updateRestaurant = async(req, res) => {
    const { id } = req.params;
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedRestaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.status(200).json(updatedRestaurant);
    } catch (err) {
        res.status(400).json({ error: "Failed to update restaurant" });
    }
};