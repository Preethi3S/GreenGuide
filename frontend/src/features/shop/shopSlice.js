import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch {}
};

// Create the shop slice
const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    cart: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      const exists = state.cart.find(item => item.product._id === product._id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.cart.push({ ...action.payload });
      }
      saveCartToStorage(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.product._id !== action.payload);
      saveCartToStorage(state.cart);
    },
  updateQuantity: (state, action) => {
  const item = state.cart.find(item => item.product._id === action.payload.id);
  if (item) {
    const qty = parseInt(action.payload.quantity);
    item.quantity = isNaN(qty) || qty <= 0 ? 1 : qty;
  }
  saveCartToStorage(state.cart);
},

    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = shopSlice.actions;

// Export reducer
export default shopSlice.reducer;
