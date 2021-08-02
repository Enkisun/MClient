import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
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
	async ({ category, emoji }, { getState, rejectWithValue }) => {
		const { spaceId, id } = getState().auth.user;
		try {
			const response = await fetchCreateCategory(category, emoji, spaceId, id);
			return response.data.result;
		} catch (e) {
			if (!e.response) {
				return rejectWithValue(e.message);
			}
			return rejectWithValue(e.response.data.message);
		}
	}
);

export const categoriesAdapter = createEntityAdapter({
	selectId: (entity) => entity._id,
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const categoriesSlice = createSlice({
	name: 'category',
	initialState: categoriesAdapter.getInitialState({
		isLoading: false,
		createdCategory: {},
	}),
	extraReducers: {
		[getCategories.pending]: (state) => {
			state.isLoading = true;
		},
		[getCategories.fulfilled]: (state, action) => {
			categoriesAdapter.setAll(state, action.payload);
			state.isLoading = false;
		},
		[getCategories.rejected]: (state) => {
			state.isLoading = false;
		},
		[createCategory.pending]: (state) => {
			state.isLoading = true;
		},
		[createCategory.fulfilled]: (state, action) => {
			state.createdCategory = action.payload;
			state.isLoading = false;
		},
		[createCategory.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const categoriesSelectors = categoriesAdapter.getSelectors(
	(state) => state.categories
);

export const categoriesReducer = categoriesSlice.reducer;
