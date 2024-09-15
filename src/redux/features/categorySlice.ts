import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Category } from '@/types';

type CategoryState = {
  isFetch: boolean;
  isLoading: boolean;
  error: any;
  keys: CategoryKeys;
  listIds: number[];
};

type CategoryKeys = {
  [key: number]: Category;
};

const defaultReduxData = {
  isFetch: false,
  isLoading: false,
  error: null,
  keys: {},
  listIds: [],
};

export const getCategoryList = createAsyncThunk(
  'getCategoryList',
  async () => {
    const headers = {
      ptauthorize: 'Basic dGVzdGVyOnRlc3Rlcg==',
    };
    const url = 'https://pantip.com/api/forum-service/home/get_room_recommend';
    try {
      const res = await axios({
        url,
        method: 'GET',
        headers,
      });
      return res.data?.data || [];
    } catch (e) {
      console.error(e);
      return e;
    }
  },
);

const initialState = defaultReduxData as CategoryState;
const reducerName = 'category';
export const category = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      const categories: Category[] = action.payload || [];
      const keys: any = {};
      categories.forEach((category) => {
        keys[category.id] = category;
      });
      state.keys = keys;
      state.listIds = categories.map(category => category.id);
      state.isFetch = true;
      state.isLoading = false;
    });
    builder.addCase(getCategoryList.rejected, (state, action) => {
      state.isFetch = false;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default category.reducer;

export const categorySliceReducer = { [reducerName]: category.reducer };
