import React from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { logout } from '../../slices/authSlice';

const HomePage = () => {
	const dispatch = useDispatch();

	const handleLoggedOut = () => {
		dispatch(logout());
	};

	return <Button onClick={handleLoggedOut}>Logout</Button>;
};
export default withRouter(HomePage);
