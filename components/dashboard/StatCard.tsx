

import React from 'react';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, colorClass }) => {
    return (
        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-5 hover:bg-slate-800/40 transition-colors">
            <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-textSecondary font-semibold">{title}</p>
                    <p className="text-2xl font-bold text-textPrimary truncate" title={String(value)}>{value}</p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;