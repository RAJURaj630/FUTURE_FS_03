import MenuItem from "../models/menuItemModel.js";

// Create a new menu item
export const createMenuItem = async(req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: "Failed to create menu item", details: err.message });
    }
};

// Get all menu items
export const getAllMenuItems = async(req, res) => {
    try {
        const items = await MenuItem.find().populate("restaurant");
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch menu items", details: err.message });
    }
};

// Get a single menu item by ID
export const getMenuItemById = async(req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id).populate("restaurant");
        if (!item) return res.status(404).json({ error: "Menu item not found" });
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving item", details: err.message });
    }
};

// Update a menu item
export const updateMenuItem = async(req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedItem) return res.status(404).json({ error: "Item not found" });
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item", details: err.message });
    }
};

// Delete a menu item
export const deleteMenuItem = async(req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: "Item not found" });
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete item", details: err.message });
    }
};