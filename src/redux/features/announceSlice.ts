import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Announce } from '@/types';

type AnnounceState = {
  isFetch: boolean;
  isLoading: boolean;
  error: any;
  keys: AnnounceKeys;
  listIds: number[];
};

type AnnounceKeys = {
  [key: number]: Announce;
};

const defaultReduxData = {
  isFetch: false,
  isLoading: false,
  error: null,
  keys: {},
  listIds: [],
};

export const getAnnounceList = createAsyncThunk(
  'getAnnounceList',
  async () => {
    const headers = {
      ptauthorize: 'Basic dGVzdGVyOnRlc3Rlcg==',
    };
    const url = 'https://pantip.com/api/forum-service/forum/get_announce';
    const params = {
      room: 'homepage',
      limit: 3,
    };
    try {
      const res = await axios({
        url,
        method: 'GET',
        headers,
        params,
      });
      return res.data?.data || [];
    } catch (e) {
      console.error(e);
      return e;
    }
  },
);

const initialState = defaultReduxData as AnnounceState;
const reducerName = 'announce';
export const announce = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnnounceList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAnnounceList.fulfilled, (state, action) => {
      const announces: Announce[] = action.payload || [];
      const keys: any = {};
      announces.forEach((announce) => {
        keys[announce.announce_id] = announce;
      });
      state.keys = keys;
      state.listIds = announces.map(announce => announce.announce_id);
      state.isFetch = true;
      state.isLoading = false;
    });
    builder.addCase(getAnnounceList.rejected, (state, action) => {
      state.isFetch = false;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default announce.reducer;

export const announceSliceReducer = { [reducerName]: announce.reducer };
