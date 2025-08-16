import express from 'express';
import {
    placeOrder,
    getOrdersByUser,
    updateOrderStatus,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', placeOrder); // POST /api/orders
router.get('/:userId', getOrdersByUser); // GET /api/orders/:userId
router.put('/:orderId', updateOrderStatus); // PUT /api/orders/:orderId

export default router;