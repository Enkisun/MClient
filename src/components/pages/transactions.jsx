import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
	Box,
	Typography,
	TextField,
	Grid,
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
import { createExpense } from '../../slices/transactionsSlice';
import { getCategories } from '../../slices/categoriesSlice';
import SubmitButton from '../ui-kit/submitButton';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	titleWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
	},
	categoriesGroup: {
		flexGrow: 1,
		flexWrap: 'wrap',
	},
	categoryButton: {
		flexGrow: 1,
		maxWidth: '33.3%',
		width: '100%',
	},
	gridItem: {
		overflow: 'hidden',
	},
	category: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	newCategoryButton: {
		flex: '1 0 auto',
		padding: 0,
	},
	newCategoryIconWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	newCategoryIcon: {
		transform: 'scale(1.3)',
		marginBottom: theme.spacing(1),
	},
}));

const TransactionsPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { categories } = useSelector((s) => s.categories);
	const { isLoading } = useSelector((s) => s.transactions);

	const [state, setState] = useState({ amount: '', note: '' });
	const [category, setCategory] = useState('New');
	const [date, setDate] = useState(new Date());
	const [error, setError] = useState('');

	const styles = useStyles({ error: !!error });

	useEffect(() => {
		const fetch = () => {
			dispatch(getCategories()).then((response) =>
				setCategory(response.payload[0].name)
			);
		};
		fetch();
	}, []);

	const handler = (e) => {
		setState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		setError('');
	};

	const handleDateChange = (value) => {
		setDate(value);
		setError('');
	};

	const handleCategoryChange = (event, newCategory) => {
		if (newCategory) {
			setCategory(newCategory);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const getCategory = categories.find((item) => item.name === category);

		try {
			unwrapResult(
				await dispatch(
					createExpense({ ...state, date, categoryId: getCategory._id })
				)
			);
			history.push('/home');
		} catch (errData) {
			return setError(errData);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Box className={styles.titleWrapper}>
				<Typography variant="h5">New transaction</Typography>
			</Box>
			<Box className={styles.formData}>
				<Grid className={styles.amountWrapper}>
					<TextField
						id="amount"
						name="amount"
						value={state.amount}
						onChange={handler}
						inputProps={{ min: '0.01', step: '0.01', width: 'auto' }}
						className={styles.fieldAmount}
						type="number"
						label="Amount"
						variant="outlined"
						inputMode="numeric"
						autoComplete="off"
						required
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Box justifycontent="space-around">
							<KeyboardDatePicker
								id="date-picker-dialog"
								label="Date"
								format="MM/dd/yyyy"
								name="date"
								value={date}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'Change date',
								}}
								maxDate={new Date()}
								inputVariant="outlined"
								fullWidth
								required
							/>
						</Box>
					</MuiPickersUtilsProvider>
				</Grid>
				<TextField
					id="note"
					name="note"
					label="Note"
					value={state.note}
					onChange={handler}
					className={styles.field}
					placeholder="Description"
					variant="outlined"
					autoComplete="off"
					fullWidth
				/>
				<Paper elevation={0} className={styles.categoriesWrapper}>
					<Typography className={styles.categoriesTitle}>Category *</Typography>
					<Grid container>
						<ToggleButtonGroup
							value={category}
							exclusive
							onChange={handleCategoryChange}
							className={styles.categoriesGroup}
							aria-label="text alignment"
						>
							{categories.map((item) => (
								<ToggleButton
									value={item.name}
									aria-label="left aligned"
									className={styles.categoryButton}
									key={item.name}
								>
									<Grid item className={styles.gridItem}>
										{item.emoji}
										<Typography className={styles.category}>
											{item.name}
										</Typography>
									</Grid>
								</ToggleButton>
							))}
							<ToggleButton
								className={styles.categoryButton}
								value="New"
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
									<Box className={styles.newCategoryIconWrapper}>
										<AddCircleIcon className={styles.newCategoryIcon} />
										<Typography>New</Typography>
									</Box>
								</IconButton>
							</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
				</Paper>
				{!!error && <Typography color="error">{error}</Typography>}
			</Box>
			<SubmitButton
				isLoading={isLoading}
				disabled={
					!state.amount ||
					!category ||
					!date ||
					!!error ||
					new Date(date) > new Date() ||
					category === 'New'
				}
				text="Create"
			/>
		</form>
	);
};
export default TransactionsPage;
