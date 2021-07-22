import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
	() => ({
		container: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	}),
	{
		name: 'CategoryItem',
	}
);

const CategoryItem = ({ emoji, category }) => {
	const styles = useStyles();
	return (
		<ListItem className={styles.container}>
			<ListItemIcon>{emoji}</ListItemIcon>
			<ListItemText>{category}</ListItemText>
		</ListItem>
	);
};

export default CategoryItem;
