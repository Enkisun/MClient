import React from 'react';
import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
	() => ({
		container: {
			justifyContent: 'space-between',
		},
		transactionWrapper: {
			display: 'flex',
			alignItems: 'center',
		},
	}),
	{
		name: 'Transaction',
	}
);

const Transaction = ({ emoji, category, amount, note }) => {
	const styles = useStyles();
	return (
		<ListItem className={styles.container}>
			<Box className={styles.transactionWrapper}>
				<ListItemIcon>{emoji}</ListItemIcon>
				<Box>
					<ListItemText>{category}</ListItemText>
					<ListItemText>{note}</ListItemText>
				</Box>
			</Box>
			<ListItemText>{amount}</ListItemText>
		</ListItem>
	);
};

export default Transaction;
