import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g., Seeds, Fertilizers, etc.
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // allow virtual fields in response
    toObject: { virtuals: true },
  }
);

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

productSchema.add({
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
});

// ✅ Virtual field for frontend fading logic
productSchema.virtual('isSoldOut').get(function () {
  return this.countInStock === 0;
});

const Product = mongoose.model('Product', productSchema);

export default Product;
