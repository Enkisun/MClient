import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
	Box,
	Typography,
	TextField,
	Paper,
	IconButton,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
	categoriesSelectors,
	getCategories,
} from '../../slices/categoriesSlice';
import { createExpense } from '../../slices/transactionsSlice';
import { getDynamicIcon } from '../../constants/iconNames';
import SubmitButton from '../elements/submitButton';

const useStyles = makeStyles((theme) => ({
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
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: theme.spacing(5),
	},
	amountWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: theme.spacing(2),
		width: '100%',
	},
	fieldAmount: {
		flexGrow: 1,
		marginRight: theme.spacing(1),
		'& fieldset': {
			borderRadius: theme.spacing(2),
		},
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
	category: {
		width: '100%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	newCategoryButton: {
		flex: '1 0 auto',
		padding: 0,
	},
	categoryWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		overflow: 'hidden',
	},
	categoryIcon: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		marginBottom: theme.spacing(1),
		color: '#842645',
	},
}));

const TransactionsPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const categories = useSelector(categoriesSelectors.selectAll);
	const { createdCategory } = useSelector((s) => s.categories);
	const { isLoading } = useSelector((s) => s.transactions);
	const [formError, setFormError] = useState('');
	const styles = useStyles({ error: !!formError });
	const { handleSubmit, setValue, watch, control } = useForm({
		defaultValues: {
			amount: '',
			date: new Date(),
			note: '',
			categoryId: '',
		},
	});
	const watchFields = watch(['amount', 'date', 'categoryId']);
	const isEmptyFields = watchFields.every((i) => i);

	useEffect(() => {
		const fetch = () => {
			dispatch(getCategories()).then((response) => {
				if (createdCategory && createdCategory._id) {
					return setValue('categoryId', createdCategory._id);
				}
				setValue('categoryId', response.payload[0]._id);
			});
		};
		fetch();
	}, []);

	const handleChangeAmount = (e) => {
		setValue('amout', e.target.value);
		setFormError('');
	};

	const handleChangeDate = (value) => {
		setValue('date', value);
		setFormError('');
	};

	const handleChangeNote = (e) => {
		setValue('note', e.target.value);
		setFormError('');
	};

	const handleChangeCategory = (event, newCategory) => {
		if (newCategory) {
			setValue('categoryId', newCategory);
		}
		setFormError('');
	};

	const onSubmit = async (data) => {
		try {
			unwrapResult(await dispatch(createExpense({ ...data })));
			history.push('/home');
		} catch (errData) {
			return setFormError(errData);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Box className={styles.titleWrapper}>
				<Typography variant="h5">New transaction</Typography>
			</Box>
			<Box className={styles.formData}>
				<Box className={styles.amountWrapper}>
					<Controller
						name="amount"
						control={control}
						render={({ field }) => (
							<TextField
								label="Amount"
								value={field.amount}
								onChange={handleChangeAmount}
								className={styles.fieldAmount}
								inputProps={{ min: '0.01', step: '0.01', width: 'auto' }}
								type="number"
								variant="outlined"
								inputMode="numeric"
								autoComplete="off"
								required
								{...field}
							/>
						)}
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Box justifycontent="space-around">
							<Controller
								name="date"
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<KeyboardDatePicker
										label="Date"
										value={rest.date}
										onChange={handleChangeDate}
										KeyboardButtonProps={{
											'aria-label': 'Change date',
										}}
										maxDate={new Date()}
										format="MM/dd/yyyy"
										inputVariant="outlined"
										fullWidth
										required
										{...rest}
									/>
								)}
							/>
						</Box>
					</MuiPickersUtilsProvider>
				</Box>
				<Controller
					name="note"
					control={control}
					render={({ field }) => (
						<TextField
							label="Note"
							value={field.note}
							onChange={handleChangeNote}
							className={styles.field}
							placeholder="Description"
							variant="outlined"
							autoComplete="off"
							fullWidth
							{...field}
						/>
					)}
				/>
				<Paper elevation={0} className={styles.categoriesWrapper}>
					<Typography className={styles.categoriesTitle}>Category *</Typography>
					<Controller
						name="categoryId"
						control={control}
						render={({ field }) => (
							<ToggleButtonGroup
								value={field.categoryId}
								{...field}
								onChange={handleChangeCategory}
								className={styles.categoriesGroup}
								aria-label="text alignment"
								exclusive
							>
								{categories.map((item) => {
									const DynamicIcon = getDynamicIcon(item.emoji);
									return (
										<ToggleButton
											value={item._id}
											aria-label="left aligned"
											className={styles.categoryButton}
											key={item._id}
										>
											<Box className={styles.categoryWrapper}>
												<DynamicIcon className={styles.categoryIcon} />
												<Typography className={styles.category}>
													{item.name}
												</Typography>
											</Box>
										</ToggleButton>
									);
								})}
								<ToggleButton
									className={styles.categoryButton}
									value={0}
									aria-label="new"
								>
									<IconButton
										className={styles.newCategoryButton}
										to={{
											pathname: '/new-category',
											state: { prevRoute: history.location.pathname },
										}}
										component={Link}
									>
										<Box className={styles.categoryWrapper}>
											<AddCircleIcon className={styles.categoryIcon} />
											<Typography>New</Typography>
										</Box>
									</IconButton>
								</ToggleButton>
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
export default TransactionsPage;
