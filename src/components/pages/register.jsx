import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from '../../slices/authSlice';
import SubmitButton from '../ui-kit/submitButton';

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

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [error, setError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const styles = useStyles({ error: !!error });

	useEffect(() => {
		if (token) {
			history.push('/');
		}
	}, [token, history]);

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

	const handleConfirm = (e) => {
		setConfirm(e.target.value);
		setPasswordError('');
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (confirm !== password) {
			setPassword('');
			setConfirm('');
			return setPasswordError('Password mismatch');
		}

		try {
			unwrapResult(await dispatch(register({ email, password })));
			history.push('/home');
		} catch (errData) {
			if (!errData.errors) {
				return setError(errData.message);
			}

			if (errData.errors[0].param === 'email') {
				setEmailError(errData.errors[0].msg);
			} else setPasswordError(errData.errors[0].msg);

			if (errData.errors[1]) {
				return setPasswordError(errData.errors[1].msg);
			}
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
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
						className={styles.field}
						type="password"
						fullWidth
						required
					/>
					<TextField
						id="confirm"
						name="confirm"
						value={confirm}
						onChange={handleConfirm}
						error={!!passwordError}
						label="Confirm password"
						placeholder="Enter your password"
						variant="outlined"
						className={styles.field}
						type="password"
						autoComplete="false"
						fullWidth
						required
					/>
					{!!error && <Typography color="error">{error}</Typography>}
				</Box>
			</Box>
			<Box className={styles.submitWrapper}>
				<SubmitButton
					isLoading={isLoading}
					disabled={!email || !password || !confirm}
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
