import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { fetchGetExpenses, fetchCreateExpense } from '../api/api';

export const getExpenses = createAsyncThunk(
	'transaction/getExpenses',
	async ({ from, to }, { getState, rejectWithValue }) => {
		const { spaceId, id } = getState().auth.user;
		try {
			const response = await fetchGetExpenses({
				from: from || '',
				to: to || '',
				spaceId,
				id,
			});
			return response.data;
		} catch (e) {
			if (!e.response) {
				return rejectWithValue(e.message);
			}
			return rejectWithValue(e.response.data.message);
		}
	}
);

export const createExpense = createAsyncThunk(
	'transaction/createExpense',
	async ({ amount, date, note, categoryId }, { getState, rejectWithValue }) => {
		const { spaceId, id } = getState().auth.user;
		try {
			await fetchCreateExpense(amount, date, note, categoryId, spaceId, id);
		} catch (e) {
			if (!e.response) {
				return rejectWithValue(e.message);
			}
			return rejectWithValue(e.response.data.message);
		}
	}
);

export const transactionsAdapter = createEntityAdapter({
	selectId: (entity) => entity._id,
	sortComparer: (a, b) => a.date.localeCompare(b.date),
});

export const transactionsSlice = createSlice({
	name: 'transaction',
	initialState: transactionsAdapter.getInitialState({
		isLoading: false,
	}),
	extraReducers: {
		[getExpenses.pending]: (state) => {
			state.isLoading = true;
		},
		[getExpenses.fulfilled]: (state, action) => {
			transactionsAdapter.setAll(state, action.payload);
			state.isLoading = false;
		},
		[getExpenses.rejected]: (state) => {
			state.isLoading = false;
		},
		[createExpense.pending]: (state) => {
			state.isLoading = true;
		},
		[createExpense.fulfilled]: (state) => {
			state.isLoading = false;
		},
		[createExpense.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const transactionsSelectors = transactionsAdapter.getSelectors(
	(state) => state.transactions
);

export const transactionsReducer = transactionsSlice.reducer;
