import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise(res => setTimeout(res, 500));
        setLoading(false);
        setSuccess(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md p-8 space-y-8">
                <div className="text-center">
                    <ShieldCheckIcon className="w-16 h-16 mx-auto text-brand-purple" />
                    <h1 className="mt-4 text-3xl font-extrabold font-poppins text-textPrimary">Reset Password</h1>
                </div>

                {success ? (
                    <div className="text-center">
                        <p className="text-textSecondary">Your password has been successfully reset.</p>
                        <Link to="/login">
                            <Button className="mt-4 w-full">Proceed to Login</Button>
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <p className="text-sm text-textSecondary text-center">Enter a new password for your account.</p>
                        <div>
                            <label htmlFor="password" className="sr-only">New Password</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                         <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
                            <Input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default ResetPasswordPage;
