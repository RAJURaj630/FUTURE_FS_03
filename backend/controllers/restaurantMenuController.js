import MenuItem from "../models/menuItemModel.js";

// Get all menu items for a specific restaurant
export const getMenuByRestaurantId = async(req, res) => {
    try {
        const { restaurantId } = req.params;

        // Find all menu items where restaurant matches the given ID
        const menuItems = await MenuItem.find({ restaurant: restaurantId });

        if (!menuItems.length) {
            return res.status(404).json({ message: "No menu items found for this restaurant" });
        }

        res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};