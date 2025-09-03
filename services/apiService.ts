import { User, Role, Patient, AuditLog, AnonymizedAnalyticsData, SensitivePatientRecord, Appointment, RiskFinding, RiskLevel, Vulnerability, ROICalculationParams, ROICalculationResult, MedicalRecord, Visit, Diagnosis, Medication } from '../types';

// --- MOCK ON-PREMISE LEGACY DATABASE (SENSITIVE & EXPANDED) ---
const localLegacyDB = {
    users: [
        { id: '1', email: 'admin@secure.med', name: 'Dr. Evelyn Reed', role: Role.Admin },
        { id: '2', email: 'doctor@secure.med', name: 'Dr. Ben Carter', role: Role.Doctor },
        { id: '3', email: 'j.andrews@secure.med', name: 'Dr. Joanna Andrews', role: Role.Doctor },
        { id: '4', email: 'nurse.jones@secure.med', name: 'Chris Jones, RN', role: Role.Nurse },
        { id: '5', email: 'analyst@secure.med', name: 'Sam Taylor', role: Role.Analyst },
        { id: '6', email: 'm.chen@secure.med', name: 'Dr. Marcus Chen', role: Role.Doctor },
        { id: '7', email: 's.davis@secure.med', name: 'Dr. Sarah Davis', role: Role.Doctor },
        { id: '8', email: 'nurse.li@secure.med', name: 'Wei Li, RN', role: Role.Nurse },
        { id: '9', email: 'r.miller@secure.med', name: 'Robert Miller, RN', role: Role.Nurse },
        { id: '10', email: 'analyst.kim@secure.med', name: 'Jin-Sun Kim', role: Role.Analyst },
    ],
    sensitivePatients: [
        { id: 'p001', mrn: 'MRN84321', name: 'John Smith', dob: '1985-05-20', gender: 'Male', bloodType: 'O+', lastVisit: '2023-11-10', insuranceProvider: 'BlueCross', emergencyContact: 'Jane Smith (Spouse)', conditions: ['Hypertension', 'Type 2 Diabetes'], ssn: 'XXX-XX-1234', billingCode: 'ICD-10: I10' },
        { id: 'p002', mrn: 'MRN84322', name: 'Jane Doe', dob: '1992-08-15', gender: 'Female', bloodType: 'A-', lastVisit: '2024-01-05', insuranceProvider: 'Aetna', emergencyContact: 'John Doe (Spouse)', conditions: ['Asthma'], ssn: 'XXX-XX-5678', billingCode: 'ICD-10: J45' },
        { id: 'p003', mrn: 'MRN84323', name: 'Peter Jones', dob: '1970-02-25', gender: 'Male', bloodType: 'B+', lastVisit: '2023-12-22', insuranceProvider: 'Cigna', emergencyContact: 'Mary Jones (Daughter)', conditions: ['Arthritis'], ssn: 'XXX-XX-9012', billingCode: 'ICD-10: M19' },
        { id: 'p004', mrn: 'MRN84324', name: 'Mary Williams', dob: '2001-11-30', gender: 'Female', bloodType: 'AB+', lastVisit: '2024-02-01', insuranceProvider: 'UnitedHealth', emergencyContact: 'David Williams (Father)', conditions: ['Migraine'], ssn: 'XXX-XX-3456', billingCode: 'ICD-10: G43' },
        { id: 'p005', mrn: 'MRN84325', name: 'David Brown', dob: '1965-09-12', gender: 'Male', bloodType: 'O-', lastVisit: '2024-03-10', insuranceProvider: 'BlueCross', emergencyContact: 'Susan Brown (Spouse)', conditions: ['High Cholesterol'], ssn: 'XXX-XX-7890', billingCode: 'ICD-10: E78.5' },
        { id: 'p006', mrn: 'MRN84326', name: 'Emily Davis', dob: '1988-07-22', gender: 'Female', bloodType: 'A+', lastVisit: '2024-04-15', insuranceProvider: 'Aetna', emergencyContact: 'Michael Davis (Husband)', conditions: ['Anxiety'], ssn: 'XXX-XX-1122', billingCode: 'ICD-10: F41.1' },
        { id: 'p007', mrn: 'MRN84327', name: 'Michael Garcia', dob: '1975-03-18', gender: 'Male', bloodType: 'B-', lastVisit: '2024-05-01', insuranceProvider: 'Cigna', emergencyContact: 'Maria Garcia (Spouse)', conditions: ['Gout'], ssn: 'XXX-XX-3344', billingCode: 'ICD-10: M10' },
        { id: 'p008', mrn: 'MRN84328', name: 'Jessica Rodriguez', dob: '1995-12-01', gender: 'Female', bloodType: 'O+', lastVisit: '2024-04-20', insuranceProvider: 'UnitedHealth', emergencyContact: 'Carlos Rodriguez (Brother)', conditions: ['Eczema'], ssn: 'XXX-XX-5566', billingCode: 'ICD-10: L30.9' },
        { id: 'p009', mrn: 'MRN84329', name: 'William Martinez', dob: '1959-01-30', gender: 'Male', bloodType: 'AB-', lastVisit: '2024-03-25', insuranceProvider: 'BlueCross', emergencyContact: 'Linda Martinez (Wife)', conditions: ['COPD'], ssn: 'XXX-XX-7788', billingCode: 'ICD-10: J44' },
        { id: 'p010', mrn: 'MRN84330', name: 'Linda Hernandez', dob: '1962-10-10', gender: 'Female', bloodType: 'A+', lastVisit: '2024-05-05', insuranceProvider: 'Aetna', emergencyContact: 'Jose Hernandez (Husband)', conditions: ['Osteoporosis'], ssn: 'XXX-XX-9900', billingCode: 'ICD-10: M81' },
        { id: 'p011', mrn: 'MRN84331', name: 'James Wilson', dob: '2005-06-25', gender: 'Male', bloodType: 'O-', lastVisit: '2024-04-18', insuranceProvider: 'Cigna', emergencyContact: 'Karen Wilson (Mother)', conditions: ['Acne'], ssn: 'XXX-XX-2468', billingCode: 'ICD-10: L70.0' },
        { id: 'p012', mrn: 'MRN84332', name: 'Barbara Moore', dob: '1953-04-12', gender: 'Female', bloodType: 'B+', lastVisit: '2024-03-12', insuranceProvider: 'UnitedHealth', emergencyContact: 'Thomas Moore (Son)', conditions: ["Alzheimer's Disease"], ssn: 'XXX-XX-1357', billingCode: 'ICD-10: G30' },
        { id: 'p013', mrn: 'MRN84333', name: 'Richard Taylor', dob: '1980-09-05', gender: 'Male', bloodType: 'A-', lastVisit: '2024-05-10', insuranceProvider: 'BlueCross', emergencyContact: 'Susan Taylor (Wife)', conditions: ['GERD'], ssn: 'XXX-XX-8642', billingCode: 'ICD-10: K21.9' },
        { id: 'p014', mrn: 'MRN84334', name: 'Susan Anderson', dob: '1998-02-14', gender: 'Female', bloodType: 'O+', lastVisit: '2024-04-28', insuranceProvider: 'Aetna', emergencyContact: 'Robert Anderson (Father)', conditions: ['Anemia'], ssn: 'XXX-XX-9753', billingCode: 'ICD-10: D64.9' },
        { id: 'p015', mrn: 'MRN84335', name: 'Joseph Thomas', dob: '1978-11-23', gender: 'Male', bloodType: 'AB+', lastVisit: '2024-02-20', insuranceProvider: 'Cigna', emergencyContact: 'Nancy Thomas (Wife)', conditions: ['Sleep Apnea'], ssn: 'XXX-XX-2580', billingCode: 'ICD-10: G47.33' },
        { id: 'p016', mrn: 'MRN84336', name: 'Sarah Jackson', dob: '1983-08-08', gender: 'Female', bloodType: 'B-', lastVisit: '2024-05-11', insuranceProvider: 'UnitedHealth', emergencyContact: 'Paul Jackson (Husband)', conditions: ['Hypothyroidism'], ssn: 'XXX-XX-3691', billingCode: 'ICD-10: E03.9' },
        { id: 'p017', mrn: 'MRN84337', name: 'Charles White', dob: '1968-06-16', gender: 'Male', bloodType: 'A+', lastVisit: '2024-03-03', insuranceProvider: 'BlueCross', emergencyContact: 'Patricia White (Wife)', conditions: ['Hypertension'], ssn: 'XXX-XX-1470', billingCode: 'ICD-10: I10' },
        { id: 'p018', mrn: 'MRN84338', name: 'Patricia Harris', dob: '1990-01-01', gender: 'Female', bloodType: 'O-', lastVisit: '2024-04-09', insuranceProvider: 'Aetna', emergencyContact: 'Mark Harris (Husband)', conditions: ['PCOS'], ssn: 'XXX-XX-2581', billingCode: 'ICD-10: E28.2' },
        { id: 'p019', mrn: 'MRN84339', name: 'Christopher Martin', dob: '1972-07-07', gender: 'Male', bloodType: 'B+', lastVisit: '2024-05-14', insuranceProvider: 'Cigna', emergencyContact: 'Donna Martin (Wife)', conditions: ['Type 2 Diabetes'], ssn: 'XXX-XX-3692', billingCode: 'ICD-10: E11' },
        { id: 'p020', mrn: 'MRN84340', name: 'Lisa Thompson', dob: '1985-05-19', gender: 'Female', bloodType: 'AB+', lastVisit: '2024-02-15', insuranceProvider: 'UnitedHealth', emergencyContact: 'Brian Thompson (Husband)', conditions: ['Fibromyalgia'], ssn: 'XXX-XX-4703', billingCode: 'ICD-10: M79.7' },
        ...Array.from({ length: 80 }, (_, i) => {
            const id = 21 + i;
            const gender = id % 2 === 0 ? 'Female' : 'Male';
            const firstNames = gender === 'Male' ? ['Robert', 'Paul', 'Mark', 'Brian', 'Jason', 'Steven', 'Kevin', 'Edward'] : ['Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Michelle', 'Dorothy'];
            const lastNames = ['Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell'];
            const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
            const year = 1950 + (id * 2 % 55);
            const dob = `${year}-${String((id % 12) + 1).padStart(2,'0')}-${String((id % 28) + 1).padStart(2,'0')}`;
            const conditionsData = ['Asthma', 'Hypertension', 'High Cholesterol', 'Arthritis'];
            return {
                id: `p${String(id).padStart(3, '0')}`,
                mrn: `MRN843${41 + i}`,
                name: name,
                dob: dob,
                gender: gender as 'Male' | 'Female',
                bloodType: ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'][id % 8] as string,
                lastVisit: `2024-${String((id % 5) + 1).padStart(2,'0')}-${String((id % 9) + 10).padStart(2,'0')}`,
                insuranceProvider: ['Aetna', 'Cigna', 'UnitedHealth', 'BlueCross'][i % 4],
                emergencyContact: 'N/A',
                conditions: [conditionsData[i % conditionsData.length]],
                ssn: `XXX-XX-${1000 + i}`,
                billingCode: `ICD-10: ${['J45', 'I10', 'E78.5', 'M19'][i % 4]}`
            }
        })
    ] as SensitivePatientRecord[],
    auditLogs: [
        { id: 'l001', timestamp: '2025-09-01 09:05:12', user: 'admin@secure.med', action: 'LOGIN_SUCCESS', ipAddress: '192.168.1.10', details: 'Admin user logged in.' },
        { id: 'l002', timestamp: '2025-09-01 09:07:45', user: 'admin@secure.med', action: 'USER_CREATED', ipAddress: '192.168.1.10', details: 'Created user m.chen@secure.med.' },
        { id: 'l003', timestamp: '2025-09-01 10:15:23', user: 'doctor@secure.med', action: 'LOGIN_SUCCESS', ipAddress: '10.0.5.25', details: 'Doctor user logged in.' },
        { id: 'l004', timestamp: '2025-09-01 10:16:01', user: 'doctor@secure.med', action: 'PATIENT_RECORD_VIEW', ipAddress: '10.0.5.25', details: 'Viewed record for patient p002.' },
        { id: 'l005', timestamp: '2025-09-01 11:30:59', user: 'hacker@evil.com', action: 'LOGIN_FAILURE', ipAddress: '203.0.113.50', details: 'Failed login attempt for user admin@secure.med.' },
        { id: 'l006', timestamp: '2025-09-01 11:31:05', user: 'hacker@evil.com', action: 'LOGIN_FAILURE', ipAddress: '203.0.113.50', details: 'Failed login attempt for user admin@secure.med.' },
        { id: 'l007', timestamp: '2025-09-02 14:20:00', user: 'nurse.jones@secure.med', action: 'LOGIN_SUCCESS', ipAddress: '10.0.5.28', details: 'Nurse user logged in.' },
        { id: 'l008', timestamp: '2025-09-02 14:21:15', user: 'nurse.jones@secure.med', action: 'PATIENT_VITALS_UPDATE', ipAddress: '10.0.5.28', details: 'Updated vitals for patient p001.' },
        { id: 'l009', timestamp: '2025-09-02 15:00:10', user: 'analyst@secure.med', action: 'LOGIN_SUCCESS', ipAddress: '172.16.0.100', details: 'Analyst user logged in.' },
        { id: 'l010', timestamp: '2025-09-02 15:02:30', user: 'analyst@secure.med', action: 'ANALYTICS_REPORT_RUN', ipAddress: '172.16.0.100', details: 'Generated population health report.' },
        { id: 'l011', timestamp: '2025-09-03 08:30:00', user: 's.davis@secure.med', action: 'LOGIN_SUCCESS', ipAddress: '10.0.5.30', details: 'Doctor user logged in.' },
        { id: 'l012', timestamp: '2025-09-03 08:32:45', user: 's.davis@secure.med', action: 'PATIENT_RECORD_VIEW', ipAddress: '10.0.5.30', details: 'Viewed record for patient p015.' },
        { id: 'l013', timestamp: '2025-09-03 09:15:18', user: 'nurse.li@secure.med', action: 'LOGIN_SUCCESS', ipAddress: '10.0.5.35', details: 'Nurse user logged in.' },
        { id: 'l014', timestamp: '2025-09-03 09:18:22', user: 'nurse.li@secure.med', action: 'MEDICATION_ADMINISTERED', ipAddress: '10.0.5.35', details: 'Administered medication for patient p022.' },
        { id: 'l015', timestamp: '2025-09-03 11:00:00', user: 'admin@secure.med', action: 'SECURITY_SCAN_INITIATED', ipAddress: '192.168.1.10', details: 'Admin initiated a full system vulnerability scan.' },
        { id: 'l016', timestamp: '2025-09-03 11:05:00', user: 'j.andrews@secure.med', action: 'PATIENT_RECORD_VIEW', ipAddress: '10.0.5.26', details: 'Viewed record for patient p008.' },
        { id: 'l017', timestamp: '2025-09-03 13:45:00', user: 'm.chen@secure.med', action: 'DIAGNOSIS_ADDED', ipAddress: '10.0.5.27', details: 'Added new diagnosis for patient p003.' },
        { id: 'l018', timestamp: '2025-09-03 16:20:15', user: 'doctor@secure.med', action: 'LOGOUT', ipAddress: '10.0.5.25', details: 'Doctor user logged out.' },
    ],
    vulnerabilities: [
        { id: 'v001', cveId: 'CVE-2021-44228', category: 'Application', severity: RiskLevel.Critical, description: 'Log4j remote code execution vulnerability on legacy billing server.', status: 'Vulnerable', remediationCost: 25000, remediation: 'Update Log4j library to version 2.17.1 or newer on all affected servers immediately. Isolate the billing server from the main network until patched.' },
        { id: 'v002', cveId: 'CVE-2022-22965', category: 'Application', severity: RiskLevel.Critical, description: 'Spring4Shell vulnerability in patient intake portal.', status: 'Patched', remediationCost: 15000, remediation: 'Upgrade Spring Framework to versions 5.3.18+ or 5.2.20+. The patch has been successfully applied.' },
        { id: 'v003', cveId: 'N/A', category: 'Database', severity: RiskLevel.High, description: 'Unencrypted patient data backups stored on a network share.', status: 'Vulnerable', remediationCost: 40000, remediation: 'Enable AES-256 encryption for all backup files. Restrict access to the network share to authorized database administrator accounts only.' },
        { id: 'v004', cveId: 'CVE-2019-0708', category: 'OS', severity: RiskLevel.High, description: 'BlueKeep (RDP) vulnerability on unpatched Windows Server 2008.', status: 'Mitigated', remediationCost: 5000, remediation: 'Network Level Authentication (NLA) has been enabled as a temporary workaround. A full OS patch is required, but the immediate risk is reduced.' },
        { id: 'v005', cveId: 'N/A', category: 'Network', severity: RiskLevel.Medium, description: 'Internal lab equipment using default manufacturer passwords.', status: 'Vulnerable', remediationCost: 8000, remediation: 'Change the default passwords on all specified lab devices. Implement a policy for regular password rotation on network-connected equipment.' },
        { id: 'v006', cveId: 'CVE-2023-34362', category: 'Application', severity: RiskLevel.Critical, description: 'MOVEit Transfer SQL Injection vulnerability leading to data exfiltration.', status: 'Vulnerable', remediationCost: 55000, remediation: 'Apply the latest security patch from Progress Software. Review logs for any signs of unauthorized access or data transfer.' },
        { id: 'v007', cveId: 'N/A', category: 'OS', severity: RiskLevel.High, description: 'End-of-life Windows XP running on a critical imaging machine.', status: 'Vulnerable', remediationCost: 30000, remediation: 'Isolate the machine in a segmented network VLAN with strict firewall rules. Prioritize upgrading the machine and its software.' },
        { id: 'v008', cveId: 'CVE-2020-1472', category: 'OS', severity: RiskLevel.Critical, description: 'Zerologon (Netlogon elevation of privilege) on domain controller.', status: 'Vulnerable', remediationCost: 45000, remediation: 'Apply the August 2020 and February 2021 Windows Server security updates to all domain controllers immediately.' },
        { id: 'v009', cveId: 'N/A', category: 'Database', severity: RiskLevel.Medium, description: 'SQL server allows connections with TLS 1.0, a weak protocol.', status: 'Mitigated', remediationCost: 7000, remediation: 'Configuration has been updated to disable TLS 1.0/1.1. Final changes require a server restart, scheduled for the next maintenance window.' },
        { id: 'v010', cveId: 'N/A', category: 'Network', severity: RiskLevel.Low, description: 'Guest Wi-Fi network is not fully segregated from the internal network.', status: 'Patched', remediationCost: 12000, remediation: 'Firewall rules have been updated to completely isolate guest traffic from all internal corporate and medical resources.' },
        { id: 'v011', cveId: 'CVE-2017-5638', category: 'Application', severity: RiskLevel.High, description: 'Apache Struts remote code execution vulnerability on legacy HR portal.', status: 'Vulnerable', remediationCost: 22000, remediation: 'Upgrade Apache Struts to version 2.3.32 or 2.5.10.1 or newer. Since this system is legacy, plan for decommissioning.' },
        { id: 'v012', cveId: 'N/A', category: 'Database', severity: RiskLevel.High, description: 'Database admin account `sa` has a weak, easily guessable password.', status: 'Vulnerable', remediationCost: 5000, remediation: 'Immediately change the password for the `sa` account to a complex, randomly generated password. Review all uses of the account.' },
        { id: 'v013', cveId: 'N/A', category: 'Application', severity: RiskLevel.Medium, description: 'Cross-site scripting (XSS) vulnerability in patient search function.', status: 'Vulnerable', remediationCost: 18000, remediation: 'Implement input sanitization and output encoding on the search results page. A code-level fix is required by the development team.' },
        { id: 'v014', cveId: 'CVE-2018-0171', category: 'Network', severity: RiskLevel.High, description: 'Cisco Smart Install Protocol misuse allows for arbitrary code execution.', status: 'Patched', remediationCost: 9000, remediation: 'The `no vstack` command has been applied to all affected Cisco switches, disabling the vulnerable protocol.' },
        { id: 'v015', cveId: 'N/A', category: 'OS', severity: RiskLevel.Low, description: 'Server room temperature alerts are not configured.', status: 'Vulnerable', remediationCost: 2000, remediation: 'Configure monitoring software to send email and SMS alerts if server room temperature exceeds 80°F (27°C).' }
    ] as Vulnerability[],
};

// --- MOCK SECURE CLOUD DATABASE (DE-IDENTIFIED/OPERATIONAL) ---
const cloudModernDB = {
    patients: localLegacyDB.sensitivePatients.map(({ ssn, billingCode, conditions, ...rest }) => rest) as Patient[],
    appointments: [
        { id: 'a001', patientId: 'p001', date: '2024-08-10', time: '10:00 AM', reason: 'Follow-up' },
        { id: 'a002', patientId: 'p002', date: '2024-08-12', time: '11:30 AM', reason: 'Annual Checkup' },
        { id: 'a003', patientId: 'p004', date: '2024-08-10', time: '02:00 PM', reason: 'Consultation' },
        { id: 'a004', patientId: 'p005', date: '2024-09-01', time: '09:00 AM', reason: 'Bloodwork Review' },
        { id: 'a005', patientId: 'p007', date: '2024-08-15', time: '03:00 PM', reason: 'Gout follow-up' },
        { id: 'a006', patientId: 'p011', date: '2024-08-18', time: '10:30 AM', reason: 'Dermatology check' },
        { id: 'a007', patientId: 'p019', date: '2024-08-20', time: '09:30 AM', reason: 'Diabetes management' },
        { id: 'a008', patientId: 'p025', date: '2024-08-22', time: '01:00 PM', reason: 'Lipid panel review' },
        { id: 'a009', patientId: 'p030', date: '2024-08-25', time: '11:00 AM', reason: 'Annual Physical' },
        { id: 'a010', patientId: 'p042', date: '2024-08-28', time: '04:00 PM', reason: 'Allergy testing' },
    ] as Appointment[],
    visits: {
        'p001': [{ id: 'v01', date: '2023-11-10', doctor: 'Dr. Ben Carter', reason: 'Hypertension Check', vitals: { temp: '98.6°F', bp: '140/90', hr: 75 }, notes: 'Patient blood pressure remains elevated. Advised dietary changes and scheduled follow-up.' }],
        'p002': [{ id: 'v02', date: '2024-01-05', doctor: 'Dr. Joanna Andrews', reason: 'Asthma flare-up', vitals: { temp: '99.1°F', bp: '120/80', hr: 88 }, notes: 'Prescribed new inhaler, symptoms have subsided.' }],
        'p006': [{ id: 'v03', date: '2024-04-15', doctor: 'Dr. Sarah Davis', reason: 'Anxiety consultation', vitals: { temp: '98.7°F', bp: '118/78', hr: 82 }, notes: 'Discussed coping strategies and referred to therapy. No medication prescribed at this time.' }],
        'p017': [{ id: 'v04', date: '2024-03-03', doctor: 'Dr. Marcus Chen', reason: 'Routine Checkup', vitals: { temp: '98.5°F', bp: '135/85', hr: 70 }, notes: 'Continue current medication. Monitor blood pressure at home.' }],
        'p025': [{ id: 'v05', date: '2024-01-30', doctor: 'Dr. Ben Carter', reason: 'Cholesterol management', vitals: { temp: '98.6°F', bp: '138/88', hr: 72 }, notes: 'Lipid panel results show high LDL. Started patient on Atorvastatin.' }],
    } as Record<string, Visit[]>,
    diagnoses: {
        'p001': [{ id: 'd01', code: 'I10', description: 'Essential (primary) hypertension', diagnosedOn: '2022-01-15' }, { id: 'd02', code: 'E11', description: 'Type 2 diabetes mellitus', diagnosedOn: '2021-06-20' }],
        'p002': [{ id: 'd03', code: 'J45', description: 'Asthma', diagnosedOn: '2010-03-10' }],
        'p003': [{ id: 'd04', code: 'M19.90', description: 'Unspecified osteoarthritis', diagnosedOn: '2019-07-22' }],
        'p004': [{ id: 'd05', code: 'G43.909', description: 'Migraine, unspecified', diagnosedOn: '2021-01-10' }],
        'p005': [{ id: 'd06', code: 'E78.5', description: 'Hyperlipidemia, unspecified', diagnosedOn: '2020-03-14' }],
        'p016': [{ id: 'd07', code: 'E03.9', description: 'Hypothyroidism, unspecified', diagnosedOn: '2018-11-02' }],
        'p021': [{ id: 'd08', code: 'K50.90', description: 'Crohn\'s disease, unspecified', diagnosedOn: '2015-09-01' }],
    } as Record<string, Diagnosis[]>,
    medications: {
        'p001': [{ id: 'm01', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }, { id: 'm02', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }],
        'p002': [{ id: 'm03', name: 'Albuterol Sulfate', dosage: '90mcg', frequency: 'As needed for shortness of breath' }],
        'p003': [{ id: 'm04', name: 'Meloxicam', dosage: '15mg', frequency: 'Once daily' }],
        'p004': [{ id: 'm05', name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed for migraine' }],
        'p005': [{ id: 'm06', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime' }],
        'p016': [{ id: 'm07', name: 'Levothyroxine', dosage: '50mcg', frequency: 'Once daily' }],
        'p021': [{ id: 'm08', name: 'Mesalamine', dosage: '1.2g', frequency: 'Twice daily' }],
    } as Record<string, Medication[]>,
};

// --- MOCK API FUNCTIONS ---
const simulateNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- Auth ---
export const validateCredentials = async (email: string, password_unused: string): Promise<User> => {
    await simulateNetworkDelay(500);
    const user = localLegacyDB.users.find(u => u.email === email);
    if (user) {
        return user;
    }
    throw new Error('Invalid credentials');
};

export const logout = () => { 
    sessionStorage.removeItem('authToken'); 
    sessionStorage.removeItem('security_verified');
    sessionStorage.removeItem('mfa_pending_user');
};

export const getCurrentUser = async (): Promise<User | null> => {
    await simulateNetworkDelay(100);
    const token = sessionStorage.getItem('authToken');
    return token ? JSON.parse(token) : null;
};

export const findUserByEmail = async (email: string): Promise<boolean> => {
    await simulateNetworkDelay(300);
    return localLegacyDB.users.some(u => u.email === email);
};

export const resetPassword = async (email: string, newPass: string): Promise<boolean> => {
    await simulateNetworkDelay(600);
    console.log(`Password for ${email} has been reset to ${newPass}. (This is a mock operation).`);
    return true;
}

// --- ADMIN-ONLY DATA SERVICES ---
export const fetchSensitivePatients = async (): Promise<SensitivePatientRecord[]> => {
    await simulateNetworkDelay(600);
    return localLegacyDB.sensitivePatients;
};

export const fetchAuditLogs = async (): Promise<AuditLog[]> => {
    await simulateNetworkDelay(500);
    return [...localLegacyDB.auditLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const fetchUsers = async (): Promise<User[]> => {
    await simulateNetworkDelay(300);
    return localLegacyDB.users.filter(u => u.role !== Role.Admin);
};

export const createUser = async (name: string, email: string, role: Role): Promise<User> => {
    await simulateNetworkDelay(600);
    const newUser: User = { id: `u${localLegacyDB.users.length + 1}`, name, email, role };
    localLegacyDB.users.push(newUser);
    return newUser;
};

export const remediateVulnerability = async (vulnerabilityId: string): Promise<Vulnerability> => {
    await simulateNetworkDelay(1500); // Simulate patching time
    const vulnerability = localLegacyDB.vulnerabilities.find(v => v.id === vulnerabilityId);
    if (vulnerability) {
        if (vulnerability.status === 'Patched') {
            return vulnerability; // Already patched
        }
        vulnerability.status = 'Patched';
        return vulnerability;
    }
    throw new Error('Vulnerability not found');
};

export const fetchVulnerabilities = async (): Promise<Vulnerability[]> => {
    await simulateNetworkDelay(1000);
    return localLegacyDB.vulnerabilities;
}

export const calculateROI = async (params: ROICalculationParams): Promise<ROICalculationResult> => {
    await simulateNetworkDelay(300);
    const { 
        modernizationInvestment, 
        annualMaintenanceSavings, 
        riskReductionPercentage,
        licensingFees,
        infrastructureCosts,
        staffingCosts,
        downtimeCosts
    } = params;

    const legacySystemCost = licensingFees + infrastructureCosts + staffingCosts + downtimeCosts;
    const AVERAGE_BREACH_COST = 3500000; // Mock industry average cost of a healthcare data breach
    
    const reducedRiskCost = AVERAGE_BREACH_COST * (riskReductionPercentage / 100);
    const annualSavings = annualMaintenanceSavings + reducedRiskCost;
    const paybackPeriod = modernizationInvestment / annualSavings;
    const fiveYearProjection = (annualSavings * 5) - modernizationInvestment;

    return { annualSavings, paybackPeriod, fiveYearProjection, reducedRiskCost };
}


// --- DOCTOR/NURSE DATA SERVICES (from Cloud DB) ---
export const fetchCloudPatients = async (query: string): Promise<Patient[]> => {
    await simulateNetworkDelay(400);
    if (!query) return cloudModernDB.patients;
    const lowercasedQuery = query.toLowerCase();
    
    const appointmentPatientIds = cloudModernDB.appointments
      .filter(a => a.date.includes(lowercasedQuery))
      .map(a => a.patientId);

    return cloudModernDB.patients.filter(p => 
        p.name.toLowerCase().includes(lowercasedQuery) ||
        p.id.toLowerCase().includes(lowercasedQuery) ||
        p.mrn.toLowerCase().includes(lowercasedQuery) ||
        appointmentPatientIds.includes(p.id)
    );
};

export const fetchPatientMedicalRecord = async (patientId: string): Promise<MedicalRecord> => {
    await simulateNetworkDelay(700);
    const patient = cloudModernDB.patients.find(p => p.id === patientId);
    if (!patient) throw new Error("Patient not found");

    return {
        patient,
        visits: cloudModernDB.visits[patientId] || [],
        diagnoses: cloudModernDB.diagnoses[patientId] || [],
        medications: cloudModernDB.medications[patientId] || [],
    }
}

export const fetchAppointmentsForPatient = async (patientId: string): Promise<Appointment[]> => {
    await simulateNetworkDelay(200);
    return cloudModernDB.appointments.filter(a => a.patientId === patientId);
};

// --- ANALYTICS & SYSTEM HEALTH SERVICES ---
export const fetchAnonymizedAnalytics = async (): Promise<AnonymizedAnalyticsData> => {
    await simulateNetworkDelay(800);
    const currentYear = new Date().getFullYear();
    const ages = localLegacyDB.sensitivePatients.map(p => currentYear - new Date(p.dob).getFullYear());
    const averageAge = Math.round(ages.reduce((a, b) => a + b, 0) / ages.length);

    const genderCounts = localLegacyDB.sensitivePatients.reduce((acc, p) => {
        acc[p.gender] = (acc[p.gender] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const genderDistribution = Object.entries(genderCounts).map(([name, value]) => ({ name, value }));
    
    const conditionCounts = localLegacyDB.sensitivePatients.flatMap(p => p.conditions).reduce((acc, cond) => {
        acc[cond] = (acc[cond] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const conditionPrevalence = Object.entries(conditionCounts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 5);

    return {
        patientCount: localLegacyDB.sensitivePatients.length,
        averageAge,
        genderDistribution,
        conditionPrevalence,
        migrationProgress: 75,
    };
};

export const fetchSystemHealth = async (): Promise<RiskFinding[]> => {
    await simulateNetworkDelay(700);
    const failedLogins = localLegacyDB.auditLogs.filter(l => l.action === 'LOGIN_FAILURE');
    const findings: RiskFinding[] = [];

    if (failedLogins.length > 2) {
        findings.push({
            id: 'risk001',
            category: 'Authentication',
            level: RiskLevel.High,
            description: `Multiple (${failedLogins.length}) failed login attempts detected from IP ${failedLogins[0].ipAddress}.`,
            recommendation: 'Monitor IP address and consider temporary lockout. Ensure MFA is enforced for all admin accounts.',
        });
    }

    findings.push({
        id: 'risk002',
        category: 'Data Integrity',
        level: RiskLevel.Low,
        description: 'Nightly data sync from on-premise to cloud completed with 0 errors.',
        recommendation: 'No action needed. Continue monitoring sync logs.',
    });

     findings.push({
        id: 'risk003',
        category: 'Cloud Security',
        level: RiskLevel.Medium,
        description: 'A storage bucket (cloud-db-backups) is configured without public access blocking.',
        recommendation: 'Immediately enable "Block all public access" setting on the S3 bucket in the AWS console.',
    });

    return findings;
};