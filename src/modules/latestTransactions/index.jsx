import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import sortTransactions from '../../utils/sortTransactions';
import ConvertDate from '../../utils/convertDate';
import Transaction from './transaction';

const useStyles = makeStyles(
	() => ({
		titleWrapper: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
	}),
	{
		name: 'LatestTransactions',
	}
);

const LatestTransactions = () => {
	const styles = useStyles();
	const { transactions } = useSelector((s) => s.transactions);
	const [transactionsArr, setTansactionsArr] = useState([]);

	useEffect(() => {
		setTansactionsArr(sortTransactions(transactions));
	}, [transactions]);

	return (
		<>
			<Box className={styles.titleWrapper}>
				<Typography variant="h6">Latest Transactions</Typography>
				<Button variant="contained">Show All</Button>
			</Box>
			<List>
				{transactionsArr.map((item) =>
					item.type ? (
						<ConvertDate date={item.date} key={item.id} />
					) : (
						<Transaction key={item._id} {...item} />
					)
				)}
			</List>
		</>
	);
};

export default LatestTransactions;
