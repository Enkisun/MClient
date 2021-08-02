import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Loader from './loader';

const useStyles = makeStyles(
	(theme) => ({
		submit: {
			height: theme.spacing(6),
		},
	}),
	{
		name: 'SubmitButton',
	}
);

const SubmitButton = ({ isLoading, disabled, text }) => {
	const styles = useStyles();
	return (
		<Button
			className={styles.submit}
			disabled={isLoading || disabled}
			type="submit"
			color="primary"
			variant="contained"
			fullWidth
		>
			{isLoading ? <Loader /> : `${text}`}
		</Button>
	);
};

export default SubmitButton;
