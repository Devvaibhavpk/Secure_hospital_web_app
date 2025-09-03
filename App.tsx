import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import UsersPage from './pages/UsersPage';
import AuditLogsPage from './pages/AuditLogsPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Role } from './types';
import SystemHealthPage from './pages/SystemHealthPage';
import LegacyPatientsPage from './pages/LegacyPatientsPage';
import MfaVerifyPage from './pages/MfaVerifyPage';
import SecurityDashboardPage from './pages/SecurityDashboardPage';
import ROICalculatorPage from './pages/ROICalculatorPage';
import PatientDetailPage from './pages/PatientDetailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CompliancePage from './pages/CompliancePage';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/mfa-verify" element={<MfaVerifyPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route 
              path="patients" 
              element={
                <ProtectedRoute roles={[Role.Doctor, Role.Nurse]}>
                  <PatientsPage />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="patients/:patientId" 
              element={
                <ProtectedRoute roles={[Role.Doctor, Role.Nurse]}>
                  <PatientDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="users" 
              element={
                <ProtectedRoute roles={[Role.Admin]}>
                  <UsersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="logs" 
              element={
                <ProtectedRoute roles={[Role.Admin]}>
                  <AuditLogsPage />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="legacy-patients" 
              element={
                <ProtectedRoute roles={[Role.Admin]}>
                  <LegacyPatientsPage />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="system-health" 
              element={
                <ProtectedRoute roles={[Role.Admin]}>
                  <SystemHealthPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="roi-calculator" 
              element={
                <ProtectedRoute roles={[Role.Admin]}>
                  <ROICalculatorPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="security-dashboard" 
              element={
                <ProtectedRoute roles={[Role.Admin]}>
                  <SecurityDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="compliance" 
              element={
                <ProtectedRoute roles={[Role.Admin]}>
                  <CompliancePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;