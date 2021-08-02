import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';
import { TextField, Box, Typography, Paper } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { createCategory } from '../../slices/categoriesSlice';
import iconNames, { getDynamicIcon } from '../../constants/iconNames';
import SubmitButton from '../elements/submitButton';

const useStyles = makeStyles(
	(theme) => ({
		form: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			textAlign: 'center',
		},
		titleWrapper: {
			marginBottom: theme.spacing(4),
		},
		formData: {
			marginBottom: theme.spacing(5),
		},
		selectedFormData: {
			display: 'flex',
			alignItems: 'center',
			marginBottom: theme.spacing(2),
		},
		selectedIconWrapper: {
			display: 'flex',
			padding: 12,
			marginRight: theme.spacing(1),
			borderRadius: theme.spacing(2),
			backgroundColor: theme.palette.primary.main,
		},
		field: {
			marginBottom: theme.spacing(2),
			'& fieldset': {
				borderRadius: theme.spacing(2),
			},
		},
		categoriesWrapper: {
			width: '100%',
			borderRadius: theme.spacing(2),
			padding: theme.spacing(2),
			boxShadow: '0px 0px 0px 1px rgb(0 0 0 / 20%)',
			marginBottom: (props) => theme.spacing(props.error ? 2 : 0),
		},
		categoriesTitle: {
			marginBottom: theme.spacing(1),
			textAlign: 'initial',
		},
		categoriesGroup: {
			flexGrow: 1,
			flexWrap: 'wrap',
			width: '100%',
		},
		categoryButton: {
			flexGrow: 1,
			maxWidth: '33.3%',
			width: '100%',
		},
		newCategoryIcon: {
			width: theme.spacing(4),
			height: theme.spacing(4),
			color: theme.palette.text.secondary,
		},
	}),
	{
		name: 'NewCategory',
	}
);

const NewCategory = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((s) => s.categories);
	const [formError, setFormError] = useState('');
	const styles = useStyles({ error: !!formError });
	const { handleSubmit, setValue, watch, control } = useForm({
		defaultValues: {
			categoryName: '',
			categoryIcon: iconNames[0],
		},
	});
	const watchFields = watch(['categoryName', 'categoryIcon']);
	const SelectedIcon = getDynamicIcon(watchFields[1]);
	const isEmptyFields = watchFields.every((i) => i);

	const handleChangeCategoryName = (e) => {
		setValue('categoryName', e.target.value);
		setFormError('');
	};

	const handleChangeCategoryIcon = (event, newIcon) => {
		if (newIcon) {
			setValue('categoryIcon', newIcon);
		}
		setFormError('');
	};

	const onSubmit = async (data) => {
		const { categoryName, categoryIcon } = data;
		const category = categoryName.trim();
		if (!category) return setValue('categoryName', '');

		try {
			unwrapResult(
				await dispatch(createCategory({ category, emoji: categoryIcon }))
			);
		} catch (errData) {
			return setFormError(errData);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Box className={styles.titleWrapper}>
				<Typography variant="h5">Create a New Category</Typography>
			</Box>
			<Box className={styles.formData}>
				<Box className={styles.selectedFormData}>
					<Box className={styles.selectedIconWrapper}>
						<SelectedIcon className={styles.newCategoryIcon} />
					</Box>
					<Controller
						name="categoryName"
						control={control}
						render={({ field }) => (
							<TextField
								label="Category name"
								value={field.categoryName}
								{...field}
								onChange={handleChangeCategoryName}
								variant="outlined"
								autoComplete="off"
								fullWidth
								required
							/>
						)}
					/>
				</Box>
				<Paper elevation={0} className={styles.categoriesWrapper}>
					<Typography className={styles.categoriesTitle}>
						Category Icon *
					</Typography>
					<Controller
						name="categoryIcon"
						control={control}
						render={({ field }) => (
							<ToggleButtonGroup
								value={field.categoryIcon}
								{...field}
								onChange={handleChangeCategoryIcon}
								className={styles.categoriesGroup}
								aria-label="text alignment"
								exclusive
							>
								{iconNames.map((item) => {
									const DynamicIcon = getDynamicIcon(item);
									return (
										<ToggleButton
											value={item}
											aria-label="left aligned"
											className={styles.categoryButton}
											key={item}
										>
											<DynamicIcon className={styles.newCategoryIcon} />
										</ToggleButton>
									);
								})}
							</ToggleButtonGroup>
						)}
					/>
				</Paper>
				{!!formError && <Typography color="error">{formError}</Typography>}
			</Box>
			<SubmitButton
				isLoading={isLoading}
				disabled={!isEmptyFields || !!formError}
				text="Create"
			/>
		</form>
	);
};
export default NewCategory;
