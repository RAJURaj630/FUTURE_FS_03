import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String }, // e.g., Main Course, Beverages
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    rating: { type: Number, default: 4.0 },
    stock: { type: Number, default: 50 },
}, { timestamps: true });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;