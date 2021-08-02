import React from 'react';
import {
	Avatar,
	Box,
	ListItem,
	ListItemAvatar,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getDynamicIcon } from '../../../constants/iconNames';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			justifyContent: 'space-between',
		},
		transactionWrapper: {
			display: 'flex',
			alignItems: 'center',
		},
		avatarWrapper: {
			padding: theme.spacing(1),
			marginRight: theme.spacing(1),
			borderRadius: theme.spacing(2),
			backgroundColor: theme.palette.primary.main,
		},
		avatar: {
			backgroundColor: 'initial',
		},
		categoryIcon: {
			transform: 'scale(1.3)',
			color: theme.palette.primary.light,
		},
		primaryText: {
			fontWeight: '600',
		},
	}),
	{
		name: 'Transaction',
	}
);

const Transaction = ({ emoji, category, amount, note }) => {
	const styles = useStyles();
	const DynamicIcon = getDynamicIcon(emoji);
	return (
		<ListItem className={styles.container}>
			<Box className={styles.transactionWrapper}>
				<ListItemAvatar className={styles.avatarWrapper}>
					<Avatar className={styles.avatar}>
						<DynamicIcon className={styles.categoryIcon} />
					</Avatar>
				</ListItemAvatar>
				<Box>
					<Typography variant="h6">{category}</Typography>
					<Typography variant="body2">{note}</Typography>
				</Box>
			</Box>
			<Typography variant="h6">{amount}</Typography>
		</ListItem>
	);
};

export default Transaction;
