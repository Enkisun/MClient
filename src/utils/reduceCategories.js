const reduceCategories = (transactions, categories) =>
	transactions.reduce((acc, el) => {
		const category = categories.find((item) => item._id === el.categoryId);
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

export default reduceCategories;
