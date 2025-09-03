import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';

const VERIFICATION_CODE = '72184'; // This simulates the OTP

const MfaVerifyPage: React.FC = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUserAndToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user lands here without a pending MFA, redirect to login
        if (!sessionStorage.getItem('mfa_pending_user')) {
            navigate('/login');
        }
    }, [navigate]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (code === VERIFICATION_CODE) {
            const userString = sessionStorage.getItem('mfa_pending_user');
            if(userString) {
                const user: User = JSON.parse(userString);
                setUserAndToken(user);
                sessionStorage.removeItem('mfa_pending_user');
                sessionStorage.setItem('security_verified', 'true'); // Also set security verification for dashboard
                navigate('/');
            } else {
                // Should not happen due to useEffect check, but as a fallback
                setError('Session expired. Please log in again.');
                setTimeout(() => navigate('/login'), 2000);
            }
        } else {
            setError('Invalid verification code.');
            setCode('');
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm p-8 space-y-6">
                <div className="text-center">
                    <ShieldCheckIcon className="w-12 h-12 mx-auto text-brand-purple" />
                    <h1 className="mt-4 text-2xl font-bold font-poppins text-textPrimary">Multi-Factor Authentication</h1>
                    <p className="mt-2 text-sm text-textSecondary">For your security, please enter the one-time password (OTP) sent to your email.</p>
                </div>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="code" className="sr-only">Verification Code</label>
                        <Input
                            id="code"
                            name="code"
                            type="text"
                            required
                            placeholder="Verification Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="text-center tracking-widest"
                        />
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </Button>
                    </div>
                </form>
                 <div className="text-center text-xs text-accent">
                    <p>(Hint: the demo OTP is 72184)</p>
                </div>
            </Card>
        </div>
    );
};

export default MfaVerifyPage;