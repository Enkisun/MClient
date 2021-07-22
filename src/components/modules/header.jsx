import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	useScrollTrigger,
	Slide,
	SvgIcon,
	Menu,
	MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from '../../slices/authSlice';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { ReactComponent as BackIcon } from '../../assets/arrow-left.svg';

const useStyles = makeStyles(
	(theme) => ({
		headerWrapper: {
			position: 'fixed',
			flexGrow: 1,
			padding: 0,
		},
		toolbar: {
			justifyContent: 'space-between',
		},
		backIconWrapper: {
			visibility: (props) =>
				props.pathname === '/home' ? 'hidden' : 'visible',
			minWidth: 'initial',
			height: theme.spacing(7),
			marginRight: theme.spacing(1),
			color: theme.palette.primary.light,
		},
		backIcon: {
			width: theme.spacing(4),
			height: '100%',
		},
		logoWrapper: {
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
			height: theme.spacing(7),
		},
		logo: {
			width: theme.spacing(4),
			height: '100%',
			marginRight: theme.spacing(1),
		},
		accountWrapper: {
			minWidth: 'initial',
			height: theme.spacing(7),
			color: theme.palette.primary.light,
			transform: 'scale(1.3)',
		},
	}),
	{
		name: 'Header',
	}
);

const HideOnScroll = ({ children }) => {
	const trigger = useScrollTrigger();
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};

const Header = ({ isAuth }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { state, pathname } = history.location;
	const styles = useStyles({ pathname });
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLoggedOut = () => {
		dispatch(logout());
		handleClose();
	};

	return (
		<>
			<HideOnScroll>
				<AppBar className={styles.headerWrapper} position="fixed">
					<Toolbar className={styles.toolbar}>
						{isAuth && (
							<Button
								className={styles.backIconWrapper}
								to={{ pathname: state ? state.prevRoute : '/' }}
								component={Link}
							>
								<SvgIcon className={styles.backIcon}>
									<BackIcon />
								</SvgIcon>
							</Button>
						)}
						<Button
							className={styles.logoWrapper}
							to={{ pathname: '/' }}
							component={Link}
						>
							<SvgIcon className={styles.logo}>
								<LogoIcon />
							</SvgIcon>
							<Typography variant="h1">MTracker</Typography>
						</Button>
						{isAuth && (
							<>
								<Button
									className={styles.accountWrapper}
									aria-controls="menu"
									aria-haspopup="true"
									onClick={handleClick}
								>
									<AccountCircleIcon />
								</Button>
								<Menu
									id="menu"
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={handleClose}
									keepMounted
								>
									<MenuItem onClick={handleLoggedOut}>Logout</MenuItem>
								</Menu>
							</>
						)}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar />
		</>
	);
};

export default Header;
