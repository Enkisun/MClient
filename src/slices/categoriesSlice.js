import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCreateCategory, fetchGetCategories } from '../api/api';

export const getCategories = createAsyncThunk(
	'category/getCategories',
	async (_, { getState, rejectWithValue }) => {
		const { spaceId, id } = getState().auth.user;
		try {
			const response = await fetchGetCategories({
				spaceId,
				id,
			});

			return response.data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const createCategory = createAsyncThunk(
	'category/createCategory',
	async ({ category }, { getState, rejectWithValue }) => {
		const { spaceId, id } = getState().auth.user;

		try {
			await fetchCreateCategory(category, spaceId, id);
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const categoriesSlice = createSlice({
	name: 'category',
	initialState: {
		categories: [],
		isLoading: false,
		isNewCategory: false,
	},
	extraReducers: {
		[getCategories.pending]: (state) => {
			state.isLoading = true;
		},
		[getCategories.fulfilled]: (state, action) => {
			state.categories = action.payload;
			state.isLoading = false;
		},
		[getCategories.rejected]: (state) => {
			state.isLoading = false;
		},
		[createCategory.pending]: (state) => {
			state.isLoading = true;
		},
		[createCategory.fulfilled]: (state) => {
			state.isLoading = false;
		},
		[createCategory.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const categoriesReducer = categoriesSlice.reducer;
