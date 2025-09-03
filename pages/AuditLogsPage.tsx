import React, { useState, useEffect } from 'react';
import { fetchAuditLogs } from '../services/apiService';
import { AuditLog } from '../types';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';

const ACCESS_CODE = '72184';

const AuditLogsPage: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!verified) return;

        const loadLogs = async () => {
            setLoading(true);
            try {
                const data = await fetchAuditLogs();
                setLogs(data);
            } catch (error) {
                console.error("Failed to fetch audit logs", error);
            } finally {
                setLoading(false);
            }
        };
        loadLogs();
    }, [verified]);

    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();
        if (accessCode === ACCESS_CODE) {
            setVerified(true);
            setError('');
        } else {
            setError('Invalid access code.');
            setAccessCode('');
        }
    };

    const getActionChipColor = (action: string) => {
        if (action.includes('SUCCESS')) return 'bg-brand-teal/20 text-teal-300';
        if (action.includes('FAILURE')) return 'bg-red-500/20 text-red-300';
        if (action.includes('VIEW')) return 'bg-brand-purple/20 text-purple-300';
        return 'bg-gray-500/20 text-gray-300';
    };

    if (!verified) {
        return (
            <div className="min-h-screen bg-gradient-security flex items-center justify-center">
                <div className="container mx-auto px-4 py-12">
                    <div className="card-enhanced shadow-elevated w-full max-w-md mx-auto">
                        <div className="p-8 space-y-6">
                            <div className="text-center">
                                <ShieldCheckIcon className="w-16 h-16 mx-auto text-brand-purple" />
                                <h1 className="mt-4 text-3xl font-bold font-poppins text-textPrimary">Secure Access Required</h1>
                                <p className="mt-2 text-textSecondary">Enter the access code to view system audit logs.</p>
                            </div>
                            <form className="mt-6 space-y-4" onSubmit={handleVerification}>
                                <div>
                                    <label htmlFor="code" className="sr-only">Access Code</label>
                                    <Input
                                        id="code"
                                        name="code"
                                        type="password"
                                        required
                                        placeholder="Access Code"
                                        value={accessCode}
                                        onChange={(e) => setAccessCode(e.target.value)}
                                        className="text-center tracking-widest"
                                    />
                                </div>
                                {error && <p className="text-sm text-error text-center font-medium">{error}</p>}
                                <div>
                                    <Button type="submit" className="w-full bg-gradient-primary">
                                        Verify Access
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
                        System Audit Logs
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
                        Review of all significant actions performed within the system with comprehensive security tracking.
                    </p>
                </div>

                {/* Audit Logs Table */}
                <div className="card-enhanced shadow-elevated">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/20 bg-black/20">
                                <tr>
                                    <th className="p-6 text-textPrimary font-bold">Timestamp</th>
                                    <th className="p-6 text-textPrimary font-bold">User</th>
                                    <th className="p-6 text-textPrimary font-bold">Action</th>
                                    <th className="p-6 text-textPrimary font-bold">IP Address</th>
                                    <th className="p-6 text-textPrimary font-bold">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center p-8">
                                            <div className="card-enhanced">
                                                <div className="p-6">
                                                    <p className="text-textSecondary font-medium">Loading audit logs...</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map(log => (
                                        <tr key={log.id} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="p-6 whitespace-nowrap text-textSecondary font-medium">{log.timestamp}</td>
                                            <td className="p-6 font-semibold text-textPrimary">{log.user}</td>
                                            <td className="p-6">
                                                <span className={`px-3 py-1 text-sm rounded-full font-semibold ${getActionChipColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="p-6 font-mono text-textSecondary">{log.ipAddress}</td>
                                            <td className="p-6 text-textSecondary">{log.details}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditLogsPage;
