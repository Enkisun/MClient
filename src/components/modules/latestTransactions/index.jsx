import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, IconButton, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HistoryIcon from '@material-ui/icons/History';
import { getExpenses } from '../../../slices/transactionsSlice';
import { getCategories } from '../../../slices/categoriesSlice';
import selectors from '../../../selectors';
import TransactionDate from './transactionDate';
import Transaction from './transaction';

const useStyles = makeStyles(
	() => ({
		titleWrapper: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		date: {
			textAlign: 'center',
		},
	}),
	{
		name: 'LatestTransactions',
	}
);

const LatestTransactions = () => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const transactions = useSelector(selectors.selectGroupedByDayTransactions);

	useEffect(() => {
		dispatch(getExpenses({ from: '', to: '' }));
		dispatch(getCategories());
	}, []);

	return (
		<>
			<Box className={styles.titleWrapper}>
				<Typography variant="h5">Mounth Transactions</Typography>
				<IconButton href="#" component={Link}>
					<HistoryIcon />
				</IconButton>
			</Box>
			<List>
				{transactions.map((item) => (
					<Box key={item[0]}>
						<TransactionDate
							className={styles.date}
							date={item[0]}
							key={item[0]}
						/>
						{item[1].map((transaction) => (
							<Transaction key={transaction._id} {...transaction} />
						))}
					</Box>
				))}
			</List>
		</>
	);
};

export default LatestTransactions;
