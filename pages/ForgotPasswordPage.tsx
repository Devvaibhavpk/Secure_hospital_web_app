import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';

// In a real app, this would call an API. Here we just simulate.
const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(res => setTimeout(res, 500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md p-8 space-y-8">
                <div className="text-center">
                    <ShieldCheckIcon className="w-16 h-16 mx-auto text-brand-purple" />
                    <h1 className="mt-4 text-3xl font-extrabold font-poppins text-textPrimary">Forgot Password</h1>
                </div>
                {submitted ? (
                    <div className="text-center">
                        <p className="text-textSecondary">If an account with the email <strong className="text-textPrimary">{email}</strong> exists, a password reset link has been sent.</p>
                         <p className="text-xs text-accent mt-4">(For this demo, click the button below to proceed.)</p>
                         <Link to="/reset-password">
                            <Button className="mt-4 w-full">Reset Your Password</Button>
                        </Link>
                         <Link to="/login" className="block mt-4 text-sm text-brand-purple hover:underline">
                            &larr; Back to Login
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                         <p className="text-sm text-textSecondary text-center">Enter your email address and we will send you a link to reset your password.</p>
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
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </div>
                        <div className="text-center">
                            <Link to="/login" className="text-sm text-brand-purple hover:underline">
                                Remembered your password?
                            </Link>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
