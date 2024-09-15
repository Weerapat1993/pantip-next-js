import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '@/types';

type ProductState = {
  isFetch: boolean;
  isLoading: boolean;
  error: any;
  keys: ProductKeys;
  listIds: number[];
};

type ProductKeys = {
  [key: number]: Product;
};

const defaultReduxData = {
  isFetch: false,
  isLoading: false,
  error: null,
  keys: {},
  listIds: [],
};

const initialState = defaultReduxData as ProductState;
const reducerName = 'product';
export const product = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    getProductList: (state, action) => {
      const products: Product[] = action.payload || [];
      const keys: any = {};
      products.forEach((product) => {
        keys[product.id] = product;
      });
      state.keys = keys;
      state.listIds = products.map(product => product.id);
    },
    updateProductById: (state, action) => {
      const product: Product = action.payload;
      state.keys[product.id] = product;
    },
    removeProductById: (state, action) => {
      const id: number = action.payload;
      delete state.keys[id];
      state.listIds = state.listIds.filter(key => key !== id);
    },
  },
});

export const { getProductList, updateProductById, removeProductById }
    = product.actions;
export default product.reducer;

export const productSliceReducer = { [reducerName]: product.reducer };
