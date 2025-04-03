import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => action.payload,

        addProduct: (state, action) => {
            state.push(action.payload);
        },

        updateProduct: (state, action) => {
            return state.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
        },

        updateProductPrice: (state, action) => {
            return state.map((product) =>
                product.id === action.payload.id
                    ? { ...product, price: action.payload.price }
                    : product
            );
        },

        removeProduct: (state, action) => {
            return state.filter((product) => product.id !== action.payload);
        },
    },
});

export const {
    setProducts,
    addProduct,
    updateProduct,
    updateProductPrice,
    removeProduct,
} = productSlice.actions;

export default productSlice.reducer;
