import React, { useState } from 'react';
// import { Button, Link } from '@material-ui/core';
import TransactionsChartPie from '../elements/transactionsChartPie';
import LatestTransactions from '../modules/latestTransactions';

const HomePage = () => {
	const [data, setData] = useState([]);
	return (
		<>
			{/* <Button variant="contained" href="/categories" component={Link}>
				Categories
			</Button> */}
			<TransactionsChartPie data={data} setData={setData} />
			<LatestTransactions />
		</>
	);
};
export default HomePage;
