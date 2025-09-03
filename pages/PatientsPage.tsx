
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCloudPatients } from '../services/apiService';
import { Patient } from '../types';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const PatientRecordCard: React.FC<{ patient: Patient }> = ({ patient }) => (
    <Link to={`/patients/${patient.id}`} className="block hover:scale-105 transition-transform duration-200">
        <Card className="h-full card-enhanced shadow-card border-2 border-transparent hover:border-brand-purple/50 hover:shadow-elevated">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-textPrimary">{patient.name}</h3>
                    <p className="text-sm text-textSecondary">MRN: {patient.mrn}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full text-white font-semibold ${patient.gender === 'Male' ? 'bg-brand-teal' : 'bg-brand-pink'}`}>
                    {patient.gender}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-textSecondary font-medium">Date of Birth</p>
                    <p className="text-textPrimary font-semibold">{patient.dob}</p>
                </div>
                <div>
                    <p className="text-textSecondary font-medium">Blood Type</p>
                    <p className="font-mono text-lg text-textPrimary font-bold">{patient.bloodType}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-textSecondary font-medium">Last Visit</p>
                    <p className="text-textPrimary font-semibold">{patient.lastVisit}</p>
                </div>
            </div>
        </Card>
    </Link>
);


const PatientsPage: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPatients = async () => {
            setLoading(true);
            try {
                const data = await fetchCloudPatients(searchQuery);
                setPatients(data);
            } catch (error) {
                console.error("Failed to fetch patients", error);
            } finally {
                setLoading(false);
            }
        };
        const handler = setTimeout(() => {
            loadPatients();
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
                        Patient Records
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
                        Search patients by name, MRN, or appointment date (YYYY-MM-DD).
                    </p>
                </div>

                {/* Status Indicator */}
                <div className="mb-8">
                    <div className="card-enhanced shadow-card border-brand-teal/20 bg-brand-teal/10">
                        <div className="p-4 flex items-center justify-center space-x-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                            </span>
                            <span className="text-brand-teal font-semibold">Source: Secure Cloud DB</span>
                        </div>
                    </div>
                </div>
            
                {/* Search Section */}
                <div className="mb-8">
                    <div className="card-enhanced shadow-card">
                        <div className="p-6">
                            <Input 
                                type="text"
                                placeholder="Search by name, MRN, appointment date..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Patient Records */}
                {loading ? (
                    <div className="text-center">
                        <div className="card-enhanced shadow-card">
                            <div className="p-8">
                                <p className="text-textSecondary font-medium">Loading patient data...</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {patients.length > 0 ? (
                            patients.map(p => <PatientRecordCard key={p.id} patient={p} />)
                        ) : (
                            <div className="lg:col-span-3">
                                <div className="card-enhanced shadow-card">
                                    <div className="p-8 text-center">
                                        <p className="text-textSecondary font-medium">No patients found for your query.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientsPage;
