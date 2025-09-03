import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types';
import { DashboardIcon } from '../icons/DashboardIcon';
import { PatientIcon } from '../icons/PatientIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { LogIcon } from '../icons/LogIcon';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { SystemHealthIcon } from '../icons/SystemHealthIcon';
import { ROICalculatorIcon } from '../icons/ROICalculatorIcon'; // Assuming new icon
import { SecurityIcon } from '../icons/SecurityIcon'; // Assuming new icon

const NavItem: React.FC<{ to: string, children: React.ReactNode, icon: React.ReactNode }> = ({ to, children, icon }) => {
    return (
        <NavLink
            to={to}
            end
            className={({ isActive }) =>
                `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-brand text-white' : 'text-highlight hover:bg-accent hover:text-light'
                }`
            }
        >
            <span className="mr-3">{icon}</span>
            {children}
        </NavLink>
    );
};

const Sidebar: React.FC = () => {
    const { user } = useAuth();

    return (
        <aside className="w-64 bg-secondary p-4 flex flex-col">
            <div className="flex items-center mb-10 p-2">
                 <ShieldCheckIcon className="w-10 h-10 text-brand mr-3" />
                 <h1 className="text-xl font-bold text-light">SecureClinic OS</h1>
            </div>
            <nav className="flex-1">
                <NavItem to="/" icon={<DashboardIcon className="w-6 h-6"/>}>Dashboard</NavItem>
                
                {(user?.role === Role.Doctor || user?.role === Role.Nurse) && (
                    <NavItem to="/patients" icon={<PatientIcon className="w-6 h-6"/>}>Patients</NavItem>
                )}

                {user?.role === Role.Analyst && (
                    <NavItem to="/" icon={<DashboardIcon className="w-6 h-6"/>}>Analytics</NavItem>
                )}

                {user?.role === Role.Admin && (
                    <>
                        <div className="mt-4 mb-2 px-3 text-xs font-semibold text-accent uppercase">Administration</div>
                        <NavItem to="/users" icon={<UsersIcon className="w-6 h-6"/>}>User Management</NavItem>
                        <NavItem to="/roi-calculator" icon={<ROICalculatorIcon className="w-6 h-6"/>}>ROI Calculator</NavItem>
                        
                        <div className="mt-4 mb-2 px-3 text-xs font-semibold text-accent uppercase">Security &amp; Compliance</div>
                         <NavItem to="/security" icon={<SecurityIcon className="w-6 h-6"/>}>Security Dashboard</NavItem>
                        <NavItem to="/logs" icon={<LogIcon className="w-6 h-6"/>}>Audit Logs</NavItem>
                        <NavItem to="/system-health" icon={<SystemHealthIcon className="w-6 h-6"/>}>System Health</NavItem>

                        <div className="mt-4 mb-2 px-3 text-xs font-semibold text-accent uppercase">Legacy Systems</div>
                        <NavItem to="/legacy-patients" icon={<PatientIcon className="w-6 h-6"/>}>Legacy Patient Records</NavItem>
                    </>
                )}
            </nav>
            <div className="mt-auto text-center text-xs text-accent">
                <p>&copy; 2024 SecureHospitalWebApp</p>
                <p>v2.0.0</p>
            </div>
        </aside>
    );
};

export default Sidebar;
