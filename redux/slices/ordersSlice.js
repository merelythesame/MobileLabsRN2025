import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        addOrder: (state, action) => {
            const { items, total } = action.payload;
            state.push({
                id: Date.now(),
                date: new Date().toISOString(),
                total,
                count: items.length,
            });
        },
        setOrders: (state, action) => action.payload,
    },
});

export const { addOrder, setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
