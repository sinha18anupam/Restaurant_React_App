import express from 'express';
import { postOrderStatus, getOrderStatus, updateOrderStatus } from '../Contex/OderstatusContex.js';

const router = express.Router();

// Route for creating order status
router.post('/orderstatus', postOrderStatus);

// Route for getting order status
router.get('/orderstatus/', getOrderStatus);

// Route for updating order status
router.put('/orderstatus/:statusid', updateOrderStatus);

export default router;
