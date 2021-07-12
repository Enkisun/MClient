import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../slices/authSlice';
import Loader from '../elements/loader';

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
			marginBottom: theme.spacing(2),
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
		submit: {
			height: 42,
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

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const styles = useStyles({ error: !!error });

	useEffect(() => {
		if (token) {
			history.push('/');
		}
	}, [token, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			unwrapResult(await dispatch(login({ email, password })));
			history.push('/home');
		} catch (errData) {
			if (!errData.errors) {
				return setError(errData.message ? errData.message : errData);
			}

			if (errData.errors[0].param === 'email') {
				setEmailError(errData.errors[0].msg);
			} else setPasswordError(errData.errors[0].msg);

			if (errData.errors[1]) {
				return setPasswordError(errData.errors[1].msg);
			}
		}
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
		setEmailError('');
		setError('');
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
		setPasswordError('');
		setError('');
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Box>
				<Typography className={styles.title} variant="h4">
					Sign in
				</Typography>
				<Box className={styles.formData}>
					<TextField
						id="email"
						name="email"
						value={email}
						onChange={handleEmail}
						error={!!emailError}
						helperText={emailError}
						label="Email"
						placeholder="Enter your email"
						variant="outlined"
						type="email"
						className={styles.field}
						autoFocus
						fullWidth
						required
					/>
					<TextField
						id="password"
						name="password"
						value={password}
						onChange={handlePassword}
						error={!!passwordError}
						helperText={passwordError}
						label="Password"
						placeholder="Enter your password"
						variant="outlined"
						type="password"
						className={styles.field}
						fullWidth
						required
					/>
					{!!error && <Typography color="error">{error}</Typography>}
				</Box>
			</Box>
			<Box className={styles.submitWrapper}>
				<Button
					className={styles.submit}
					disabled={isLoading}
					variant="contained"
					type="submit"
					color="primary"
					fullWidth
				>
					{isLoading ? <Loader /> : `Sign in`}
				</Button>
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
