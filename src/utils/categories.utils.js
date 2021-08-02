const reduceCategories = (transactions, categories) => {
	const categoryData = transactions.reduce((acc, el) => {
		const category = categories.find((i) => i._id === el.categoryId);
		if (acc[el.categoryId]) {
			return {
				...acc,
				[el.categoryId]: {
					name: category.name,
					value: el.amount + acc[el.categoryId].value,
				},
			};
		}
		return {
			...acc,
			[el.categoryId]: { name: category.name, value: el.amount },
		};
	}, {});

	return Object.values(categoryData);
};

export default { reduceCategories };
