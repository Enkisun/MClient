import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from '../../slices/authSlice';
import SubmitButton from '../elements/submitButton';

const useStyles = makeStyles(
	(theme) => ({
		form: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
			textAlign: 'center',
		},
		title: {
			marginBottom: theme.spacing(1),
		},
		formData: {
			marginBottom: theme.spacing(5),
		},
		field: {
			marginBottom: theme.spacing(2),
			'&:nth-of-type(3)': {
				marginBottom: (props) => theme.spacing(props.error ? 2 : 0),
			},
		},
		submitWrapper: {
			width: '100%',
		},
		link: {
			color: theme.palette.secondary.main,
			textTransform: 'capitalize',
			textDecoration: 'underline',
		},
		loginWrapper: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	}),
	{
		name: 'Register',
	}
);

const RegisterPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { isLoading, token } = useSelector((s) => s.auth);
	const [formError, setFormError] = useState('');
	const styles = useStyles({ error: !!formError });
	const {
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		watch,
		reset,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirm: '',
		},
	});
	const watchFields = watch(['email', 'password', 'confirm']);
	const isEmptyFields = watchFields.every((i) => i);

	useEffect(() => {
		if (token) {
			history.push('/');
		}
	}, [token, history]);

	const handleChangeEmail = (e) => {
		setValue('email', e.target.value);
		setFormError('');
		clearErrors();
	};

	const handleChangePassword = (e) => {
		setValue('password', e.target.value);
		setFormError('');
		clearErrors();
	};

	const handleChangeConfirm = (e) => {
		setValue('confirm', e.target.value);
		setFormError('');
		clearErrors();
	};

	const resetFields = () => {
		reset({ email: '', password: '', confirm: '' }, { keepErrors: true });
	};

	const onSubmit = async (data) => {
		const { email, password, confirm } = data;

		if (confirm !== password) {
			resetFields();
			setError('password', {
				type: 'manual',
				message: '',
			});
			return setFormError('Password mismatch');
		}

		try {
			unwrapResult(await dispatch(register({ email, password })));
			history.push('/home');
		} catch (errData) {
			resetFields();
			if (!errData.errors) {
				return setFormError(errData.message);
			}

			if (errData.message) setFormError(errData.message);
			if (errData.errors[0].param === 'email') {
				setError('email', { type: 'server', message: errData.errors[0].msg });
			} else
				setError('password', {
					type: 'server',
					message: errData.errors[0].msg,
				});

			if (errData.errors[1]) {
				setError('password', {
					type: 'server',
					message: errData.errors[1].msg,
				});
			}
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Box>
				<Typography className={styles.title} variant="h4">
					Sign up
				</Typography>
				<Box marginBottom={2}>
					<Typography variant="caption">
						Please fill this form to create an account
					</Typography>
				</Box>
				<Box className={styles.formData}>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								label="Email"
								value={field.email}
								{...field}
								onChange={handleChangeEmail}
								className={styles.field}
								error={errors.email && !!errors.email.type}
								helperText={errors.email && errors.email.message}
								placeholder="Enter your email"
								variant="outlined"
								type="email"
								autoFocus
								fullWidth
								required
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField
								label="Password"
								value={field.password}
								{...field}
								onChange={handleChangePassword}
								className={styles.field}
								error={errors.password && !!errors.password.type}
								helperText={errors.password && errors.password.message}
								placeholder="Enter your password"
								variant="outlined"
								type="password"
								fullWidth
								required
							/>
						)}
					/>
					<Controller
						name="confirm"
						control={control}
						render={({ field }) => (
							<TextField
								label="Confirm password"
								value={field.confirm}
								{...field}
								onChange={handleChangeConfirm}
								className={styles.field}
								error={errors.password && !!errors.password.type}
								placeholder="Enter your password"
								variant="outlined"
								type="password"
								autoComplete="false"
								fullWidth
								required
							/>
						)}
					/>
					{!!formError && <Typography color="error">{formError}</Typography>}
				</Box>
			</Box>
			<Box className={styles.submitWrapper}>
				<SubmitButton
					isLoading={isLoading}
					disabled={!isEmptyFields || !!formError}
					text="Sign up"
				/>
				<Box className={styles.loginWrapper}>
					<Typography>Do you have an account?</Typography>
					<Button className={styles.link} href="/login" component={Link}>
						Sign in
					</Button>
				</Box>
			</Box>
		</form>
	);
};

export default RegisterPage;
