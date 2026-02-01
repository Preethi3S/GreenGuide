import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from './shopSlice';

const Cart = () => {
  const cart = useSelector(state => state.shop.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-secondary mb-10 text-center">Your Shopping Cart</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-secondary/10">
            <span className="text-6xl block mb-6 opacity-50">🛒</span>
            <h3 className="text-2xl font-bold text-secondary mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-8">Looks like you haven't added any plants yet.</p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-secondary/5 flex flex-col sm:flex-row items-center gap-6 transition-transform hover:scale-[1.01]">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🌱</div>
                    )}
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h4 className="text-xl font-bold text-secondary mb-1">{item.product.name}</h4>
                    <p className="text-primary font-bold">₹{item.product.price}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-light-bg px-4 py-2 rounded-xl">
                    <button 
                      onClick={() => {
                        const newQty = Math.max(1, item.quantity - 1);
                        dispatch(updateQuantity({ id: item.product._id, quantity: newQty }));
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-secondary font-bold hover:bg-primary hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold text-secondary w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => {
                        const newQty = item.quantity + 1;
                        dispatch(updateQuantity({ id: item.product._id, quantity: newQty }));
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-secondary font-bold hover:bg-primary hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="text-red-400 hover:text-red-600 p-2 transition-colors"
                    onClick={() => dispatch(removeFromCart(item.product._id))}
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-secondary/10 sticky top-24">
                <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold">Free</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 my-4"></div>
                  <div className="flex justify-between text-xl font-bold text-secondary">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout <span>→</span>
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  Secure Checkout • Free Shipping on all orders
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
