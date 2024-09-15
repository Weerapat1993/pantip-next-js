import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

import type { PaginationNextId, SuggestTopicPages } from '@/types';

type SuggestTopicState = {
  keys: Keys;
};

type SuggestTopicData = {
  isFetch: boolean;
  isLoading: boolean;
  error: any;
  pages: SuggestTopicPages;
  pagination: PaginationNextId;
};

type Params = {
  key: 'room';
  page?: number;
  limit: number;
  ranking_time?: number;
  next_id?: number;
};

type Keys = {
  [key: string]: SuggestTopicData;
};

const defaultReduxData = {
  isFetch: false,
  isLoading: false,
  error: null,
  pages: {},
  pagination: {
    next_id: 1,
    ranking_time: 0,
  },
};

const initialState = {
  keys: {
    room: defaultReduxData,
    tag: defaultReduxData,
  },
} as SuggestTopicState;

export const getSuggestTopicListByType = createAsyncThunk('getSuggestTopicListByType', async (params: Params) => {
  try {
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'ptauthorize': 'Basic dGVzdGVyOnRlc3Rlcg==',
    };
    const url = 'https://pantip.com/api/forum-service/home/get_suggest_topic_popular';
    const data = {
      type: params.key,
      limit: params.limit,
      ranking_time: params.ranking_time,
      next_id: params.next_id,
    };
    const res = await axios({
      url,
      method: 'POST',
      headers,
      data: qs.stringify(data),
    });
    return res?.data || {};
  } catch (e) {
    console.error(e);
    return e;
  }
});

export const suggestTopic = createSlice({
  name: 'suggestTopic',
  initialState,
  reducers: {
    setPage: (state, action) => {
      const { key, next_id: page } = action.payload;
      if (!state.keys[key]) {
        state.keys[key] = defaultReduxData;
      }
      state.keys[key].pagination.next_id = page;
    },
    clearPages: (state, action) => {
      const { key, next_id: page } = action.payload;
      if (!state.keys[key]) {
        state.keys[key] = defaultReduxData;
      }
      state.keys[key].pagination.next_id = page;
      state.keys[key].pages = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSuggestTopicListByType.pending, (state, action) => {
      const { key } = action.meta.arg;
      if (!state.keys[key]) {
        state.keys[key] = defaultReduxData;
      }
      state.keys[key].isLoading = true;
      state.keys[key].error = null;
    });
    builder.addCase(getSuggestTopicListByType.fulfilled, (state, action) => {
      const { key, next_id } = action.meta.arg;
      const { data } = action.payload;
      if (!state.keys[key]) {
        state.keys[key] = defaultReduxData;
      }
      const page = next_id || 1;
      state.keys[key].isFetch = true;
      state.keys[key].isLoading = false;
      state.keys[key].error = null;
      state.keys[key].pages[page] = data?.[0] || null;
      state.keys[key].pagination.next_id = action.payload?.next_id || 1;
      state.keys[key].pagination.ranking_time = action.payload?.ranking_time || 0;
    });
    builder.addCase(getSuggestTopicListByType.rejected, (state, action) => {
      const { key } = action.meta.arg;
      if (!state.keys[key]) {
        state.keys[key] = defaultReduxData;
      }
      state.keys[key].isFetch = false;
      state.keys[key].isLoading = false;
      state.keys[key].error = action.payload;
    });
  },
});

export const {
  setPage,
  clearPages,
} = suggestTopic.actions;

export default suggestTopic.reducer;
