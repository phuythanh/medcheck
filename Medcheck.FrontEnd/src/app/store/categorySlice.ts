import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from 'app/apis/categoryClient';
import { ACCESS_TOKEN_KEY } from 'app/apis/common/constants';
import { decodedToken } from 'app/utils/token';
import { CategoryResponse } from '../types/category';
import { RootState } from './store';
interface ISlice {
  items: CategoryResponse[];
  loading: boolean;
}
const initialState: ISlice = {
  items: [],
  loading: false,
};

export const fetchCategoriesAsync = createAsyncThunk('counter/fetchCount', async () => {
  const response = await fetchCategories();
  return response;
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export const { setCategories } = categorySlice.actions;
export const Categories = (state: RootState) => state.category.items;
export default categorySlice.reducer;
