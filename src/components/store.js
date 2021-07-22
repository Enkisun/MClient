import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	PERSIST,
	REHYDRATE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../slices/authSlice';
import { transactionsReducer } from '../slices/transactionsSlice';
import { categoriesReducer } from '../slices/categoriesSlice';

const authConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	auth: authReducer,
	transactions: transactionsReducer,
	categories: categoriesReducer,
});

const persistedReducer = persistReducer(authConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [PERSIST, REHYDRATE, REGISTER],
		},
	}),
});

window.store = store;

export const persistor = persistStore(store);
