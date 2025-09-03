

import React, { useState, useEffect } from 'react';
import { fetchSystemHealth } from '../services/apiService';
import { RiskFinding, RiskLevel } from '../types';
import Card from '../components/ui/Card';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { ShieldExclamationIcon } from '../components/icons/ShieldExclamationIcon';

const RiskCard: React.FC<{ finding: RiskFinding }> = ({ finding }) => {
    const riskConfig = {
        [RiskLevel.Critical]: { 
            borderColor: 'border-red-500/30',
            bgColor: 'bg-red-500/10',
            icon: <ShieldExclamationIcon className="w-8 h-8 text-red-500 flex-shrink-0" />,
            titleColor: 'text-red-400',
        },
        [RiskLevel.High]: {
            borderColor: 'border-red-500/30',
            bgColor: 'bg-red-500/10',
            icon: <ShieldExclamationIcon className="w-8 h-8 text-red-500 flex-shrink-0" />,
            titleColor: 'text-red-400',
        },
        [RiskLevel.Medium]: {
            borderColor: 'border-yellow-400/30',
            bgColor: 'bg-yellow-400/10',
            icon: <ShieldExclamationIcon className="w-8 h-8 text-yellow-400 flex-shrink-0" />,
            titleColor: 'text-yellow-300',
        },
        [RiskLevel.Low]: {
            borderColor: 'border-teal-500/30',
            bgColor: 'bg-teal-500/10',
            icon: <ShieldCheckIcon className="w-8 h-8 text-teal-500 flex-shrink-0" />,
            titleColor: 'text-teal-400',
        },
    };

    const config = riskConfig[finding.level];

    return (
        <div className={`card-enhanced shadow-card ${config.borderColor} ${config.bgColor}`}>
            <div className="flex items-start space-x-4">
                {config.icon}
                <div>
                    <p className={`font-bold ${config.titleColor}`}>{finding.category} - {finding.level} Risk</p>
                    <p className="mt-1 text-textPrimary font-medium">{finding.description}</p>
                    <p className="mt-3 text-sm text-textSecondary font-semibold">Recommendation:</p>
                    <p className="text-sm text-textSecondary font-medium">{finding.recommendation}</p>
                </div>
            </div>
        </div>
    );
};

const SystemHealthPage: React.FC = () => {
    const [risks, setRisks] = useState<RiskFinding[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHealthData = async () => {
            setLoading(true);
            try {
                const data = await fetchSystemHealth();
                setRisks(data);
            } catch (error) {
                console.error("Failed to fetch system health", error);
            } finally {
                setLoading(false);
            }
        };
        loadHealthData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
                        System Health & Security
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
                        Automated risk analysis of on-premise and cloud infrastructure.
                    </p>
                </div>
                
                {loading ? (
                    <div className="card-enhanced shadow-card">
                        <div className="p-8 text-center">
                            <p className="text-textSecondary font-medium">Analyzing system health...</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {risks.length > 0 ? (
                            risks.map(risk => <RiskCard key={risk.id} finding={risk} />)
                        ) : (
                            <div className="card-enhanced shadow-card">
                                <div className="p-8 text-center">
                                    <p className="text-textSecondary font-medium">No significant risks detected at this time.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SystemHealthPage;
