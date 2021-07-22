import { format } from 'date-fns';

const sortTransactions = (transactions, categories) => {
	if (!categories.length) return [];
	const days = transactions.reduce((acc, el) => {
		const category = categories.find((i) => i._id === el.categoryId);
		const transactionDay = format(new Date(el.date), 'yyyy-MM-dd');
		if (acc[transactionDay]) {
			return {
				...acc,
				[transactionDay]: acc[transactionDay].concat([
					{
						...el,
						category: category.name,
						emoji: category.emoji,
					},
				]),
			};
		}
		return {
			...acc,
			[transactionDay]: [
				{ ...el, category: category.name, emoji: category.emoji },
			],
		};
	}, {});
	return Object.entries(days).reverse();
};

export default sortTransactions;
