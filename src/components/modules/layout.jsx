import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, makeStyles } from '@material-ui/core';
import Header from './header';
import BottomNavigation from './bottomNavigation';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			height: (props) => !props.token && '100%',
		},
		main: {
			flexGrow: 1,
			padding: (props) =>
				props.token ? theme.spacing(2, 2, 12) : theme.spacing(2),
			overflow: 'auto',
		},
	}),
	{
		name: 'Layout',
	}
);

const Layout = ({ children }) => {
	const token = useSelector((s) => s.auth.token);
	const styles = useStyles({ token });

	return (
		<Box className={styles.container}>
			<Header isAuth={!!token} />
			<Paper component="main" className={styles.main}>
				{children}
			</Paper>
			{!!token && <BottomNavigation />}
		</Box>
	);
};

export default Layout;
