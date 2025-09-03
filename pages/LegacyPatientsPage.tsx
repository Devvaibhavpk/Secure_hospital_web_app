

import React, { useState, useEffect, useMemo } from 'react';
import { fetchSensitivePatients } from '../services/apiService';
import { SensitivePatientRecord } from '../types';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const LegacyPatientsPage: React.FC = () => {
    const [allPatients, setAllPatients] = useState<SensitivePatientRecord[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPatients = async () => {
            setLoading(true);
            try {
                const data = await fetchSensitivePatients();
                setAllPatients(data);
            } catch (error) {
                console.error("Failed to fetch sensitive patient records", error);
            } finally {
                setLoading(false);
            }
        };
        loadPatients();
    }, []);

    const filteredPatients = useMemo(() => {
        if (!searchQuery) {
            return allPatients;
        }
        const lowercasedQuery = searchQuery.toLowerCase();
        return allPatients.filter(p =>
            p.name.toLowerCase().includes(lowercasedQuery) ||
            p.id.toLowerCase().includes(lowercasedQuery)
        );
    }, [allPatients, searchQuery]);

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
                        Legacy Patient Records
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
                        Full, unredacted patient records for administrative use only.
                    </p>
                </div>

                {/* Source Indicator */}
                <div className="mb-8">
                    <div className="card-enhanced shadow-card border-brand-teal/20 bg-brand-teal/10">
                        <div className="p-4 flex items-center justify-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-brand-teal"></span>
                            <span className="text-brand-teal font-semibold">Source: On-Premise Legacy DB</span>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="card-enhanced shadow-card">
                        <div className="p-6">
                            <Input
                                type="text"
                                placeholder="Search by name or patient ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Patient Records Table */}
                <div className="card-enhanced shadow-elevated">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/20 bg-black/20">
                                <tr>
                                    <th className="p-6 text-textPrimary font-bold">ID</th>
                                    <th className="p-6 text-textPrimary font-bold">Name</th>
                                    <th className="p-6 text-textPrimary font-bold">Date of Birth</th>
                                    <th className="p-6 text-textPrimary font-bold">SSN</th>
                                    <th className="p-6 text-textPrimary font-bold">Conditions</th>
                                    <th className="p-6 text-textPrimary font-bold">Billing Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center p-8">
                                            <div className="card-enhanced">
                                                <div className="p-6">
                                                    <p className="text-textSecondary font-medium">Loading sensitive records...</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredPatients.length > 0 ? (
                                    filteredPatients.map(p => (
                                        <tr key={p.id} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="p-6 font-mono text-textSecondary font-semibold">{p.id}</td>
                                            <td className="p-6 font-bold text-textPrimary">{p.name}</td>
                                            <td className="p-6 text-textSecondary font-medium">{p.dob}</td>
                                            <td className="p-6 font-mono text-brand-pink font-semibold">{p.ssn}</td>
                                            <td className="p-6 text-textSecondary font-medium">{p.conditions.join(', ')}</td>
                                            <td className="p-6 font-mono text-textSecondary font-semibold">{p.billingCode}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center p-8">
                                            <div className="card-enhanced">
                                                <div className="p-6">
                                                    <p className="text-textSecondary font-medium">No records found.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegacyPatientsPage;
