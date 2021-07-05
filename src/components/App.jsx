import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../constants/theme';
import Layout from '../modules/layout';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './pages/home';
import ProtectedRoute from './elements/protectedRoute';

const App = () => (
	<MuiThemeProvider theme={theme}>
		<BrowserRouter>
			<CssBaseline />
			<Switch>
				<Layout>
					<ProtectedRoute path="/home" component={HomePage} />
					<Route path="/register">
						<RegisterPage />
					</Route>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
				</Layout>
			</Switch>
		</BrowserRouter>
	</MuiThemeProvider>
);

export default App;
