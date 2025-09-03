

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../ui/Card';

interface ChartData {
    name: string;
    value: number;
}

interface AnalyticsChartProps {
    barData: ChartData[];
    pieData: ChartData[];
}

const COLORS = ['#9333ea', '#14b8a6', '#db2777', '#6b7280', '#9ca3af'];

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ barData, pieData }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
            <Card className="lg:col-span-3">
                <h3 className="text-lg font-semibold mb-4 text-textPrimary">Top 5 Condition Prevalence</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData} margin={{ top: 5, right: 20, left: -10, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.15)" />
                        <XAxis dataKey="name" stroke="#9CA3AF" interval={0} angle={-30} textAnchor="end" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(2, 0, 16, 0.9)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#E5E7EB' }}
                            labelStyle={{ color: '#E5E7EB' }}
                        />
                        <Legend wrapperStyle={{ color: '#E5E7EB' }}/>
                        <Bar dataKey="value" fill="#9333ea" name="Patients" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
            <Card className="lg:col-span-2">
                 <h3 className="text-lg font-semibold mb-4 text-textPrimary">Gender Distribution</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                         <Tooltip
                             contentStyle={{ backgroundColor: 'rgba(2, 0, 16, 0.9)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#E5E7EB' }}
                             labelStyle={{ color: '#E5E7EB' }}
                        />
                    </PieChart>
                 </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default AnalyticsChart;