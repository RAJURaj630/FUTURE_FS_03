// seedMenuItems.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "./models/menuItemModel.js";

dotenv.config();

const restaurantIds = {
    "Mario's Pizzeria": "688e11ca443dfbc6ee61f37a",
    "Spice Paradise": "688e11ca443dfbc6ee61f37c",
    "Burger Junction": "688e11ca443dfbc6ee61f37e",
    "Sweet Dreams Bakery": "688e11ca443dfbc6ee61f380",
    "Dragon Palace": "688e11ca443dfbc6ee61f382",
    "Café Delight": "688e11ca443dfbc6ee61f384",
    "Chennai Tiffin Center": "688e11ca443dfbc6ee61f386",
    "Madras Meals": "688e11ca443dfbc6ee61f388",
    "Chettinad Spice Kitchen": "688e11ca443dfbc6ee61f38a",
};

const menuData = {
    "Mario's Pizzeria": [
        { name: "Margherita Pizza", image: "https://source.unsplash.com/800x600/?margherita,pizza", price: 8.99 },
        { name: "Pepperoni Pizza", image: "https://source.unsplash.com/800x600/?pepperoni,pizza", price: 9.99 },
        { name: "BBQ Chicken Pizza", image: "https://source.unsplash.com/800x600/?bbq,chicken,pizza", price: 10.99 },
        { name: "Four Cheese Pizza", image: "https://source.unsplash.com/800x600/?cheese,pizza", price: 9.49 },
        { name: "Veggie Supreme Pizza", image: "https://source.unsplash.com/800x600/?veggie,pizza", price: 9.49 },
        { name: "Garlic Bread", image: "https://source.unsplash.com/800x600/?garlic,bread", price: 4.99 },
        { name: "Pasta Alfredo", image: "https://source.unsplash.com/800x600/?alfredo,pasta", price: 7.99 },
        { name: "Lasagna", image: "https://source.unsplash.com/800x600/?lasagna", price: 8.99 },
        { name: "Tiramisu", image: "https://source.unsplash.com/800x600/?tiramisu,dessert", price: 5.99 },
        { name: "Caprese Salad", image: "https://source.unsplash.com/800x600/?caprese,salad", price: 6.99 },
    ],
    "Spice Paradise": [
        { name: "Butter Chicken", image: "https://source.unsplash.com/800x600/?butter,chicken", price: 11.99 },
        { name: "Paneer Tikka", image: "https://source.unsplash.com/800x600/?paneer,tikka", price: 9.49 },
        { name: "Chicken Biryani", image: "https://source.unsplash.com/800x600/?chicken,biryani", price: 10.49 },
        { name: "Dal Makhani", image: "https://source.unsplash.com/800x600/?dal,makhani", price: 8.99 },
        { name: "Naan Bread", image: "https://source.unsplash.com/800x600/?naan,bread", price: 2.99 },
        { name: "Rogan Josh", image: "https://source.unsplash.com/800x600/?rogan,josh", price: 12.49 },
        { name: "Samosa", image: "https://source.unsplash.com/800x600/?samosa", price: 3.99 },
        { name: "Chole Bhature", image: "https://source.unsplash.com/800x600/?chole,bhature", price: 7.49 },
        { name: "Gulab Jamun", image: "https://source.unsplash.com/800x600/?gulab,jamun", price: 4.49 },
        { name: "Masala Chai", image: "https://source.unsplash.com/800x600/?masala,chai", price: 2.99 },
    ],
    "Burger Junction": [
        { name: "Classic Beef Burger", image: "https://source.unsplash.com/800x600/?beef,burger", price: 7.99 },
        { name: "Cheeseburger", image: "https://source.unsplash.com/800x600/?cheese,burger", price: 8.49 },
        { name: "Bacon Burger", image: "https://source.unsplash.com/800x600/?bacon,burger", price: 8.99 },
        { name: "Veggie Burger", image: "https://source.unsplash.com/800x600/?veggie,burger", price: 7.49 },
        { name: "Chicken Burger", image: "https://source.unsplash.com/800x600/?chicken,burger", price: 7.99 },
        { name: "Double Patty Burger", image: "https://source.unsplash.com/800x600/?double,burger", price: 9.49 },
        { name: "French Fries", image: "https://source.unsplash.com/800x600/?french,fries", price: 3.49 },
        { name: "Onion Rings", image: "https://source.unsplash.com/800x600/?onion,rings", price: 3.99 },
        { name: "Milkshake", image: "https://source.unsplash.com/800x600/?milkshake", price: 4.99 },
        { name: "Grilled Chicken Sandwich", image: "https://source.unsplash.com/800x600/?grilled,chicken,sandwich", price: 6.99 },
    ],
    "Sweet Dreams Bakery": [
        { name: "Chocolate Croissant", image: "https://source.unsplash.com/800x600/?chocolate,croissant", price: 3.99 },
        { name: "Blueberry Muffin", image: "https://source.unsplash.com/800x600/?blueberry,muffin", price: 2.99 },
        { name: "Strawberry Tart", image: "https://source.unsplash.com/800x600/?strawberry,tart", price: 4.49 },
        { name: "Cheesecake", image: "https://source.unsplash.com/800x600/?cheesecake", price: 5.49 },
        { name: "Macarons", image: "https://source.unsplash.com/800x600/?macarons", price: 6.49 },
        { name: "Chocolate Cake", image: "https://source.unsplash.com/800x600/?chocolate,cake", price: 5.99 },
        { name: "Apple Pie", image: "https://source.unsplash.com/800x600/?apple,pie", price: 4.99 },
        { name: "Banana Bread", image: "https://source.unsplash.com/800x600/?banana,bread", price: 3.99 },
        { name: "Lemon Tart", image: "https://source.unsplash.com/800x600/?lemon,tart", price: 4.49 },
        { name: "Cinnamon Roll", image: "https://source.unsplash.com/800x600/?cinnamon,roll", price: 3.99 },
    ],
    "Dragon Palace": [
        { name: "Kung Pao Chicken", image: "https://source.unsplash.com/800x600/?kungpao,chicken", price: 10.49 },
        { name: "Sweet and Sour Pork", image: "https://source.unsplash.com/800x600/?sweet,sour,pork", price: 9.99 },
        { name: "Spring Rolls", image: "https://source.unsplash.com/800x600/?spring,rolls", price: 4.49 },
        { name: "Fried Rice", image: "https://source.unsplash.com/800x600/?fried,rice", price: 8.49 },
        { name: "Dumplings", image: "https://source.unsplash.com/800x600/?dumplings", price: 5.99 },
        { name: "Peking Duck", image: "https://source.unsplash.com/800x600/?peking,duck", price: 14.99 },
        { name: "Chow Mein", image: "https://source.unsplash.com/800x600/?chow,mein", price: 9.49 },
        { name: "Hot and Sour Soup", image: "https://source.unsplash.com/800x600/?hot,sour,soup", price: 4.99 },
        { name: "Mapo Tofu", image: "https://source.unsplash.com/800x600/?mapo,tofu", price: 8.99 },
        { name: "Sesame Chicken", image: "https://source.unsplash.com/800x600/?sesame,chicken", price: 10.99 },
    ],
    "Café Delight": [
        { name: "Cappuccino", image: "https://source.unsplash.com/800x600/?cappuccino", price: 3.49 },
        { name: "Latte", image: "https://source.unsplash.com/800x600/?latte", price: 3.99 },
        { name: "Espresso", image: "https://source.unsplash.com/800x600/?espresso", price: 2.99 },
        { name: "Mocha", image: "https://source.unsplash.com/800x600/?mocha", price: 3.99 },
        { name: "Iced Coffee", image: "https://source.unsplash.com/800x600/?iced,coffee", price: 3.49 },
        { name: "Bagel with Cream Cheese", image: "https://source.unsplash.com/800x600/?bagel,creamcheese", price: 2.99 },
        { name: "Avocado Toast", image: "https://source.unsplash.com/800x600/?avocado,toast", price: 4.99 },
        { name: "Blueberry Pancakes", image: "https://source.unsplash.com/800x600/?blueberry,pancakes", price: 5.49 },
        { name: "Waffles", image: "https://source.unsplash.com/800x600/?waffles", price: 5.49 },
        { name: "Chocolate Muffin", image: "https://source.unsplash.com/800x600/?chocolate,muffin", price: 2.99 },
    ],
    "Chennai Tiffin Center": [
        { name: "Idli", image: "https://source.unsplash.com/800x600/?idli", price: 2.49 },
        { name: "Vada", image: "https://source.unsplash.com/800x600/?vada", price: 2.49 },
        { name: "Dosa", image: "https://source.unsplash.com/800x600/?dosa", price: 3.49 },
        { name: "Pongal", image: "https://source.unsplash.com/800x600/?pongal", price: 3.99 },
        { name: "Upma", image: "https://source.unsplash.com/800x600/?upma", price: 3.49 },
        { name: "Poori", image: "https://source.unsplash.com/800x600/?poori", price: 3.99 },
        { name: "Sambar", image: "https://source.unsplash.com/800x600/?sambar", price: 2.99 },
        { name: "Rasam", image: "https://source.unsplash.com/800x600/?rasam", price: 2.99 },
        { name: "Filter Coffee", image: "https://source.unsplash.com/800x600/?filter,coffee", price: 1.99 },
        { name: "Kesari", image: "https://source.unsplash.com/800x600/?kesari", price: 2.49 },
    ],
    "Madras Meals": [
        { name: "Mini Tiffin", image: "https://source.unsplash.com/800x600/?southindian,tiffin", price: 4.99 },
        { name: "Curd Rice", image: "https://source.unsplash.com/800x600/?curd,rice", price: 3.99 },
        { name: "Lemon Rice", image: "https://source.unsplash.com/800x600/?lemon,rice", price: 3.49 },
        { name: "Tomato Rice", image: "https://source.unsplash.com/800x600/?tomato,rice", price: 3.49 },
        { name: "Tamarind Rice", image: "https://source.unsplash.com/800x600/?tamarind,rice", price: 3.49 },
        { name: "Veg Thali", image: "https://source.unsplash.com/800x600/?veg,thali", price: 6.99 },
        { name: "Sambar Vada", image: "https://source.unsplash.com/800x600/?sambar,vada", price: 3.49 },
        { name: "Rava Kesari", image: "https://source.unsplash.com/800x600/?rava,kesari", price: 2.99 },
        { name: "Masala Dosa", image: "https://source.unsplash.com/800x600/?masala,dosa", price: 3.99 },
        { name: "Pesarattu", image: "https://source.unsplash.com/800x600/?pesarattu", price: 3.99 },
    ],
    "Chettinad Spice Kitchen": [
        { name: "Chettinad Chicken", image: "https://source.unsplash.com/800x600/?chettinad,chicken", price: 11.99 },
        { name: "Pepper Chicken", image: "https://source.unsplash.com/800x600/?pepper,chicken", price: 10.99 },
        { name: "Mutton Curry", image: "https://source.unsplash.com/800x600/?mutton,curry", price: 12.99 },
        { name: "Fish Fry", image: "https://source.unsplash.com/800x600/?fish,fry", price: 9.99 },
        { name: "Prawn Masala", image: "https://source.unsplash.com/800x600/?prawn,masala", price: 13.49 },
        { name: "Kothu Parotta", image: "https://source.unsplash.com/800x600/?kothu,parotta", price: 8.49 },
        { name: "Chicken Biryani", image: "https://source.unsplash.com/800x600/?chettinad,biryani", price: 10.99 },
        { name: "Mutton Biryani", image: "https://source.unsplash.com/800x600/?mutton,biryani", price: 12.99 },
        { name: "Egg Curry", image: "https://source.unsplash.com/800x600/?egg,curry", price: 7.49 },
        { name: "Vegetable Kurma", image: "https://source.unsplash.com/800x600/?vegetable,kurma", price: 7.99 },
    ],
};

const seedMenuItems = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await MenuItem.deleteMany();
        console.log("✅ Existing menu items removed.");
        const menuItems = [];
        for (const [restaurantName, items] of Object.entries(menuData)) {
            const restaurantId = restaurantIds[restaurantName];
            items.forEach(item => {
                menuItems.push({
                    ...item,
                    description: `${item.name} - a signature dish at ${restaurantName}.`,
                    category: "Main Course",
                    restaurant: restaurantId,
                    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                    stock: Math.floor(Math.random() * 50) + 10,
                });
            });
        }
        await MenuItem.insertMany(menuItems);
        console.log(`✅ Inserted ${menuItems.length} menu items successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedMenuItems();