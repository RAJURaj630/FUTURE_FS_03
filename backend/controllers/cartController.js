// In a real app, cart data should be stored in DB per user.
// Here it's simplified as an in-memory object.
let cart = [];

export const addToCart = (req, res) => {
    const { menuItemId, quantity } = req.body;
    const existingItem = cart.find(item => item.menuItemId === menuItemId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ menuItemId, quantity });
    }

    res.status(200).json({ message: "Item added to cart", cart });
};

export const getCart = (req, res) => {
    res.status(200).json(cart);
};

export const removeFromCart = (req, res) => {
    const { menuItemId } = req.params;
    cart = cart.filter(item => item.menuItemId !== menuItemId);
    res.status(200).json({ message: "Item removed", cart });
};

export const clearCart = (req, res) => {
    cart = [];
    res.status(200).json({ message: "Cart cleared" });
};