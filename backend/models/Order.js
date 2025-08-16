import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        quantity: { type: Number },
    }, ],
    totalPrice: { type: Number },
    status: { type: String, enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"], default: "Pending" },
    deliveryAddress: { type: String },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;