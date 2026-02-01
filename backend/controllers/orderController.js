import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const placeOrder = asyncHandler(async (req, res) => {
  const { cartItems, shippingInfo, totalAmount } = req.body;

  if (!cartItems || cartItems.length === 0) {
    res.status(400);
    throw new Error('No items in cart');
  }

  const productDetails = [];

  for (const item of cartItems) {
    const dbProduct = await Product.findById(item.product);

    if (!dbProduct) {
      res.status(404);
      throw new Error('Product not found');
    }

    const quantity = parseInt(item.quantity);

    if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
    res.status(400);
    throw new Error(`Invalid quantity for ${dbProduct.name}`);
  }

    if (dbProduct.countInStock < quantity) {
      res.status(400);
      throw new Error(`Not enough stock for ${dbProduct.name}`);
    }

    // Reduce stock safely
    dbProduct.countInStock = dbProduct.countInStock - quantity;

    // Only update stock without triggering full validation
    await Product.updateOne(
      { _id: dbProduct._id },
      { $set: { countInStock: dbProduct.countInStock } }
    );

    // Push to products array
    productDetails.push({
      product: dbProduct._id,
      name: dbProduct.name,
      price: dbProduct.price,
      qty: quantity,
    });
  }

  const order = await Order.create({
    user: req.user._id,
    products: productDetails,
    shippingInfo,
    totalAmount,
    status: 'Processing',
    placedAt: new Date(),
  });

  res.status(201).json(order);
});
