import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
	categoriesSelectors,
	getCategories,
} from '../../slices/categoriesSlice';

const useStyles = makeStyles(
	(theme) => ({
		titleWrapper: {
			display: 'flex',
			alignItems: 'center',
			marginBottom: theme.spacing(4),
		},
	}),
	{
		name: 'Categories',
	}
);

const CategoriesPage = () => {
	const styles = useStyles();
	const location = useLocation();
	const dispatch = useDispatch();
	const categories = useSelector(categoriesSelectors.selectAll);

	useEffect(() => {
		dispatch(getCategories());
	}, []);

	return (
		<>
			<Box className={styles.titleWrapper}>
				<Typography variant="h5">Categories</Typography>
				<IconButton
					to={{
						pathname: '/new-category',
						state: { prevRoute: location.pathname },
					}}
					component={Link}
				>
					<AddCircleIcon className={styles.newCategoryIcon} />
				</IconButton>
			</Box>
			<List>
				{categories.map((item) => (
					<ListItem key={item.name}>{item.name}</ListItem>
				))}
			</List>
		</>
	);
};
export default CategoriesPage;
