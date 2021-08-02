import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

const TransactionDate = ({ className, date }) => {
	const [convertedDate, setConvertedDate] = useState();

	const lastTransactionDate = (newDate) => {
		const daysDiff = new Date().getDate() - newDate.getDate();
		const month = newDate.toLocaleString('en-us', { month: 'long' });

		if (!daysDiff) return `Today`;
		if (daysDiff === 1) return `Yesterday`;
		return `${newDate.getDate()} ${month}`;
	};

	useEffect(() => {
		setConvertedDate(lastTransactionDate(new Date(date)));
	}, [date]);

	return (
		<Typography variant="body1" className={className}>
			{convertedDate}
		</Typography>
	);
};

export default TransactionDate;
