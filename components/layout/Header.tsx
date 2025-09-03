import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types';
import { LogoutIcon } from '../icons/LogoutIcon';
import { UserCircleIcon } from '../icons/UserCircleIcon';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { XIcon } from '../icons/XIcon';

const NavItem: React.FC<{ to: string, children: React.ReactNode, onClick?: () => void }> = ({ to, children, onClick }) => {
    return (
        <NavLink
            to={to}
            end
            onClick={onClick}
            className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-brand-purple' : 'text-textSecondary hover:text-textPrimary'
                }`
            }
        >
            {children}
        </NavLink>
    );
};

const MobileNavItem: React.FC<{ to: string, children: React.ReactNode, onClick?: () => void }> = ({ to, children, onClick }) => {
    return (
        <NavLink
            to={to}
            end
            onClick={onClick}
            className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive ? 'text-brand-purple bg-white/5' : 'text-textSecondary hover:text-textPrimary hover:bg-white/10'
                }`
            }
        >
            {children}
        </NavLink>
    );
};


const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);


    return (
        <header className="sticky top-0 z-40 bg-black/30 backdrop-blur-xl border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                             <ShieldCheckIcon className="w-8 h-8 text-brand-purple" />
                             <span className="ml-2 text-xl font-bold font-poppins text-textPrimary">SecureClinic OS</span>
                        </div>
                        <nav className="hidden md:flex items-center space-x-6 ml-10">
                            <NavItem to="/">Dashboard</NavItem>
                             {(user?.role === Role.Doctor || user?.role === Role.Nurse) && (
                                <NavItem to="/patients">Patients</NavItem>
                            )}
                             {user?.role === Role.Admin && (
                                <>
                                    <NavItem to="/users">Users</NavItem>
                                    <NavItem to="/roi-calculator">ROI</NavItem>
                                    <NavItem to="/security-dashboard">Security</NavItem>
                                    <NavItem to="/compliance">Compliance</NavItem>
                                    <NavItem to="/logs">Logs</NavItem>
                                    <NavItem to="/system-health">Health</NavItem>
                                    <NavItem to="/legacy-patients">Legacy</NavItem>
                                </>
                            )}
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden sm:flex items-center space-x-4">
                            <div className="text-right">
                                <p className="font-semibold text-sm text-textPrimary">{user?.name}</p>
                                <p className="text-xs text-textSecondary">{user?.role}</p>
                            </div>
                            <UserCircleIcon className="w-10 h-10 text-textSecondary" />
                            <button
                                onClick={logout}
                                className="flex items-center p-2 bg-white/10 hover:bg-red-500/20 rounded-full transition-colors duration-200 group"
                                aria-label="Logout"
                            >
                                <LogoutIcon className="w-5 h-5 text-textSecondary group-hover:text-red-400" />
                            </button>
                        </div>
                        <div className="md:hidden ml-2">
                             <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-textSecondary hover:text-textPrimary"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <nav className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavItem to="/" onClick={closeMobileMenu}>Dashboard</MobileNavItem>
                         {(user?.role === Role.Doctor || user?.role === Role.Nurse) && (
                            <MobileNavItem to="/patients" onClick={closeMobileMenu}>Patients</MobileNavItem>
                        )}
                         {user?.role === Role.Admin && (
                            <>
                                <MobileNavItem to="/users" onClick={closeMobileMenu}>Users</MobileNavItem>
                                <MobileNavItem to="/roi-calculator" onClick={closeMobileMenu}>ROI</MobileNavItem>
                                <MobileNavItem to="/security-dashboard" onClick={closeMobileMenu}>Security</MobileNavItem>
                                <MobileNavItem to="/compliance" onClick={closeMobileMenu}>Compliance</MobileNavItem>
                                <MobileNavItem to="/logs" onClick={closeMobileMenu}>Logs</MobileNavItem>
                                <MobileNavItem to="/system-health" onClick={closeMobileMenu}>Health</MobileNavItem>
                                <MobileNavItem to="/legacy-patients" onClick={closeMobileMenu}>Legacy</MobileNavItem>
                            </>
                        )}
                        <div className="sm:hidden pt-4 mt-4 border-t border-white/20">
                             <div className="flex items-center px-2 mb-3">
                                <UserCircleIcon className="w-10 h-10 text-textSecondary" />
                                <div className="ml-3">
                                    <p className="font-semibold text-base text-textPrimary">{user?.name}</p>
                                    <p className="text-sm text-textSecondary">{user?.role}</p>
                                </div>
                             </div>
                             <button
                                onClick={() => { logout(); closeMobileMenu(); }}
                                className="w-full flex items-center p-2 rounded-md text-base font-medium text-textSecondary hover:text-textPrimary hover:bg-white/10"
                                aria-label="Logout"
                            >
                                <LogoutIcon className="w-5 h-5 mr-3" />
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;