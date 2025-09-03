
import React, { useEffect, useState } from 'react';
import { AnonymizedAnalyticsData, Role } from '../types';
import { fetchAnonymizedAnalytics } from '../services/apiService';
import StatCard from '../components/dashboard/StatCard';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import { UsersIcon } from '../components/icons/UsersIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { ShieldExclamationIcon } from '../components/icons/ShieldExclamationIcon';
import { SystemHealthIcon } from '../components/icons/SystemHealthIcon';
import { useAuth } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [analytics, setAnalytics] = useState<AnonymizedAnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAnonymizedAnalytics();
                setAnalytics(data);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-textSecondary font-medium">Loading dashboard...</div>;
    }

    if (!analytics) {
        return <div className="p-8 text-center text-error font-semibold">Failed to load dashboard data.</div>;
    }
    
    const isAnalyst = user?.role === Role.Analyst;

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
                        {isAnalyst ? 'Analytics Dashboard' : 'System Dashboard'}
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
                        {isAnalyst ? 'In-depth, anonymized population health and system analytics.' : 'Displaying anonymized, high-level system analytics.'}
                    </p>
                </div>
            
                {/* Security Notice */}
                <div className="mb-12">
                    <div className="card-enhanced shadow-card border-purple-400/20 bg-purple-500/10">
                        <div className="p-6 flex items-start">
                            <ShieldExclamationIcon className="w-8 h-8 mr-4 flex-shrink-0 text-purple-300" />
                            <div>
                                <h4 className="font-bold text-textPrimary mb-2">Data Security Note</h4>
                                <p className="text-textSecondary">
                                    All analytical data presented is fully anonymized on the secure backend before being displayed. 
                                    No Personally Identifiable Information (PII) is processed or stored in the browser.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        icon={<UsersIcon className="w-6 h-6 text-brand-teal"/>}
                        title="Total Patients"
                        value={analytics.patientCount}
                        colorClass="bg-brand-teal/20"
                    />
                    <StatCard
                        icon={<CalendarIcon className="w-6 h-6 text-brand-purple"/>}
                        title="Average Patient Age"
                        value={analytics.averageAge}
                        colorClass="bg-brand-purple/20"
                    />
                    <StatCard
                        icon={<HeartIcon className="w-6 h-6 text-brand-pink"/>}
                        title="Top Condition"
                        value={analytics.conditionPrevalence[0]?.name || 'N/A'}
                        colorClass="bg-brand-pink/20"
                    />
                    <StatCard
                        icon={<SystemHealthIcon className="w-6 h-6 text-green-300"/>}
                        title="Migration Progress"
                        value={`${analytics.migrationProgress}%`}
                        colorClass="bg-green-500/20"
                    />
                </div>
                
                {/* Analytics Chart */}
                <div className="card-enhanced shadow-elevated">
                    <AnalyticsChart 
                        barData={analytics.conditionPrevalence}
                        pieData={analytics.genderDistribution}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
