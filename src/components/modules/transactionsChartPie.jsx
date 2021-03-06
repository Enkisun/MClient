import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import selectors from '../../selectors';

const useStyles = makeStyles(
	() => ({
		container: {
			margin: '8px auto',
		},
	}),
	{
		name: 'ChartPie',
	}
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	name,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
		>
			{percent > 0.07 && `${name} ${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const TransactionsChartPie = ({ data, setData }) => {
	const styles = useStyles();
	const chartData = useSelector(selectors.selectReducedByValueCategories);

	useEffect(() => {
		setData(chartData);
	}, [chartData]);

	return (
		<ResponsiveContainer width="100%" aspect={1} className={styles.container}>
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					label={renderCustomizedLabel}
					nameKey={data.name}
					outerRadius="80%"
					fill="#8884d8"
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${entry.name}`}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default TransactionsChartPie;
