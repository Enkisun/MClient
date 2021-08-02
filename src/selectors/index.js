import { createSelector } from 'reselect';
import { transactionsSelectors } from '../slices/transactionsSlice';
import { categoriesSelectors } from '../slices/categoriesSlice';
import transactionsUtil from '../utils/transactions.utils';
import categoriesUtil from '../utils/categories.utils';

const selectReducedByValueCategories = createSelector(
	transactionsSelectors.selectAll,
	categoriesSelectors.selectAll,
	(transactions, categories) => {
		if (!transactions.length || !categories.length)
			return [{ name: '', value: 1 }];
		return [...categoriesUtil.reduceCategories(transactions, categories)];
	}
);

const selectGroupedByDayTransactions = createSelector(
	transactionsSelectors.selectAll,
	categoriesSelectors.selectAll,
	(transactions, categories) => {
		if (!categories.length) return [];
		return transactionsUtil.sortTransactions(transactions, categories);
	}
);

export default {
	selectReducedByValueCategories,
	selectGroupedByDayTransactions,
};
