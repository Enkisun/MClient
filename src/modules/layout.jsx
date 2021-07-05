import React from 'react';
import { Box, Paper, makeStyles } from '@material-ui/core';
import Header from './header';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			height: '100%',
		},
		main: {
			height: '100%',
			flexGrow: 1,
			padding: theme.spacing(2),
		},
	}),
	{
		name: 'Layout',
	}
);

const Layout = ({ children }) => {
	const styles = useStyles();
	return (
		<Box className={styles.container}>
			<Header />
			<Paper component="main" className={styles.main}>
				{children}
			</Paper>
		</Box>
	);
};

export default Layout;
