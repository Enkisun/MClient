import React from 'react';
import { useSelector } from 'react-redux';
import { ListItem, ListItemText } from '@material-ui/core';

const Transaction = ({ amount, categoryId, note }) => {
	const { categories } = useSelector((s) => s.categories);
	const category = categories.find((item) => item._id === categoryId);

	return (
		<ListItem>
			<ListItemText>{category && category.name}</ListItemText>
			<ListItemText>{note}</ListItemText>
			<ListItemText>{amount}</ListItemText>
		</ListItem>
	);
};

export default Transaction;
