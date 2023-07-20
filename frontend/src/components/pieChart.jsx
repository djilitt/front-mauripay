import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const CustomPieChart = (props) => {
    const chartData = props.data || [];
    const labels = ['valide', 'unvalide'];
    const colors = ['#0acf97', '#fa5c7c'];

    const total = chartData.reduce((sum, value) => sum + value, 0);
    const data = chartData.map((value, index) => ({
        name: labels[index],
        value,
        percentage: ((value / total) * 100).toFixed(2) + '%',
    }));

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                        <text
                            x={x}
                            y={y}
                            fill="#000"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                        >
                            {`${percentage}`}
                        </text>
                    );
                }}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Legend />
            <Tooltip />
        </PieChart>
    );
};

export default CustomPieChart;
