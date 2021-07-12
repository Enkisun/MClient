import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
			return rejectWithValue(e.message);
		}
	}
);

export const createExpense = createAsyncThunk(
	'transaction/createExpense',
	async ({ amount, category, date, note }, { getState, rejectWithValue }) => {
		const { spaceId, id } = getState().auth.user;
		try {
			await fetchCreateExpense(amount, category, date, note, spaceId, id);
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const transactionsSlice = createSlice({
	name: 'transaction',
	initialState: {
		transactions: [],
		isLoading: false,
	},
	extraReducers: {
		[getExpenses.pending]: (state) => {
			state.isLoading = true;
		},
		[getExpenses.fulfilled]: (state, action) => {
			state.transactions = action.payload;
			state.isLoading = false;
		},
		[getExpenses.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const transactionsReducer = transactionsSlice.reducer;
