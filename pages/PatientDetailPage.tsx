
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPatientMedicalRecord } from '../services/apiService';
import { MedicalRecord, Role, Visit, Diagnosis, Medication } from '../types';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

const PatientDetailPage: React.FC = () => {
    const { patientId } = useParams<{ patientId: string }>();
    const { user } = useAuth();
    const [record, setRecord] = useState<MedicalRecord | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!patientId) return;
        const loadRecord = async () => {
            setLoading(true);
            try {
                const data = await fetchPatientMedicalRecord(patientId);
                setRecord(data);
            } catch (error) {
                console.error("Failed to fetch patient record", error);
            } finally {
                setLoading(false);
            }
        };
        loadRecord();
    }, [patientId]);
    
    if (loading) return (
        <div className="min-h-screen bg-gradient-security flex items-center justify-center">
            <div className="card-enhanced shadow-card">
                <div className="p-8 text-center">
                    <p className="text-textSecondary font-medium">Loading patient record...</p>
                </div>
            </div>
        </div>
    );
    
    if (!record) return (
        <div className="min-h-screen bg-gradient-security flex items-center justify-center">
            <div className="card-enhanced shadow-card">
                <div className="p-8 text-center">
                    <p className="text-red-400 font-medium">Patient record not found.</p>
                </div>
            </div>
        </div>
    );

    const canEdit = user?.role === Role.Doctor;

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Back Navigation */}
                <div className="mb-8">
                    <Link to="/patients" className="text-brand-purple hover:underline font-semibold">&larr; Back to Patient List</Link>
                </div>

                {/* Patient Header */}
                <div className="card-enhanced shadow-card mb-8">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-4">{record.patient.name}</h1>
                                <p className="text-textSecondary font-medium">MRN: {record.patient.mrn}</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 md:mt-0 text-sm">
                                <div className="text-center">
                                    <p className="text-textSecondary font-medium">DOB</p>
                                    <p className="text-textPrimary font-semibold">{record.patient.dob}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-textSecondary font-medium">Gender</p>
                                    <p className="text-textPrimary font-semibold">{record.patient.gender}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-textSecondary font-medium">Blood Type</p>
                                    <p className="text-textPrimary font-semibold">{record.patient.bloodType}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-textSecondary font-medium">Last Visit</p>
                                    <p className="text-textPrimary font-semibold">{record.patient.lastVisit}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Visits */}
                        <div className="card-enhanced shadow-elevated">
                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-6 text-textPrimary">Visit History</h2>
                                <div className="space-y-4">
                                    {record.visits.length > 0 ? record.visits.map(visit => (
                                        <div key={visit.id} className="p-6 bg-black/20 rounded-lg border border-white/10">
                                            <p className="font-semibold text-textPrimary font-bold">{visit.date} - {visit.reason} with {visit.doctor}</p>
                                            <p className="text-sm text-textSecondary mt-2 font-medium">{visit.notes}</p>
                                        </div>
                                    )) : <p className="text-textSecondary font-medium">No visit history found.</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Diagnoses */}
                        <div className="card-enhanced shadow-card">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4 text-textPrimary">Active Diagnoses</h2>
                                <ul className="list-disc list-inside space-y-3 text-textPrimary">
                                    {record.diagnoses.length > 0 ? record.diagnoses.map(dx => (
                                        <li key={dx.id} className="font-medium">{dx.description} <span className="text-textSecondary font-semibold">({dx.code})</span></li>
                                    )) : <p className="text-textSecondary font-medium">No diagnoses on record.</p>}
                                </ul>
                            </div>
                        </div>
                        
                        {/* Medications */}
                        <div className="card-enhanced shadow-card">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4 text-textPrimary">Medications</h2>
                                <ul className="space-y-3">
                                    {record.medications.length > 0 ? record.medications.map(med => (
                                        <li key={med.id} className="p-4 bg-black/20 rounded-lg border border-white/10">
                                            <p className="font-semibold text-textPrimary font-bold">{med.name}</p>
                                            <p className="text-xs text-textSecondary font-medium">{med.dosage} - {med.frequency}</p>
                                        </li>
                                    )) : <p className="text-textSecondary font-medium">No medications prescribed.</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailPage;
