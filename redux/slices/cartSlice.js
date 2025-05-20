import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find(i => i.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) item.quantity = quantity;
            state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload);
            state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        }
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
