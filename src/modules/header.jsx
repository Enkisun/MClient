import React from 'react';
import { AppBar, Toolbar, Button, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as LogoIcon } from '../assets/logo.svg';

const useStyles = makeStyles(
	(theme) => ({
		headerWrapper: {
			position: 'fixed',
			flexGrow: 1,
			padding: 0,
		},
		toolbar: {
			justifyContent: 'center',
		},
		logoWrapper: {
			padding: 0,
			height: theme.spacing(4),
		},
		logo: {
			width: theme.spacing(4),
			height: '100%',
			marginRight: theme.spacing(1),
		},
	}),
	{
		name: 'Header',
	}
);

const Header = () => {
	const styles = useStyles();
	return (
		<>
			<AppBar className={styles.headerWrapper} position="fixed">
				<Toolbar className={styles.toolbar}>
					<Button className={styles.logoWrapper} href="/" component={Link}>
						<SvgIcon className={styles.logo}>
							<LogoIcon />
						</SvgIcon>
						<Typography variant="h1">MTracker</Typography>
					</Button>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</>
	);
};

export default Header;
