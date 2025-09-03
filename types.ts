export enum Role {
    Admin = 'Admin',
    Doctor = 'Doctor',
    Nurse = 'Nurse',
    Analyst = 'Analyst',
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
}

export interface Appointment {
    id: string;
    patientId: string;
    date: string;
    time: string;
    reason: string;
}

// Data available in the "modern cloud" system for Doctors
export interface Patient {
    id: string;
    mrn: string; // Medical Record Number
    name: string;
    dob: string;
    gender: 'Male' | 'Female' | 'Other';
    bloodType: string;
    lastVisit: string;
    insuranceProvider: string;
    emergencyContact: string;
}

// Full sensitive data in the "on-premise legacy" system for Admins
export interface SensitivePatientRecord extends Patient {
    conditions: string[];
    ssn: string; // Sensitive data
    billingCode: string; // Sensitive data
}

export interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    ipAddress: string;
    details: string;
}

export interface AnonymizedAnalyticsData {
    patientCount: number;
    averageAge: number;
    genderDistribution: { name: string; value: number }[];
    conditionPrevalence: { name: string; value: number }[];
    migrationProgress: number;
}

export enum RiskLevel {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
}

export interface RiskFinding {
    id: string;
    category: 'Authentication' | 'Data Integrity' | 'Cloud Security';
    description: string;
    level: RiskLevel;
    recommendation: string;
}

// --- New Types for Expanded Features ---

export interface Vulnerability {
    id: string;
    cveId: string;
    category: 'OS' | 'Database' | 'Application' | 'Network';
    severity: RiskLevel;
    description: string;
    status: 'Vulnerable' | 'Patched' | 'Mitigated';
    remediationCost: number;
    remediation: string;
}

export interface ROICalculationParams {
    modernizationInvestment: number;
    annualMaintenanceSavings: number;
    riskReductionPercentage: number;
    // Detailed legacy costs
    licensingFees: number;
    infrastructureCosts: number;
    staffingCosts: number;
    downtimeCosts: number;
}

export interface ROICalculationResult {
    annualSavings: number;
    paybackPeriod: number; // in years
    fiveYearProjection: number;
    reducedRiskCost: number;
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
}

export interface Diagnosis {
    id: string;
    code: string; // e.g., ICD-10
    description: string;
    diagnosedOn: string;
}

export interface Visit {
    id: string;
    date: string;
    doctor: string;
    reason: string;
    vitals: {
        temp: string;
        bp: string;
        hr: number;
    };
    notes: string;
}

export interface MedicalRecord {
    patient: Patient;
    visits: Visit[];
    diagnoses: Diagnosis[];
    medications: Medication[];
}