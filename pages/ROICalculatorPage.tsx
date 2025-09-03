import React, { useState, useEffect } from 'react';
import { calculateROI } from '../services/apiService';
import { ROICalculationParams, ROICalculationResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    if (Math.abs(value) >= 1_000) {
        return `$${(value / 1_000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
};

const ROICalculatorPage: React.FC = () => {
    const [params, setParams] = useState({
        modernizationInvestment: 1200000,
        annualMaintenanceSavings: 150000,
        riskReductionPercentage: 85,
        licensingFees: 120000,
        infrastructureCosts: 250000,
        staffingCosts: 80000,
        downtimeCosts: 50000,
    });
    const [result, setResult] = useState<ROICalculationResult | null>(null);
    const [loading, setLoading] = useState(true);

    const runCalculation = async () => {
        setLoading(true);
        try {
            const res = await calculateROI(params as ROICalculationParams);
            setResult(res);
        } catch (error) {
            console.error("Failed to calculate ROI", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        runCalculation();
    }, []);
    
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setParams(prev => ({ ...prev, [name]: Number(value) }));
    };

    const projectionData = result ? (() => {
        const data = [];
        let cumulativeSavings = -params.modernizationInvestment;

        data.push({ name: 'Invest', savings: cumulativeSavings, fill: '#db2777' });

        for (let i = 1; i <= 5; i++) {
            cumulativeSavings += result.annualSavings;
            data.push({ name: `Year ${i}`, savings: cumulativeSavings, fill: '#9333ea' });
        }
        return data;
    })() : [];

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
                        Modernization ROI Calculator
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
                        A comprehensive tool to project the financial benefits and return on investment of system modernization.
                    </p>
                </div>

                <div className="flex flex-col space-y-8">
                    {/* --- INPUTS CARD --- */}
                    <div className="card-enhanced shadow-card">
                        <div className="p-8">
                            <h3 className="font-bold text-2xl mb-6 text-textPrimary">Core Financial Inputs</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="flex justify-between text-sm text-textSecondary mb-1">
                                        <span>Modernization Investment</span>
                                        <span className="font-bold text-textPrimary">{formatCurrency(params.modernizationInvestment)}</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        name="modernizationInvestment" 
                                        min="500000" 
                                        max="5000000" 
                                        step="100000" 
                                        value={params.modernizationInvestment} 
                                        onChange={handleSliderChange} 
                                        className="w-full" 
                                    />
                                </div>
                                <div>
                                    <label className="flex justify-between text-sm text-textSecondary mb-1">
                                        <span>Annual Operational Savings</span>
                                        <span className="font-bold text-textPrimary">{formatCurrency(params.annualMaintenanceSavings)}</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        name="annualMaintenanceSavings" 
                                        min="50000" 
                                        max="1000000" 
                                        step="25000" 
                                        value={params.annualMaintenanceSavings} 
                                        onChange={handleSliderChange} 
                                        className="w-full" 
                                    />
                                </div>
                                <p className="text-sm text-textSecondary text-center pt-4 bg-black/20 rounded-lg p-4 border border-white/10">
                                    Note: Annual Legacy System Costs (licensing, infrastructure, etc.) and Risk Reduction have been abstracted to focus on high-impact variables.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- RESULTS CARD --- */}
                    <div className="card-enhanced shadow-elevated">
                        <div className="p-8">
                            <h3 className="font-bold text-2xl mb-6 text-textPrimary">Financial Projections</h3>
                            {loading || !result ? (
                                <div className="flex items-center justify-center h-full min-h-[30rem]">
                                    <div className="card-enhanced">
                                        <div className="p-8">
                                            <p className="text-textSecondary font-medium">Calculating...</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                               <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                       <div className="card-enhanced shadow-card border-brand-teal/20 bg-brand-teal/10">
                                           <div className="p-6">
                                               <div className="text-3xl md:text-4xl font-bold text-brand-teal mb-2">{formatCurrency(result.annualSavings)}</div>
                                               <div className="text-textSecondary font-medium">Total Annual Savings</div>
                                           </div>
                                       </div>
                                       <div className="card-enhanced shadow-card border-brand-purple/20 bg-brand-purple/10">
                                           <div className="p-6">
                                               <div className="text-3xl md:text-4xl font-bold text-brand-purple mb-2">{result.paybackPeriod.toFixed(2)} years</div>
                                               <div className="text-textSecondary font-medium">Payback Period</div>
                                           </div>
                                       </div>
                                       <div className="card-enhanced shadow-card border-blue-400/20 bg-blue-400/10">
                                           <div className="p-6">
                                               <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{formatCurrency(result.fiveYearProjection)}</div>
                                               <div className="text-textSecondary font-medium">5-Year Net ROI</div>
                                           </div>
                                       </div>
                                    </div>
                                    
                                    <div className="card-enhanced shadow-card">
                                        <div className="p-6">
                                            <h4 className="font-bold text-xl text-center mb-6 text-textPrimary">5-Year Cumulative Net Savings Projection</h4>
                                            <div className="h-80">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={projectionData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                                        <XAxis dataKey="name" stroke="#9CA3AF" />
                                                        <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value as number)} />
                                                        <Tooltip
                                                            contentStyle={{ backgroundColor: 'rgba(2, 0, 16, 0.9)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#E5E7EB' }}
                                                            labelStyle={{ color: '#E5E7EB' }}
                                                            formatter={(value) => formatCurrency(value as number)}
                                                        />
                                                        <Bar dataKey="savings" name="Net Savings" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ROICalculatorPage;
