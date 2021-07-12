import moment from 'moment';

const groupedDays = (transactions) =>
	transactions.reduce((acc, el) => {
		const transactionDay = moment(el.date).format('YYYY-MM-DD');
		if (acc[transactionDay]) {
			return { ...acc, [transactionDay]: acc[transactionDay].concat([el]) };
		}
		return { ...acc, [transactionDay]: [el] };
	}, {});

const sortTransactions = (transactions) => {
	const days = groupedDays(transactions);
	const sortedDays = Object.keys(days).sort(
		(a, b) => moment(b, 'YYYY-MM-DD') - moment(a, 'YYYY-MM-DD')
	);

	return sortedDays.reduce((acc, date) => {
		const sortedTransactions = days[date].sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);
		return acc.concat([{ type: 'day', date, id: date }, ...sortedTransactions]);
	}, []);
};

export default sortTransactions;
