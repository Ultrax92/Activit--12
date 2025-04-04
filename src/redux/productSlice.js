import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => action.payload,
        updateProduct: (state, action) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { setProducts, updateProduct } = productSlice.actions;
export default productSlice.reducer;
