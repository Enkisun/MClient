import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
	Box,
	Button,
	Link,
	Typography,
	TextField,
	MenuItem,
	Grid,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { createExpense } from '../../slices/transactionsSlice';
import { getCategories } from '../../slices/categoriesSlice';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	titleWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: theme.spacing(4),
	},
	formDataWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: theme.spacing(2),
	},
	formElement: {
		marginBottom: theme.spacing(2),
	},
}));

const TransactionsPage = () => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const { categories } = useSelector((s) => s.categories);

	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [note, setNote] = useState('');
	const [date, setDate] = useState(new Date());
	const [error, setError] = useState('');

	useEffect(() => {
		dispatch(getCategories());
	}, []);

	const handleDateChange = (value) => {
		setDate(value);
		setError('');
	};

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
		setError('');
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
		setError('');
	};

	const handleNoteChange = (e) => {
		setNote(e.target.value);
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			unwrapResult(
				await dispatch(createExpense({ amount, category, date, note }))
			);
		} catch (errData) {
			return setError(errData);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Box className={styles.titleWrapper}>
				<Button variant="contained" href="/home" component={Link}>
					Back
				</Button>
				<Typography variant="h5">New expense</Typography>
			</Box>
			<Box className={styles.formDataWrapper}>
				<TextField
					id="amount"
					name="amount"
					value={amount}
					onChange={handleAmountChange}
					className={styles.formElement}
					inputProps={{ min: '0.01', step: '0.01' }}
					type="number"
					label="Expense amount"
					variant="outlined"
					inputMode="numeric"
					fullWidth
					autoComplete="off"
					required
				/>
				<TextField
					select
					id="category"
					value={category}
					onChange={handleCategoryChange}
					className={styles.formElement}
					label="Select category"
					variant="outlined"
					fullWidth
					required
					SelectProps={{
						MenuProps: {
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left',
							},
							getContentAnchorEl: null,
						},
					}}
				>
					{categories.map((item) => (
						<MenuItem key={item._id} value={item.name}>
							{item.name}
						</MenuItem>
					))}
				</TextField>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid
						className={styles.formElement}
						container
						justifycontent="space-around"
					>
						<KeyboardDatePicker
							margin="normal"
							id="date-picker-dialog"
							label="Select date"
							format="MM/dd/yyyy"
							value={date}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
							maxDate={new Date()}
							fullWidth
							required
						/>
					</Grid>
				</MuiPickersUtilsProvider>
				<TextField
					id="note"
					label="Note"
					value={note}
					onChange={handleNoteChange}
					className={styles.formElement}
					placeholder="Description"
					fullWidth
				/>
				{!!error && <Typography color="error">{error}</Typography>}
			</Box>
			<Button variant="contained" type="submit">
				Create
			</Button>
		</form>
	);
};
export default TransactionsPage;
