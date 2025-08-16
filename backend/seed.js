import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Restaurant from './models/Restaurant.js';
import MenuItem from './models/menuItemModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const importData = async() => {
    try {
        const dataPath = path.join(__dirname, 'data', 'sample_restaurants.json');
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const restaurants = JSON.parse(jsonData);

        await Restaurant.deleteMany();
        await MenuItem.deleteMany();

        for (const restaurant of restaurants) {
            const createdRestaurant = await Restaurant.create({
                name: restaurant.name,
                cuisine: restaurant.cuisine,
                rating: restaurant.rating,
                deliveryTime: restaurant.deliveryTime,
                priceRange: restaurant.priceRange,
                offer: restaurant.offer,
                isPromoted: restaurant.isPromoted,
            });

            const menuItems = (restaurant.menu || []).map(item => ({
                ...item,
                restaurant: createdRestaurant._id,
            }));


            await MenuItem.insertMany(menuItems);
        }

        console.log('✅ Sample data inserted');
        process.exit();
    } catch (error) {
        console.error('❌ Failed to insert data', error);
        process.exit(1);
    }
};

importData();