import { v2 as cloudinary } from 'cloudinary';
import asyncHandler from 'express-async-handler';
import fs from 'fs';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// Cloudinary config (you can move this to config/env.js)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// =========================
// 📦 PRODUCT CONTROLLERS
// =========================

// @desc    Add new product
// @route   POST /api/shop/products
// @access  Admin
export const addProduct = asyncHandler(async (req, res) => {
  const { name, category, price, description, countInStock, deliveryDate } = req.body;

  let imageUrl = '';
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'greenguide/shop',
    });
    imageUrl = result.secure_url;
    fs.unlinkSync(req.file.path); // delete local file
  }

  const newProduct = new Product({
    name,
    category,
    price,
    description,
    countInStock,
    deliveryDate,
    image: imageUrl,
  });

  const saved = await newProduct.save();
  res.status(201).json(saved);
});

// @desc    Edit a product
// @route   PUT /api/shop/products/:id
// @access  Admin
export const editProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error('Product not found');

  const { name, category, price, description, countInStock, deliveryDate } = req.body;

  product.name = name || product.name;
  product.category = category || product.category;
  product.price = price || product.price;
  product.description = description || product.description;
  product.countInStock = countInStock ?? product.countInStock;
  product.deliveryDate = deliveryDate || product.deliveryDate;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'greenguide/shop',
    });
    product.image = result.secure_url;
    fs.unlinkSync(req.file.path);
  }

  const updated = await product.save();
  res.json(updated);
});

// @desc    Delete a product
// @route   DELETE /api/shop/products/:id
// @access  Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error('Product not found');
  await product.deleteOne();
  res.json({ message: 'Product deleted successfully' });
});

// @desc    Get all products
// @route   GET /api/shop/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;

  const query = {};

  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
});

// @desc    Create new review
// @route   POST /api/shop/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// =========================
// 🧾 ORDER CONTROLLERS
// =========================

// @desc    Create new order
// @route   POST /api/shop/orders
// @access  User
export const createOrder = asyncHandler(async (req, res) => {
  const { products, totalAmount, deliveryDate } = req.body;

  const newOrder = new Order({
    user: req.user._id,
    products,
    totalAmount,
    paymentStatus: 'Paid',
    deliveryDate,
  });

  const savedOrder = await newOrder.save();
  res.status(201).json(savedOrder);
});

// @desc    Get user's orders
// @route   GET /api/shop/orders
// @access  User
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('products.product');
  res.json(orders);
});

// @desc    Get all orders (admin)
// @route   GET /api/shop/admin/orders
// @access  Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user products.product');
  res.json(orders);
});
