import React, { useState, useEffect } from 'react';
import { Vulnerability, RiskLevel } from '../types';
import { fetchVulnerabilities, remediateVulnerability } from '../services/apiService';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const SecurityDashboardPage: React.FC = () => {
    const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
    const [loading, setLoading] = useState(true);
    const [isScanning, setIsScanning] = useState(false);
    const [lastScanned, setLastScanned] = useState<string | null>(null);
    const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
    const [remediatingId, setRemediatingId] = useState<string | null>(null);

    const loadVulnerabilities = async () => {
        setLoading(true);
        try {
            const data = await fetchVulnerabilities();
            setVulnerabilities(data);
        } catch (error) {
            console.error("Failed to fetch vulnerabilities", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVulnerabilities();
    }, []);

    const handleScan = async () => {
        setIsScanning(true);
        try {
            // Simulate scan
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLastScanned(new Date().toLocaleString());
            await loadVulnerabilities();
        } catch (error) {
            console.error("Scan failed", error);
        } finally {
            setIsScanning(false);
        }
    };

    const handleRemediateClick = async (vuln: Vulnerability) => {
        setSelectedVulnerability(vuln);
        setRemediatingId(vuln.id);
        
        try {
            await remediateVulnerability(vuln.id);
            await loadVulnerabilities();
            
            // Auto-close modal after 10 seconds
            setTimeout(() => {
                setSelectedVulnerability(null);
                setRemediatingId(null);
            }, 10000);
        } catch (error) {
            console.error("Remediation failed", error);
            setRemediatingId(null);
        }
    };

    const getSeverityChipColor = (severity: RiskLevel) => {
        switch(severity) {
            case RiskLevel.Critical: return 'bg-red-500/20 text-red-300 border border-red-500/30';
            case RiskLevel.High: return 'bg-brand-pink/20 text-pink-300 border border-brand-pink/30';
            case RiskLevel.Medium: return 'bg-accent/20 text-accent border border-accent/30';
            case RiskLevel.Low: return 'bg-green-500/20 text-green-300 border border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
        }
    };

    const criticalCount = vulnerabilities.filter(v => v.severity === RiskLevel.Critical).length;
    const highCount = vulnerabilities.filter(v => v.severity === RiskLevel.High).length;
    const totalCost = vulnerabilities
        .filter(v => v.status !== 'Patched')
        .reduce((sum, v) => sum + v.remediationCost, 0);

    const formatCurrency = (value: number) => {
        if (Math.abs(value) >= 1_000_000) {
            return `$${(value / 1_000_000).toFixed(1)}M`;
        }
        if (Math.abs(value) >= 1_000) {
            return `$${(value / 1_000).toFixed(0)}K`;
        }
        return `$${value.toFixed(0)}`;
    };

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
                        Security Assessment
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
                        Real-time system vulnerability and risk analysis with automated remediation capabilities.
                    </p>
                </div>

                {/* Action Bar */}
                <div className="mb-8">
                    <div className="card-enhanced shadow-card">
                        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-textPrimary">Security Status</h2>
                                <p className="text-textSecondary">Last Scanned: {lastScanned || 'Never'}</p>
                            </div>
                            <Button onClick={handleScan} disabled={isScanning} className="bg-gradient-primary">
                                {isScanning ? 'Scanning...' : 'Start New Scan'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Security Stats */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card-enhanced shadow-card border-red-500/20 bg-red-500/10">
                            <div className="p-6 text-center">
                                <div className="text-4xl font-bold text-red-400 mb-2">{criticalCount}</div>
                                <div className="text-textSecondary font-medium">Critical Vulnerabilities</div>
                            </div>
                        </div>
                        <div className="card-enhanced shadow-card border-brand-pink/20 bg-brand-pink/10">
                            <div className="p-6 text-center">
                                <div className="text-4xl font-bold text-brand-pink mb-2">{highCount}</div>
                                <div className="text-textSecondary font-medium">High-Risk Issues</div>
                            </div>
                        </div>
                        <div className="card-enhanced shadow-card border-accent/20 bg-accent/10">
                            <div className="p-6 text-center">
                                <div className="text-4xl font-bold text-accent mb-2">{formatCurrency(totalCost)}</div>
                                <div className="text-textSecondary font-medium">Remediation Cost (Open)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vulnerabilities Table */}
                <div className="card-enhanced shadow-elevated">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/20 bg-black/20">
                                <tr>
                                    <th className="p-6 text-textPrimary font-bold">Severity</th>
                                    <th className="p-6 text-textPrimary font-bold">CVE ID</th>
                                    <th className="p-6 text-textPrimary font-bold">Description</th>
                                    <th className="p-6 text-textPrimary font-bold">Status</th>
                                    <th className="p-6 text-right text-textPrimary font-bold">Cost</th>
                                    <th className="p-6 text-center text-textPrimary font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center p-8">
                                            <div className="card-enhanced">
                                                <div className="p-6">
                                                    <p className="text-textSecondary font-medium">Loading vulnerabilities...</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    vulnerabilities.map(vuln => {
                                        const isRemediating = remediatingId === vuln.id;
                                        const isPatched = vuln.status === 'Patched';

                                        return (
                                        <tr key={vuln.id} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="p-6">
                                                <span className={`px-3 py-1 text-sm rounded-full font-semibold ${getSeverityChipColor(vuln.severity)}`}>
                                                    {vuln.severity}
                                                </span>
                                            </td>
                                            <td className="p-6 font-mono text-textSecondary">{vuln.cveId}</td>
                                            <td className="p-6 text-textPrimary font-medium">{vuln.description}</td>
                                            <td className="p-6">
                                                <span className={`font-semibold ${isPatched ? 'text-teal-400' : 'text-textSecondary'}`}>
                                                    {vuln.status}
                                                </span>
                                            </td>
                                            <td className="p-6 font-mono text-right text-textSecondary font-semibold">${vuln.remediationCost.toLocaleString()}</td>
                                            <td className="p-6 text-center">
                                                 <Button 
                                                    size="sm"
                                                    variant={isPatched ? 'secondary' : 'primary'}
                                                    onClick={() => handleRemediateClick(vuln)}
                                                    disabled={isPatched || !!remediatingId}
                                                    className={isPatched ? '' : 'bg-gradient-primary'}
                                                 >
                                                    {isRemediating ? 'Remediating...' : (isPatched ? 'Patched' : 'Remediate')}
                                                </Button>
                                            </td>
                                        </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal
                    isOpen={!!selectedVulnerability}
                    onClose={() => setSelectedVulnerability(null)}
                    title={`Remediation for ${selectedVulnerability?.cveId || 'Vulnerability'}`}
                >
                    <div>
                        <h3 className="font-bold text-textPrimary mb-2">Recommended Action:</h3>
                        <p className="text-textSecondary">{selectedVulnerability?.remediation}</p>
                        <p className="text-xs text-accent mt-4 text-center">
                            This window will automatically close in 10 seconds.
                        </p>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default SecurityDashboardPage;