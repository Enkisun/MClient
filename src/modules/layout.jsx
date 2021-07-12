import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, makeStyles } from '@material-ui/core';
import Header from './header';
import Footer from './footer';

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
			<Header />
			<Paper component="main" className={styles.main}>
				{children}
			</Paper>
			{token && <Footer />}
		</Box>
	);
};

export default Layout;
