import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const token = useSelector((s) => s.auth.token);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (token) {
					return <Component />;
				}
				return (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				);
			}}
		/>
	);
};

export default ProtectedRoute;
