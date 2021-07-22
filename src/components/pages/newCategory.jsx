import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { TextField, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createCategory, getCategories } from '../../slices/categoriesSlice';
import SubmitButton from '../ui-kit/submitButton';

const useStyles = makeStyles(
	(theme) => ({
		titleWrapper: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: theme.spacing(4),
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
		},
		formData: {
			marginBottom: theme.spacing(5),
		},
	}),
	{
		name: 'NewCategory',
	}
);

const NewCategory = () => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const [newCategory, setNewCategory] = useState('');
	const [error, setError] = useState('');
	const { categories, isLoading } = useSelector((s) => s.categories);

	useEffect(() => {
		dispatch(getCategories());
	}, []);

	const handleNewCategoryChange = (e) => {
		setNewCategory(e.target.value);
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const category = newCategory.trim();
		const isExist = categories.some(
			(item) => item.name.toLowerCase() === category.trim().toLowerCase()
		);
		if (isExist) return setError('This category already exists');
		if (!category) return setNewCategory('');

		try {
			unwrapResult(await dispatch(createCategory({ category })));
		} catch (errData) {
			return setError(errData);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Box className={styles.titleWrapper}>
				<Typography variant="h5">Create a New Category</Typography>
			</Box>
			<Box className={styles.formData}>
				<TextField
					id="newCategory"
					name="newCategory"
					label="Category name"
					value={newCategory}
					onChange={handleNewCategoryChange}
					variant="outlined"
					error={!!error}
					helperText={error}
					autoComplete="off"
					fullWidth
					required
				/>
			</Box>
			<SubmitButton
				isLoading={isLoading}
				disabled={!newCategory}
				text="Create"
			/>
		</form>
	);
};
export default NewCategory;
