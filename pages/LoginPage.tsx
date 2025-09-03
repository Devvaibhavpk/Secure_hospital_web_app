import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { validateCredentials } from '../services/apiService';
import { Role } from '../types';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUserAndToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await validateCredentials(email, password);
            
            if (user.role === Role.Admin) {
                // Admin needs MFA
                sessionStorage.setItem('mfa_pending_user', JSON.stringify(user));
                navigate('/mfa-verify');
            } else {
                // Non-admin logs in directly
                setUserAndToken(user);
                navigate('/');
            }

        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-security flex items-center justify-center">
            <div className="container mx-auto px-4 py-12">
                <Card className="w-full max-w-md mx-auto card-enhanced shadow-elevated">
                    <div className="p-8 space-y-8">
                <div className="text-center">
                    <ShieldCheckIcon className="w-16 h-16 mx-auto text-brand-purple" />
                    <h1 className="mt-4 text-3xl font-extrabold font-poppins text-textPrimary">SecureClinic OS</h1>
                    <p className="mt-2 text-textSecondary">Secure access for authorized personnel only.</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                           <label htmlFor="password" className="sr-only">Password</label>
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-brand-purple hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                         <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    {error && <p className="text-sm text-error text-center font-medium">{error}</p>}

                    <div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </div>
                </form>
                        <div className="text-center text-sm text-accent space-y-2 bg-black/30 rounded-lg p-4 border border-white/20 card-enhanced">
                            <p className="font-bold text-textPrimary">Demo accounts (any password):</p>
                            <div className="space-y-1 text-xs">
                                <p><span className="font-semibold text-textPrimary">Admin:</span> <span className="text-textSecondary">admin@secure.med</span></p>
                                <p><span className="font-semibold text-textPrimary">Doctor:</span> <span className="text-textSecondary">doctor@secure.med</span></p>
                                <p><span className="font-semibold text-textPrimary">Nurse:</span> <span className="text-textSecondary">nurse.jones@secure.med</span></p>
                                <p><span className="font-semibold text-textPrimary">Analyst:</span> <span className="text-textSecondary">analyst@secure.med</span></p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;