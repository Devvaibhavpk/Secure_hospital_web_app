
import React, { useState, useEffect } from 'react';
import { User, Role } from '../types';
import { fetchUsers, createUser } from '../services/apiService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserRole, setNewUserRole] = useState<Role>(Role.Doctor);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUserName || !newUserEmail) return;

        try {
            await createUser(newUserName, newUserEmail, newUserRole);
            setIsModalOpen(false);
            setNewUserName('');
            setNewUserEmail('');
            setNewUserRole(Role.Doctor);
            loadUsers(); // Refresh the list
        } catch (error) {
            console.error("Failed to create user", error);
        }
    };
    
    const getRoleChipColor = (role: Role) => {
        switch(role) {
            case Role.Doctor: return 'bg-brand-teal/20 text-teal-300';
            case Role.Nurse: return 'bg-brand-pink/20 text-pink-300';
            case Role.Analyst: return 'bg-brand-purple/20 text-purple-300';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-security">
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
                        User Management
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
                        Create and manage staff accounts with role-based access controls.
                    </p>
                </div>

                {/* Action Bar */}
                <div className="mb-8">
                    <div className="card-enhanced shadow-card">
                        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-textPrimary">Staff Accounts</h2>
                                <p className="text-textSecondary">Manage user permissions and access levels</p>
                            </div>
                            <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-primary">
                                Add New User
                            </Button>
                        </div>
                    </div>
                </div>
            
                {/* Users Table */}
                <div className="card-enhanced shadow-elevated">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/20 bg-black/20">
                                <tr>
                                    <th className="p-6 text-textPrimary font-bold">Name</th>
                                    <th className="p-6 text-textPrimary font-bold">Email</th>
                                    <th className="p-6 text-textPrimary font-bold">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="text-center p-8">
                                            <div className="card-enhanced">
                                                <div className="p-6">
                                                    <p className="text-textSecondary font-medium">Loading users...</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user.id} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="p-6 font-semibold text-textPrimary">{user.name}</td>
                                            <td className="p-6 text-textSecondary">{user.email}</td>
                                            <td className="p-6">
                                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getRoleChipColor(user.role)}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal title="Create New User Account" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={handleCreateUser}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-1">Full Name</label>
                                <Input id="name" type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-1">Email Address</label>
                                <Input id="email" type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} required />
                            </div>
                             <div>
                                <label htmlFor="role" className="block text-sm font-medium text-textSecondary mb-1">Role</label>
                                <select 
                                    id="role" 
                                    value={newUserRole} 
                                    onChange={e => setNewUserRole(e.target.value as Role)}
                                    className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple text-textPrimary"
                                >
                                    <option value={Role.Doctor}>Doctor</option>
                                    <option value={Role.Nurse}>Nurse</option>
                                    <option value={Role.Analyst}>Analyst</option>
                                </select>
                            </div>
                            <div className="text-right pt-4">
                                <Button type="submit">Create User</Button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default UsersPage;
