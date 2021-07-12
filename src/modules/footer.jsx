import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import {
	BottomNavigation,
	BottomNavigationAction,
	Link,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import AddIcon from '@material-ui/icons/Add';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			position: 'fixed',
			left: 0,
			right: 0,
			bottom: 0,
		},
		fab: {
			maxWidth: theme.spacing(7),
			backgroundColor: theme.palette.primary.main,
			borderRadius: '50%',
			border: `3px solid ${theme.palette.background.default}`,
			paddingTop: '0 !important',
			transform: 'translate(0px,-50%)',
		},
	}),
	{
		name: 'Footer',
	}
);

const Footer = () => {
	const history = useHistory();
	const styles = useStyles();
	const [value, setValue] = useState('');

	useEffect(() => {
		setValue(history.location.pathname);
	}, [history]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation
			value={value}
			onChange={handleChange}
			className={styles.container}
		>
			<BottomNavigationAction
				label="Home"
				value="/home"
				href="/home"
				color="textSecondary"
				icon={<HomeIcon />}
				component={Link}
			/>
			<BottomNavigationAction
				label="History"
				value="/history"
				href="#"
				color="textSecondary"
				icon={<HistoryIcon />}
				component={Link}
			/>
			<BottomNavigationAction
				value="/transactions"
				href="/transactions"
				color="textSecondary"
				icon={<AddIcon />}
				className={styles.fab}
				component={Link}
			/>
			<BottomNavigationAction
				label="Statistics"
				value="/statistics"
				href="#"
				color="textSecondary"
				icon={<AssessmentIcon />}
				component={Link}
			/>
			<BottomNavigationAction
				label="Settings"
				value="/settings"
				href="#"
				color="textSecondary"
				icon={<SettingsIcon />}
				component={Link}
			/>
		</BottomNavigation>
	);
};

export default Footer;
