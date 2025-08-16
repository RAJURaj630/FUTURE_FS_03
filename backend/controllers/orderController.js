// In real-world, this would involve order model, payments, status updates, etc.
let orders = [];

export const placeOrder = (req, res) => {
    const { userId, items, totalAmount } = req.body;
    const newOrder = {
        id: Date.now(),
        userId,
        items,
        totalAmount,
        status: "Pending",
    };
    orders.push(newOrder);
    res.status(201).json({ message: "Order placed", order: newOrder });
};

export const getOrdersByUser = (req, res) => {
    const { userId } = req.params;
    const userOrders = orders.filter(order => order.userId === userId);
    res.status(200).json(userOrders);
};

export const updateOrderStatus = (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = orders.find(o => o.id == orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    res.status(200).json({ message: "Order status updated", order });
};