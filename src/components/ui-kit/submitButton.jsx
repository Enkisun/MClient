import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Loader from '../elements/loader';

const useStyles = makeStyles(
	(theme) => ({
		submit: {
			height: theme.spacing(5),
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
