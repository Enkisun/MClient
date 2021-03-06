import axios from 'axios';

const API_BASE = 'http://localhost:5000';
axios.defaults.baseURL = API_BASE;

export const fetchRegister = async (email, password) =>
	await axios.post(`/register`, { email, password });

export const fetchLogin = async (email, password) =>
	await axios.post(`/login`, { email, password });

export const fetchGetExpenses = async ({ from, to, spaceId, id }) =>
	await axios.get(
		`/transactions?from=${from}&to=${to}&spaceId=${spaceId}&id=${id}`
	);

export const fetchCreateExpense = async (
	amount,
	date,
	note,
	categoryId,
	spaceId,
	id
) =>
	await axios.post(`/transactions`, {
		amount,
		date,
		note,
		categoryId,
		spaceId,
		id,
	});

export const fetchGetCategories = async ({ spaceId, id }) =>
	await axios.get(`/categories?spaceId=${spaceId}&id=${id}`);

export const fetchCreateCategory = async (category, emoji, spaceId, id) =>
	await axios.post(`/categories`, {
		category,
		emoji,
		spaceId,
		id,
	});
