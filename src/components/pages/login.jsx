import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../slices/authSlice';
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
			marginBottom: theme.spacing(3),
		},
		formData: {
			marginBottom: theme.spacing(5),
		},
		field: {
			marginBottom: theme.spacing(2),
			'&:nth-of-type(2)': {
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
		forgot: {
			marginBottom: theme.spacing(2),
		},
		registerWrapper: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	}),
	{
		name: 'Login',
	}
);

const LoginPage = () => {
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
		},
	});
	const watchFields = watch(['email', 'password']);
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

	const resetFields = () => {
		reset({ email: '', password: '' }, { keepErrors: true });
	};

	const onSubmit = async (data) => {
		try {
			unwrapResult(await dispatch(login({ ...data })));
			history.push('/home');
		} catch (errData) {
			resetFields();
			if (!errData.errors) {
				return setFormError(errData.message ? errData.message : errData);
			}

			if (errData.message) setFormError(errData.message);
			if (errData.errors[0].param === 'email') {
				setError('email', {
					type: 'server',
					message: errData.errors[0].msg,
				});
			} else {
				setError('password', {
					type: 'server',
					message: errData.errors[0].msg,
				});
			}

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
					Sign in
				</Typography>
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
								error={errors.email && !!errors.email.message}
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
								error={errors.password && !!errors.password.message}
								helperText={errors.password && errors.password.message}
								placeholder="Enter your password"
								variant="outlined"
								type="password"
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
					text="Sign in"
				/>
				<Button
					className={`${styles.link} ${styles.forgot}`}
					href="/login"
					component={Link}
				>
					Forgot password?
				</Button>
				<Box className={styles.registerWrapper}>
					<Typography>Don&apos;t have an account?</Typography>
					<Button className={styles.link} href="/register" component={Link}>
						{` Sign Up Now`}
					</Button>
				</Box>
			</Box>
		</form>
	);
};

export default LoginPage;
