import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		primary: {
			light: '#fff',
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
			disabledBackground: '#d1d1d3',
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
		MuiOutlinedInput: {
			root: {
				borderRadius: 16,
			},
			adornedEnd: {
				paddingRight: 0,
			},
		},
		MuiListItemIcon: {
			root: {
				color: 'initial',
				minWidth: 'initial',
			},
		},
		MuiListItemText: {
			root: {
				flex: 'initial',
			},
		},
		MuiToggleButtonGroup: {
			groupedHorizontal: {
				'&:not(:first-child)': {
					borderTopRightRadius: 8,
					borderTopLeftRadius: 8,
					borderBottomRightRadius: 8,
					borderBottomLeftRadius: 8,
				},
				'&:not(:last-child)': {
					borderTopRightRadius: 8,
					borderTopLeftRadius: 8,
					borderBottomRightRadius: 8,
					borderBottomLeftRadius: 8,
				},
			},
		},
		MuiButton: {
			contained: {
				'&:hover': {
					'&:disabled': {
						boxShadow: 'none',
					},
				},
			},
		},
		MuiToggleButton: {
			root: {
				border: 'none',
				'&$selected': {
					color: 'initial',
					'&:hover': {
						borderRadius: 8,
					},
				},
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
