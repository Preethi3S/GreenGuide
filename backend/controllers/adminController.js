import asyncHandler from 'express-async-handler';
import moment from 'moment';
import User from '../models/userModel.js';
import Plant from '../models/plantModel.js';
import CommunityPost from '../models/communityModel.js';
import Order from '../models/orderModel.js'; // ✅ Shop orders

// @desc    Get full system analytics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();
  const plantCount = await Plant.countDocuments();
  const postCount = await CommunityPost.countDocuments();

  const bannedUsers = await User.countDocuments({ isBanned: true });
  const activeUsers = await User.countDocuments({ isBanned: false });

  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name email createdAt');

  const recentPosts = await CommunityPost.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('title createdAt');

  const roleCounts = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } },
  ]);

  const recentPostActivity = await CommunityPost.aggregate([
    {
      $match: {
        createdAt: { $gte: moment().subtract(7, 'days').toDate() },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const recentUserActivity = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: moment().subtract(7, 'days').toDate() },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // ✅ Shop stats
  const totalOrders = await Order.countDocuments();

  const totalRevenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);
  const totalRevenue = totalRevenueAgg[0]?.total || 0;

  const ordersPerDay = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: moment().subtract(7, 'days').toDate() },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const revenuePerDay = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: moment().subtract(7, 'days').toDate() },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        total: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const topProducts = await Order.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product",
      totalSold: { $sum: "$items.quantity" },
    },
  },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "productDetails",
    },
  },
  { $unwind: "$productDetails" },
  { $sort: { totalSold: -1 } },
  { $limit: 5 },
  {
    $project: {
      name: "$productDetails.name",
      totalSold: 1,
    },
  },
]);


  res.json({
    userCount,
    plantCount,
    postCount,
    bannedUsers,
    activeUsers,
    recentUsers,
    recentPosts,
    roleCounts,
    recentPostActivity,
    recentUserActivity,
    totalOrders,
    totalRevenue,
    ordersPerDay,
    revenuePerDay,
    topProducts,  });
});



// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.deleteOne();
  res.json({ message: 'User deleted' });
});

// @desc    Ban or unban a user
// @route   PATCH /api/admin/users/:id/ban
// @access  Private/Admin
export const banUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.isBanned = !user.isBanned; // toggle ban status
  await user.save();

  res.json({
    message: `User has been ${user.isBanned ? 'banned' : 'unbanned'}`,
    isBanned: user.isBanned,
  });
});
