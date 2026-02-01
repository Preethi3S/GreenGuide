// models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // ✅ this is crucial
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  shippingInfo: {
    name: String,
    phone: String,
    address: String,
    city: String,
    zip: String,
  },
  totalAmount: Number,
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered'],
    default: 'Processing',
  },
  placedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
