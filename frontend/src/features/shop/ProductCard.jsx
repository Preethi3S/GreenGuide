import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, clearCart } from './shopSlice';

const ProductCard = ({ product, showBuyNow = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOutOfStock = product.countInStock <= 0;

  const handleAdd = () => {
    if (!isOutOfStock) {
      dispatch(addToCart({ product, quantity: 1 }));
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      dispatch(clearCart());
      dispatch(addToCart({ product, quantity: 1 }));
      navigate('/checkout');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className={`relative rounded-3xl border border-secondary/10 p-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden ${
        isOutOfStock ? 'opacity-60 pointer-events-none' : ''
      }`}
    >
      {/* Image with zoom & shine */}
      <div className="relative overflow-hidden h-72 bg-light-bg">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Quick Action Overlay */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 z-20">
            <button
              className="flex-1 bg-white text-secondary px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-lg"
              onClick={handleAdd}
              disabled={isOutOfStock}
            >
              Add to Cart
            </button>
            {showBuyNow && (
              <button
                className="flex-1 bg-secondary text-white px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-lg"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
              >
                Buy Now
              </button>
            )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 text-left">
        <div className="flex justify-between items-start mb-2">
           <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{product.category}</p>
           <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < (product.rating || 0) ? "currentColor" : "none"} 
                    className={i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 font-bold">({product.numReviews || 0})</span>
           </div>
        </div>
        <h3 className="text-xl font-serif font-bold text-secondary mb-2 group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
        <p className="text-lg font-bold text-primary">₹{product.price}</p>
      </div>

      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 backdrop-blur-sm bg-white/70 flex items-center justify-center text-red-600 text-lg font-semibold z-30"
        >
          Out of Stock
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductCard;
