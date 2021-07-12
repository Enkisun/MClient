import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#90caf9',
			main: '#1a202c',
			dark: '#000',
		},
		secondary: {
			light: '#ffeb67',
			main: '#f9b934',
			dark: '#c28900',
		},
		text: {
			primary: '#1a202c',
			secondary: '#fff',
		},
		background: {
			default: '#fff',
		},
		action: {
			disabledBackground: '#000',
		},
	},
	typography: {
		button: {
			fontSize: '1rem',
			textTransform: 'none',
		},
		h1: {
			fontSize: '1.5rem',
			color: '#fff',
		},
	},
	overrides: {
		MuiFormLabel: {
			root: {
				color: '#1a202c',
			},
		},
		MuiBottomNavigation: {
			root: {
				backgroundColor: '#1a202c',
			},
		},
		MuiBottomNavigationAction: {
			root: {
				minWidth: 0,
				padding: 0,
				color: '#fff',
				'&$selected': {
					color: '#f9b934',
				},
			},
		},
	},
	breakpoints: {
		values: {
			desktop: 1024,
		},
	},
});

export default theme;
