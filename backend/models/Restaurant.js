import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    image: { type: String },
    cuisine: { type: [String] }, // e.g., ['North Indian', 'Chinese']
    rating: { type: Number, default: 4.0 },
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;