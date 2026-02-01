import express from 'express';
const router = express.Router();

import {
    addProduct,
    createOrder,
    createProductReview,
    deleteProduct,
    editProduct,
    getAllOrders,
    getAllProducts,
    getUserOrders,
} from '../controllers/shopController.js';

import { placeOrder } from '../controllers/orderController.js';

import { isAdmin, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

// ==============================
// 🌿 Product Routes
// ==============================

// Public: Browse all products
router.get('/products', getAllProducts);

// User: Add review
router.post('/products/:id/reviews', protect, createProductReview);

// Admin: Add new product (with image upload)
router.post('/products', protect, isAdmin, upload.single('image'), addProduct);

// Admin: Edit product
router.put('/products/:id', protect, isAdmin, upload.single('image'), editProduct);

// Admin: Delete product
router.delete('/products/:id', protect, isAdmin, deleteProduct);

// ==============================
// 🧾 Order Routes
// ==============================

// User: Place new order
router.post('/orders', protect, createOrder);

// User: View own orders
router.get('/orders', protect, getUserOrders);

// Admin: View all orders
router.get('/admin/orders', protect, isAdmin, getAllOrders);

router.post('/place-order', protect, placeOrder);
export default router;
