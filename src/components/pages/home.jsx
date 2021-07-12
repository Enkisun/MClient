import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Link } from '@material-ui/core';
import { logout } from '../../slices/authSlice';
import ChartPie from '../../modules/charts/chartPie';
import LatestTransactions from '../../modules/latestTransactions';
import { getExpenses } from '../../slices/transactionsSlice';
import { getCategories } from '../../slices/categoriesSlice';

const HomePage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getExpenses({ from: '', to: '' }));
		dispatch(getCategories());
	}, []);

	const handleLoggedOut = () => {
		dispatch(logout());
	};

	return (
		<>
			<Button onClick={handleLoggedOut} variant="contained">
				Logout
			</Button>
			<Button variant="contained" href="/transactions" component={Link}>
				&#43; Add a transaction
			</Button>
			<ChartPie />
			<LatestTransactions />
		</>
	);
};
export default HomePage;
